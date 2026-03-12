import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCalendar, FiSearch, FiUser } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';
import { getCached } from '../services/api';
import { getCategoryLabel, PRIMARY_CATEGORIES } from '../utils/categoryLabels';
import { getLocalizedText } from '../utils/localization';
import './Projects.css';

const Projects = () => {
  const { t, language } = useLanguage();
  const [projects, setProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    let mounted = true;

    const fetchProjects = async () => {
      try {
        setError('');
        const data = await getCached('/projects', { ttl: 120000, signal: controller.signal });

        if (!mounted) {
          return;
        }

        setProjects(data || []);
      } catch (err) {
        if (controller.signal.aborted || !mounted) {
          return;
        }

        console.error('Error fetching projects:', err.userMessage || err.message);
        setError(
          language === 'en'
            ? 'Could not load projects right now.'
            : 'تعذر تحميل المشاريع في الوقت الحالي.'
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchProjects();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, [language]);

  const categories = useMemo(() => {
    const availableCategories = Array.from(
      new Set(projects.map((project) => project.category).filter(Boolean))
    );
    const orderedPrimary = PRIMARY_CATEGORIES.filter((category) =>
      availableCategories.includes(category)
    );
    const remainingCategories = availableCategories.filter(
      (category) => !PRIMARY_CATEGORIES.includes(category)
    );

    return ['all', ...orderedPrimary, ...remainingCategories];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory = activeCategory === 'all' || project.category === activeCategory;
      const title = getLocalizedText(project.title, language).toLowerCase();
      const description = getLocalizedText(project.description, language).toLowerCase();
      const query = search.toLowerCase().trim();
      const matchesSearch = title.includes(query) || description.includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [projects, activeCategory, search, language]);

  const copy =
    language === 'en'
      ? {
          intro:
            'A curated portfolio of Shopify, automation, CRM, and systems delivery projects.',
          searchPlaceholder: 'Search project, client, or keyword...',
          all: 'All',
          details: 'View case study',
          resultsSuffix: 'projects',
          unknownClient: 'Confidential client',
          empty: 'No projects match your current filters.'
        }
      : {
          intro: 'بورتفوليو مختار لمشاريع Shopify والأتمتة وCRM وتنفيذ الأنظمة.',
          searchPlaceholder: 'ابحث باسم مشروع أو عميل أو كلمة...',
          all: 'الكل',
          details: 'عرض دراسة الحالة',
          resultsSuffix: 'مشاريع',
          unknownClient: 'عميل غير معلن',
          empty: 'لا توجد مشاريع مطابقة للفلاتر الحالية.'
        };

  return (
    <div className="portfolio-page section">
      <div className="container">
        <header className="portfolio-header">
          <h1 className="section-title">{t('projects')}</h1>
          <p>{copy.intro}</p>
        </header>

        {error && <p className="portfolio-feedback">{error}</p>}

        <div className="portfolio-toolbar">
          <div className="portfolio-search">
            <FiSearch />
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={copy.searchPlaceholder}
            />
          </div>

          <div className="portfolio-filters">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={activeCategory === category ? 'active' : ''}
              >
                {category === 'all' ? copy.all : getCategoryLabel(category, language)}
              </button>
            ))}
          </div>
        </div>

        {!loading && (
          <p className="portfolio-results-text">
            <strong>{filteredProjects.length}</strong> {copy.resultsSuffix}
          </p>
        )}

        {loading ? (
          <div className="portfolio-loading">
            <div className="spinner" />
          </div>
        ) : filteredProjects.length > 0 ? (
          <div className="portfolio-grid">
            {filteredProjects.map((project, index) => {
              const title = getLocalizedText(project.title, language, 'Project');
              const description = getLocalizedText(project.description, language);
              const client =
                typeof project.client === 'object'
                  ? getLocalizedText(project.client, language)
                  : String(project.client || '');
              const year = project.createdAt ? new Date(project.createdAt).getFullYear() : '';
              const tags = Array.isArray(project.tags) ? project.tags.slice(0, 2) : [];

              return (
                <motion.article
                  key={project.id}
                  className="portfolio-card"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 }}
                >
                  <Link to={`/projects/${project.id}`} className="portfolio-card-media">
                    <img src={project.images?.[0]} alt={title} loading="lazy" />
                  </Link>

                  <div className="portfolio-card-body">
                    <div className="portfolio-card-topline">
                      <span className="portfolio-category">
                        {getCategoryLabel(project.category, language)}
                      </span>
                      {year ? <span className="portfolio-year">{year}</span> : null}
                    </div>

                    <h2 className="portfolio-card-title">{title}</h2>
                    <p className="portfolio-card-description">{description}</p>

                    <div className="portfolio-card-meta">
                      <span>
                        <FiUser />
                        {client || copy.unknownClient}
                      </span>
                      {year ? (
                        <span>
                          <FiCalendar />
                          {year}
                        </span>
                      ) : null}
                    </div>

                    {tags.length > 0 && (
                      <div className="portfolio-card-tags">
                        {tags.map((tag) => (
                          <span key={`${project.id}-${tag}`}>{tag}</span>
                        ))}
                      </div>
                    )}

                    <Link to={`/projects/${project.id}`} className="portfolio-card-link">
                      {copy.details}
                      <FiArrowRight />
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </div>
        ) : (
          <div className="portfolio-empty">
            <p>{copy.empty}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
