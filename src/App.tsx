import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Solutions } from './components/Solutions';
import { Benefits } from './components/Benefits';
import { SocialProof } from './components/SocialProof';
import { HowItWorks } from './components/HowItWorks';
import { CallToAction } from './components/CallToAction';
import { Footer } from './components/Footer';
import { RegistrationFlow } from './components/RegistrationFlow';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { AnimatePresence } from 'motion/react';

type ViewState = 'landing' | 'login' | 'dashboard';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  const [isRegistering, setIsRegistering] = useState(false);
  const [registrationType, setRegistrationType] = useState<'CPF' | 'CNPJ'>('CNPJ');
  const [initialDocument, setInitialDocument] = useState('');

  const openRegistration = (type: 'CPF' | 'CNPJ' = 'CNPJ', document: string = '') => {
    setRegistrationType(type);
    setInitialDocument(document);
    setIsRegistering(true);
  };

  if (currentView === 'login') {
    return <Login onBack={() => setCurrentView('landing')} onLogin={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'dashboard') {
    return <Dashboard onLogout={() => setCurrentView('landing')} />;
  }

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-gci/10 selection:text-gci">
      <Navbar
        onOpenRegistration={() => openRegistration('CNPJ')}
        onLoginClick={() => setCurrentView('login')}
      />
      <main>
        <Hero onOpenRegistration={openRegistration} />
        <Solutions />
        <Benefits />
        <SocialProof />
        <HowItWorks />
        <CallToAction onOpenRegistration={() => openRegistration('CNPJ')} />
      </main>
      <Footer />

      <AnimatePresence>
        {isRegistering && (
          <RegistrationFlow
            initialType={registrationType}
            initialDocument={initialDocument}
            onClose={() => setIsRegistering(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
