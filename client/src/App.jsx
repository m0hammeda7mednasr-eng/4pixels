import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { useLanguage } from './context/LanguageContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import AdminRoute from './components/AdminRoute';
const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const Projects = lazy(() => import('./pages/Projects'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Login = lazy(() => import('./pages/Login'));
const Admin = lazy(() => import('./pages/Admin'));
const ShopifyConnect = lazy(() => import('./pages/ShopifyConnect'));
const ShopifySuccess = lazy(() => import('./pages/ShopifySuccess'));
const NotFound = lazy(() => import('./pages/NotFound'));

const RouteLoader = () => (
  <div className="route-loading" role="status" aria-live="polite">
    <div className="spinner" />
  </div>
);

const AppShell = () => {
  const { t } = useLanguage();

  return (
    <>
      <ScrollToTop />
      <a href="#main-content" className="skip-link">
        {t('skipToContent')}
      </a>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Suspense fallback={<RouteLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:id" element={<ServiceDetail />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <Admin />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/shopify"
              element={
                <AdminRoute>
                  <ShopifyConnect />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/shopify/success"
              element={
                <AdminRoute>
                  <ShopifySuccess />
                </AdminRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  );
};

function App() {
  return (
    <Router>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <AppShell />
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
