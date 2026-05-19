import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '@/context/ThemeContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AIFab } from '@/components/ai/AIPanel';
import Home from '@/pages/Home';
import Calculators from '@/pages/Calculators';
import Calculator from '@/pages/Calculator';
import NotFound from '@/pages/NotFound';

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-[#060914] transition-colors duration-300">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calculators" element={<Calculators />} />
            <Route path="/calculators/:id" element={<Calculator />} />
            <Route path="/ai" element={<Calculator />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <AIFab />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: 'var(--toast-bg, #1e293b)',
              color: '#f1f5f9',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
            },
          }}
        />
      </div>
    </ThemeProvider>
  );
}
