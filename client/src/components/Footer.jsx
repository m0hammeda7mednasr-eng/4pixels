import { Link } from 'react-router-dom';
import './Footer.css';

const footerGroups = [
  {
    title: 'Company',
    links: [
      { label: 'Home', to: '/' },
      { label: 'Services', to: '/services' },
      { label: 'Projects', to: '/projects' }
    ]
  },
  {
    title: 'Services',
    links: [
      { label: 'Shopify', to: '/services' },
      { label: 'Portfolio Sites', to: '/services' },
      { label: 'CRM Solutions', to: '/services' },
      { label: 'UI/UX Design', to: '/services' }
    ]
  },
  {
    title: 'Connect',
    links: [
      { label: 'Contact', to: '/contact' },
      { label: 'Twitter', to: 'https://twitter.com' },
      { label: 'LinkedIn', to: 'https://linkedin.com' },
      { label: 'Dribbble', to: 'https://dribbble.com' }
    ]
  }
];

const FooterLink = ({ item }) => {
  if (item.to.startsWith('http')) {
    return (
      <a href={item.to} target="_blank" rel="noreferrer">
        {item.label}
      </a>
    );
  }

  return <Link to={item.to}>{item.label}</Link>;
};

const Footer = () => (
  <footer className="site-footer" dir="ltr">
    <div className="site-footer-container">
      <div className="site-footer-main">
        <section className="site-footer-brand">
          <Link to="/" className="site-footer-logo" aria-label="4Pixels home">
            <span className="site-footer-logo-frame" aria-hidden="true">
              <img src="/assets/figma-4pixels-logo.png" alt="" />
            </span>
            <span>4Pixels</span>
          </Link>
          <p>Crafting premium digital experiences that help businesses scale.</p>
        </section>

        {footerGroups.map((group) => (
          <section key={group.title} className="site-footer-column">
            <h2>{group.title}</h2>
            <ul>
              {group.links.map((item) => (
                <li key={`${group.title}-${item.label}`}>
                  <FooterLink item={item} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="site-footer-bottom">
        <span>© 2026 4Pixels. All rights reserved.</span>
        <div>
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
          <Link to="/cookies">Cookies</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
