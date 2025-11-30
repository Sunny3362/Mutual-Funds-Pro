import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Funds from './pages/Funds';
import Education from './pages/Education';
import SIPCalculator from './pages/SIPCalculator';
import FuturesOptions from './pages/FuturesOptions';
import Payment from './pages/Payment';
import Verification from './pages/Verification';
import Chatbot from './components/Chatbot';
import { getCurrentUser } from './services/authService';
import { User, Fund } from './types';
import { MarketProvider } from './contexts/MarketContext';

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  // Default to home page for non-authenticated users
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedFund, setSelectedFund] = useState<Fund | null>(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      // Check verification status
      if (currentUser.isVerified) {
        setCurrentPage('dashboard');
      } else {
        setCurrentPage('verification');
      }
    }
  }, []);

  const handleLogin = (user: User) => {
    setUser(user);
    if (user.isVerified) {
      setCurrentPage('dashboard');
    } else {
      setCurrentPage('verification');
    }
  };

  const handleVerified = (updatedUser: User) => {
    setUser(updatedUser);
    setCurrentPage('dashboard');
  };

  const handleInvest = (fund: Fund) => {
    if (!user) {
      setCurrentPage('login');
      return;
    }
    if (!user.isVerified) {
      setCurrentPage('verification');
      return;
    }
    setSelectedFund(fund);
    setCurrentPage('payment');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home user={user} onNavigate={setCurrentPage} />;
      case 'dashboard': return user ? <Dashboard user={user} initialTab="overview" /> : <Login onLogin={handleLogin} onNavigate={setCurrentPage} />;
      case 'portfolio': return user ? <Dashboard user={user} initialTab="portfolio" /> : <Login onLogin={handleLogin} onNavigate={setCurrentPage} />;
      case 'funds': return <Funds onInvest={handleInvest} />;
      case 'sip': return <SIPCalculator />;
      case 'fno': return <FuturesOptions />;
      case 'education': return <Education />;
      case 'login': return user ? <Dashboard user={user} initialTab="overview" /> : <Login onLogin={handleLogin} onNavigate={setCurrentPage} />;
      case 'register': return user ? <Dashboard user={user} initialTab="overview" /> : <Register onLogin={handleLogin} onNavigate={setCurrentPage} />;
      case 'verification': return user ? <Verification user={user} onVerified={handleVerified} /> : <Login onLogin={handleLogin} onNavigate={setCurrentPage} />;
      case 'payment': return <Payment fund={selectedFund} onNavigate={setCurrentPage} onComplete={() => setSelectedFund(null)} />;
      default: return <Login onLogin={handleLogin} onNavigate={setCurrentPage} />;
    }
  };

  return (
    <MarketProvider>
      <div className="min-h-screen relative isolate bg-sky-50 text-slate-900">
        {/* Global Live Background Image with Ken Burns Effect - Light Blue Theme */}
        <div className="fixed inset-0 -z-10 overflow-hidden bg-sky-50">
           <div className="absolute inset-0 animate-ken-burns">
              <img 
                src="https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2832&auto=format&fit=crop" 
                alt="Background" 
                className="w-full h-full object-cover opacity-[0.08] saturate-0"
              />
           </div>
           {/* Gradient Overlay for Light Blue Tint */}
           <div className="absolute inset-0 bg-gradient-to-br from-sky-50/95 via-sky-50/70 to-blue-100/90 backdrop-blur-[1px]"></div>
           
           {/* Subtle Noise Texture Overlay for realism */}
           <div className="absolute inset-0 opacity-[0.3] mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
        </div>

        <Navbar user={user} onNavigate={setCurrentPage} currentPage={currentPage} />
        <main className="relative">
          {renderPage()}
        </main>
        <Chatbot />
      </div>
    </MarketProvider>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}