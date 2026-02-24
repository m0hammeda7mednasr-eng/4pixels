import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiSearch, FiArrowRight } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';
import api from '../services/api';
import { getCategoryLabel, PRIMARY_CATEGORIES } from '../utils/categoryLabels';
import './Projects.css';

const Projects = () => {
  const { t, language } = useLanguage();
  const [projects, setProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get('/projects');
        setProjects(res.data || []);
      } catch (err) {
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const categories = useMemo(() => {
    const availableCategories = Array.from(new Set(projects.map((project) => project.category).filter(Boolean)));
    const orderedPrimary = PRIMARY_CATEGORIES.filter((category) => availableCategories.includes(category));
    const remainingCategories = availableCategories.filter(
      (category) => !PRIMARY_CATEGORIES.includes(category)
    );
    return ['all', ...orderedPrimary, ...remainingCategories];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory = activeCategory === 'all' || project.category === activeCategory;
      const title = project.title?.[language] || project.title?.en || '';
      const matchesSearch = title.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [projects, activeCategory, search, language]);

  return (
    <div className="portfolio-page section">
      <div className="container">
        <div className="portfolio-header">
          <h1 className="section-title">{t('projects')}</h1>
          <p>
            {language === 'en'
              ? 'Portfolio cases across Shopify stores, automation workflows, and systems operations.'
              : 'نماذج أعمال عبر متاجر شوبيفاي وتدفقات الأتمتة وحلول الأنظمة والبيانات.'}
          </p>
        </div>

        <div className="portfolio-toolbar">
          <div className="portfolio-search">
            <FiSearch />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={language === 'en' ? 'Search projects...' : 'ابحث عن مشروع...'}
            />
          </div>

          <div className="portfolio-filters">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={activeCategory === cat ? 'active' : ''}
              >
                {cat === 'all' ? (language === 'en' ? 'All' : 'الكل') : getCategoryLabel(cat, language)}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="portfolio-loading">
            <div className="spinner" />
          </div>
        ) : (
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
                  <img src={project.images?.[0]} alt={project.title?.[language]} loading="lazy" />
                </Link>
                <div className="portfolio-card-body">
                  <span>{getCategoryLabel(project.category, language)}</span>
                  <h3>{project.title?.[language]}</h3>
                  <p>{project.description?.[language]}</p>
                  <Link to={`/projects/${project.id}`} className="portfolio-card-link">
                    {language === 'en' ? 'View details' : 'عرض التفاصيل'}
                    <FiArrowRight />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {!loading && filteredProjects.length === 0 && (
          <div className="portfolio-empty">
            <p>{language === 'en' ? 'No projects match your filters.' : 'لا توجد مشاريع مطابقة للبحث.'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
