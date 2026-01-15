import React, { useEffect, useState, useCallback } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PortfolioPage from './pages/PortfolioPage';

function App() {
  const location = useLocation();
  
  // Dark mode state - lifted to App level for sharing
  const [isDark, setIsDark] = useState(true); // Default to dark mode
  
  const toggleTheme = useCallback(() => {
    setIsDark(prev => !prev);
  }, []);
  
  // หน้าแรกมี Footer อยู่ใน component แล้ว และใช้ ScrollControls
  const isHomePage = location.pathname === '/';

  // ซ่อน browser scrollbar เมื่ออยู่หน้าแรก (ScrollControls จัดการ scroll เอง)
  useEffect(() => {
    if (isHomePage) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    };
  }, [isHomePage]);

  return (
    <div className="relative w-full min-h-screen">
      <Navbar isDark={isDark} toggleTheme={toggleTheme} />
      
      <Routes>
        {/* หน้าแรก - 3D Scrollytelling Experience */}
        <Route path="/" element={<HomePage isDark={isDark} />} />
        
        {/* หน้าอื่นๆ */}
        <Route path="/services" element={<ServicesPage isDark={isDark} />} />
        <Route path="/portfolio" element={<PortfolioPage isDark={isDark} />} />
        <Route path="/about" element={<AboutPage isDark={isDark} />} />
        <Route path="/contact" element={<ContactPage isDark={isDark} />} />
      </Routes>
      
      {/* แสดง Footer - z-0 เพื่อให้ modal ที่มี z-50 ทับได้ */}
      {!isHomePage && location.pathname !== '/services' && (
        <div className="relative z-0">
          <Footer />
        </div>
      )}
    </div>
  );
}

export default App;