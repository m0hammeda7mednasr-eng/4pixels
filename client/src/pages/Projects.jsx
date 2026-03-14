import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FiArrowRight,
  FiCalendar,
  FiLayers,
  FiSearch,
  FiTrendingUp,
  FiUser
} from 'react-icons/fi';
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

  const summary = useMemo(() => {
    const featuredCount = projects.filter((project) => project.featured).length;
    const years = projects
      .map((project) => (project.createdAt ? new Date(project.createdAt).getFullYear() : null))
      .filter(Boolean);

    return {
      count: projects.length,
      featured: featuredCount,
      latestYear: years.length > 0 ? Math.max(...years) : '--'
    };
  }, [projects]);

  const copy =
    language === 'en'
      ? {
          eyebrow: 'Selected Portfolio',
          intro:
            'A portfolio of launches, migrations, automation builds, and systems work designed to improve performance and operational clarity.',
          searchPlaceholder: 'Search project, client, or keyword...',
          all: 'All',
          details: 'View case study',
          featuredBadge: 'Featured',
          resultsSuffix: 'projects',
          unknownClient: 'Confidential client',
          empty: 'No projects match your current filters.',
          totalLabel: 'Total projects',
          featuredLabel: 'Featured cases',
          latestLabel: 'Latest year',
          finalTitle: 'Want your company presented with this level of clarity?',
          finalText:
            'We can design the interface, content structure, systems layer, and conversion path around your exact offer.',
          finalCta: 'Start A Project'
        }
      : {
          eyebrow: 'بورتفوليو مختار',
          intro:
            'مجموعة أعمال تشمل إطلاقات جديدة وعمليات نقل وبناء أتمتة وأنظمة تشغيل بهدف تحسين الأداء ووضوح التشغيل.',
          searchPlaceholder: 'ابحث باسم مشروع أو عميل أو كلمة...',
          all: 'الكل',
          details: 'عرض دراسة الحالة',
          featuredBadge: 'مميز',
          resultsSuffix: 'مشاريع',
          unknownClient: 'عميل غير معلن',
          empty: 'لا توجد مشاريع مطابقة للفلاتر الحالية.',
          totalLabel: 'إجمالي المشاريع',
          featuredLabel: 'حالات مميزة',
          latestLabel: 'أحدث سنة',
          finalTitle: 'تريد عرض شركتك بهذا المستوى من الوضوح؟',
          finalText:
            'نقدر نبني الواجهة وهيكلة المحتوى والأنظمة ومسار التحويل بما يناسب عرضك التجاري بالضبط.',
          finalCta: 'ابدأ مشروعًا'
        };

  return (
    <div className="projects-page section">
      <div className="projects-page-orb orb-left" />
      <div className="projects-page-orb orb-right" />

      <div className="container projects-page-shell">
        <header className="projects-hero">
          <div className="section-copy projects-hero-copy">
            <span className="page-eyebrow">{copy.eyebrow}</span>
            <h1>{t('projects')}</h1>
            <p>{copy.intro}</p>
          </div>

          <div className="projects-summary-grid">
            <article className="projects-summary-card">
              <div className="projects-summary-icon">
                <FiLayers />
              </div>
              <div>
                <span>{copy.totalLabel}</span>
                <strong>{summary.count}</strong>
              </div>
            </article>
            <article className="projects-summary-card">
              <div className="projects-summary-icon">
                <FiTrendingUp />
              </div>
              <div>
                <span>{copy.featuredLabel}</span>
                <strong>{summary.featured}</strong>
              </div>
            </article>
            <article className="projects-summary-card">
              <div className="projects-summary-icon">
                <FiCalendar />
              </div>
              <div>
                <span>{copy.latestLabel}</span>
                <strong>{summary.latestYear}</strong>
              </div>
            </article>
          </div>
        </header>

        {error ? <p className="projects-feedback">{error}</p> : null}

        <div className="projects-toolbar">
          <div className="projects-search">
            <FiSearch />
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={copy.searchPlaceholder}
            />
          </div>

          <div className="projects-filters">
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

        {!loading ? (
          <p className="projects-results-text">
            <strong>{filteredProjects.length}</strong> {copy.resultsSuffix}
          </p>
        ) : null}

        {loading ? (
          <div className="projects-loading">
            <div className="spinner" />
          </div>
        ) : filteredProjects.length > 0 ? (
          <div className="projects-grid">
            {filteredProjects.map((project, index) => {
              const title = getLocalizedText(project.title, language, 'Project');
              const description = getLocalizedText(project.description, language);
              const client =
                typeof project.client === 'object'
                  ? getLocalizedText(project.client, language)
                  : String(project.client || '');
              const year = project.createdAt ? new Date(project.createdAt).getFullYear() : '';
              const tags = Array.isArray(project.tags) ? project.tags.slice(0, 3) : [];

              return (
                <motion.article
                  key={project.id}
                  className="projects-card"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 }}
                >
                  <Link to={`/projects/${project.id}`} className="projects-card-media">
                    <img src={project.images?.[0]} alt={title} loading="lazy" />
                    {project.featured ? (
                      <span className="projects-card-badge">{copy.featuredBadge}</span>
                    ) : null}
                  </Link>

                  <div className="projects-card-body">
                    <div className="projects-card-topline">
                      <span className="projects-category">
                        {getCategoryLabel(project.category, language)}
                      </span>
                      {year ? <span className="projects-year">{year}</span> : null}
                    </div>

                    <h2 className="projects-card-title">{title}</h2>
                    <p className="projects-card-description">{description}</p>

                    <div className="projects-card-meta">
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

                    {tags.length > 0 ? (
                      <div className="projects-card-tags">
                        {tags.map((tag) => (
                          <span key={`${project.id}-${tag}`}>{tag}</span>
                        ))}
                      </div>
                    ) : null}

                    <Link to={`/projects/${project.id}`} className="projects-card-link">
                      {copy.details}
                      <FiArrowRight />
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </div>
        ) : (
          <div className="projects-empty">
            <p>{copy.empty}</p>
          </div>
        )}

        <section className="projects-final-card">
          <div>
            <h2>{copy.finalTitle}</h2>
            <p>{copy.finalText}</p>
          </div>

          <Link to="/contact" className="btn btn-outline">
            {copy.finalCta}
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Projects;
