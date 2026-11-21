import { useEffect } from 'react';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { TopUtilityBar } from './components/layout/TopUtilityBar';
import { MainHeader } from './components/layout/MainHeader';
import { MainFooter } from './components/layout/MainFooter';
import { BackToTopButton } from './components/ui/BackToTopButton';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { AcademicsPage } from './pages/AcademicsPage';
import { AdmissionsPage } from './pages/AdmissionsPage';
import { NewsPage } from './pages/NewsPage';
import { ContactPage } from './pages/ContactPage';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        AOS.refresh();
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    AOS.refresh();
  }, [pathname, hash]);

  return null;
}

export function App() {
  useEffect(() => {
    AOS.init({
      duration: 650,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60,
    });
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-paper-ivory text-slate-ink">
        <TopUtilityBar />
        <MainHeader />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/academics" element={<AcademicsPage />} />
            <Route path="/admissions" element={<AdmissionsPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <MainFooter />
        <BackToTopButton />
      </div>
    </BrowserRouter>
  );
}

export default App;
