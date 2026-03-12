import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiSearch, FiArrowRight } from 'react-icons/fi';
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
      const matchesSearch = title.includes(search.toLowerCase().trim());

      return matchesCategory && matchesSearch;
    });
  }, [projects, activeCategory, search, language]);

  const copy = language === 'en'
    ? {
        intro:
          'Portfolio cases across Shopify stores, automation workflows, and systems operations.',
        searchPlaceholder: 'Search projects...',
        all: 'All',
        details: 'View details',
        empty: 'No projects match your filters.'
      }
    : {
        intro:
          'نماذج أعمال عبر متاجر شوبيفاي وتدفقات الأتمتة وحلول الأنظمة والبيانات.',
        searchPlaceholder: 'ابحث عن مشروع...',
        all: 'الكل',
        details: 'عرض التفاصيل',
        empty: 'لا توجد مشاريع مطابقة للبحث.'
      };

  return (
    <div className="portfolio-page section">
      <div className="container">
        <div className="portfolio-header">
          <h1 className="section-title">{t('projects')}</h1>
          <p>{copy.intro}</p>
        </div>

        {error && <p className="scroll-indicator">{error}</p>}

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

        {loading ? (
          <div className="portfolio-loading">
            <div className="spinner" />
          </div>
        ) : (
          <>
            <div className="portfolio-grid">
              {filteredProjects.map((project, index) => (
                <motion.article
                  key={project.id}
                  className="portfolio-card"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link to={`/projects/${project.id}`} className="portfolio-card-media">
                    <img
                      src={project.images?.[0]}
                      alt={getLocalizedText(project.title, language, 'Project')}
                      loading="lazy"
                    />
                  </Link>
                  <div className="portfolio-card-body">
                    <span>{getCategoryLabel(project.category, language)}</span>
                    <h3>{getLocalizedText(project.title, language)}</h3>
                    <p>{getLocalizedText(project.description, language)}</p>
                    <Link to={`/projects/${project.id}`} className="portfolio-card-link">
                      {copy.details}
                      <FiArrowRight />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>

          </>
        )}

        {!loading && filteredProjects.length === 0 && (
          <div className="portfolio-empty">
            <p>{copy.empty}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
