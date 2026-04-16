import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiArrowRight,
  FiAward,
  FiDatabase,
  FiGlobe,
  FiPenTool,
  FiShoppingBag,
  FiTrendingUp,
  FiUsers,
  FiZap
} from 'react-icons/fi';
import './Home.css';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 }
};

const services = [
  {
    icon: <FiShoppingBag />,
    title: 'Shopify Stores',
    text: 'E-commerce solutions that convert visitors into loyal customers',
    tone: 'purple'
  },
  {
    icon: <FiGlobe />,
    title: 'Portfolio Sites',
    text: 'Stunning brand showcases that leave lasting impressions',
    tone: 'blue'
  },
  {
    icon: <FiDatabase />,
    title: 'CRM Solutions',
    text: 'Smart management tools for modern businesses',
    tone: 'green'
  },
  {
    icon: <FiPenTool />,
    title: 'UI/UX Design',
    text: 'User-centered experiences backed by research',
    tone: 'amber'
  }
];

const stats = [
  { icon: <FiTrendingUp />, value: '120+', label: 'Projects Delivered' },
  { icon: <FiUsers />, value: '45+', label: 'Happy Clients' },
  { icon: <FiAward />, value: '98%', label: 'Satisfaction Rate' }
];

const particles = Array.from({ length: 26 }, (_, index) => ({
  id: index,
  left: `${5 + ((index * 37) % 91)}%`,
  top: `${8 + ((index * 53) % 82)}%`,
  size: 2 + (index % 5),
  delay: `${(index % 7) * 0.28}s`,
  opacity: 0.3 + (index % 5) * 0.1
}));

const Home = () => (
  <div className="figma-portfolio-page" dir="ltr">
    <section className="figma-hero">
      <div className="figma-particles" aria-hidden="true">
        {particles.map((particle) => (
          <span
            key={particle.id}
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
              animationDelay: particle.delay,
              opacity: particle.opacity
            }}
          />
        ))}
      </div>

      <div className="figma-hero-glow figma-hero-glow-right" aria-hidden="true" />
      <div className="figma-hero-glow figma-hero-glow-left" aria-hidden="true" />

      <div className="figma-container figma-hero-grid">
        <motion.div
          className="figma-hero-copy"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <span className="figma-kicker">
            <FiZap />
            Software Development Agency
          </span>

          <h1>
            We Craft <span>Digital Products</span>
            <br />
            That Drive Growth
          </h1>

          <p>
            From Shopify stores to custom CRM platforms, we build premium digital experiences
            that help businesses scale and succeed.
          </p>

          <div className="figma-actions">
            <Link to="/projects" className="figma-button figma-button-primary">
              View Our Work
              <FiArrowRight />
            </Link>
            <Link to="/contact" className="figma-button figma-button-secondary">
              Start a Project
            </Link>
          </div>
        </motion.div>

        <motion.div
          className="figma-hero-media"
          initial={{ opacity: 0, x: 32, scale: 0.98 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.12, ease: 'easeOut' }}
        >
          <motion.div
            className="figma-dotted-mark"
            aria-hidden="true"
            animate={{ rotate: [30, 42, 30], y: [0, -8, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className="figma-image-card">
            <img src="/assets/figma-team-working.jpg" alt="Team working on laptops and phones" />
            <div className="figma-image-wash" aria-hidden="true" />
          </div>

          <motion.article
            className="figma-float-card figma-float-card-green"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span>
              <FiTrendingUp />
            </span>
            <div>
              <strong>+180%</strong>
              <small>Revenue Growth</small>
            </div>
          </motion.article>

          <motion.article
            className="figma-float-card figma-float-card-blue"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span>
              <FiUsers />
            </span>
            <div>
              <strong>45+</strong>
              <small>Happy Clients</small>
            </div>
          </motion.article>
        </motion.div>
      </div>
    </section>

    <section className="figma-stats" aria-label="Portfolio metrics">
      <div className="figma-container figma-stats-row">
        {stats.map((item, index) => (
          <motion.article
            key={item.label}
            className="figma-stat-item"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.42, delay: index * 0.08 }}
          >
            <span>{item.icon}</span>
            <div>
              <strong>{item.value}</strong>
              <small>{item.label}</small>
            </div>
          </motion.article>
        ))}
      </div>
    </section>

    <section className="figma-services">
      <div className="figma-service-glow figma-service-glow-right" aria-hidden="true" />
      <div className="figma-service-glow figma-service-glow-left" aria-hidden="true" />

      <div className="figma-container">
        <div className="figma-section-head">
          <div>
            <span>What We Do</span>
            <h2>Our Services</h2>
          </div>
          <Link to="/services">
            View All
            <FiArrowRight />
          </Link>
        </div>

        <div className="figma-service-grid">
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              className="figma-service-card"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.42, delay: index * 0.08 }}
            >
              <span className={`figma-service-icon tone-${service.tone}`}>{service.icon}</span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>

    <section className="figma-quiet-section" aria-hidden="true">
      <div className="figma-container">
        <div className="figma-quiet-field" />
      </div>
    </section>

    <section className="figma-lower-atmosphere" aria-hidden="true">
      <div className="figma-particles figma-particles-lower">
        {particles.slice(0, 20).map((particle) => (
          <span
            key={`lower-${particle.id}`}
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
              animationDelay: particle.delay,
              opacity: particle.opacity
            }}
          />
        ))}
      </div>
    </section>
  </div>
);

export default Home;
