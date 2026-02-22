import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import api from '../services/api';

const Projects = () => {
  const { t, language } = useLanguage();
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get('/projects', { params: { category: filter } });
        setProjects(res.data);
      } catch (err) {
        console.error('Error fetching projects:', err);
      }
    };
    fetchProjects();
  }, [filter]);

  const categories = [...new Set(projects.map(p => p.category))];

  return (
    <div className="projects-page section">
      <div className="container">
        <h1 className="section-title">{t('projects')}</h1>
        
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '40px', flexWrap: 'wrap' }}>
          <button onClick={() => setFilter('')} className={`btn ${!filter ? 'btn-primary' : 'btn-outline'}`}>
            All
          </button>
          {categories.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)} className={`btn ${filter === cat ? 'btn-primary' : 'btn-outline'}`}>
              {cat}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="project-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              {project.images?.[0] && (
                <img src={project.images[0]} alt={project.title[language]} />
              )}
              <div className="project-overlay">
                <h3>{project.title[language]}</h3>
                <p>{project.category}</p>
                <Link to={`/projects/${project.id}`} className="btn btn-primary">
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
