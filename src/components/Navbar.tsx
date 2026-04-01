import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { Logo } from './Logo';

interface NavbarProps {
  onOpenRegistration: () => void;
}

export const Navbar = ({ onOpenRegistration }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navItems = [
    { label: 'Soluções', sectionId: 'solucoes' },
    { label: 'Benefícios', sectionId: 'beneficios' },
    { label: 'Como Funciona', sectionId: 'como-funciona' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const navbarOffset = 92;
    const top = section.getBoundingClientRect().top + window.scrollY - navbarOffset;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3',
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto w-full px-5 md:px-6 relative flex items-center justify-between">
        <div className="flex items-center">
          <button
            type="button"
            onClick={scrollToTop}
            className="rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-gci/40 focus-visible:ring-offset-2"
            aria-label="Voltar ao topo"
          >
            <Logo variant={isScrolled ? 'light' : 'dark'} />
          </button>
        </div>

        <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {navItems.map((item) => (
            <button
              key={item.sectionId}
              onClick={() => scrollToSection(item.sectionId)}
              className={cn(
                'text-[14px] font-semibold hover:opacity-70 transition-opacity',
                isScrolled ? 'text-gray-700' : 'text-white'
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button
            className={cn(
              'text-[14px] font-semibold px-5 py-2.5 rounded-full border transition-colors',
              isScrolled
                ? 'text-gci border-gci/30 bg-white hover:bg-gci-light'
                : 'text-white border-white/40 bg-white/10 hover:bg-white/20'
            )}
          >
            Acesse sua conta
          </button>
          <button
            onClick={onOpenRegistration}
            className="bg-gci hover:bg-gci-hover text-white text-[14px] font-bold px-7 py-2.5 rounded-full transition-all transform hover:scale-105 shadow-lg"
          >
            Abra sua conta
          </button>
        </div>

        <button
          className="md:hidden p-2 rounded-lg transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className={isScrolled ? 'text-gray-900' : 'text-white'} size={24} />
          ) : (
            <Menu className={isScrolled ? 'text-gray-900' : 'text-white'} size={24} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-2xl p-6 md:hidden flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
          {navItems.map((item) => (
            <button
              key={item.sectionId}
              onClick={() => {
                scrollToSection(item.sectionId);
                setIsMobileMenuOpen(false);
              }}
              className="text-left py-3 text-gray-800 font-bold text-lg border-b border-gray-50"
            >
              {item.label}
            </button>
          ))}
          <button
            className="border border-gci/25 text-gci py-4 rounded-full font-semibold text-lg"
          >
            Acesse sua conta
          </button>
          <button
            onClick={() => {
              onOpenRegistration();
              setIsMobileMenuOpen(false);
            }}
            className="bg-gci text-white py-4 rounded-full font-bold text-lg shadow-xl mt-4"
          >
            Abra sua conta
          </button>
        </div>
      )}
    </nav>
  );
};
