import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import AdminRoute from './components/AdminRoute';
import Home from './pages/Home';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Admin from './pages/Admin';
import ShopifyConnect from './pages/ShopifyConnect';
import ShopifySuccess from './pages/ShopifySuccess';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <ScrollToTop />
            <a href="#main-content" className="skip-link">
              Skip to content
            </a>
            <Header />
            <main id="main-content" tabIndex={-1}>
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
            </main>
            <Footer />
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
