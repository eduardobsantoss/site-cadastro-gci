import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';

interface HeroProps {
  onOpenRegistration: (type: 'CPF' | 'CNPJ', document?: string) => void;
}

export const Hero = ({ onOpenRegistration }: HeroProps) => {
  const [type, setType] = useState<'CPF' | 'CNPJ'>('CNPJ');
  const [inputValue, setInputValue] = useState('');

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenRegistration(type, inputValue);
  };

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background Image with Agro Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=2200"
          alt="Agro field"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 agro-overlay" />
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-6 w-full relative z-10 grid lg:grid-cols-2 gap-8 lg:gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left"
        >
          <div className="inline-block px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-white text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase mb-1 backdrop-blur-sm">
            Grupo Ceres Investimentos
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.05] max-w-[640px] mb-4">
            Soluções financeiras sob medida para o <span className="text-[#F27D26]">Agro</span>
          </h1>
          <p className="text-base md:text-lg text-white/90 max-w-[560px] mx-auto lg:mx-0 mb-7 leading-relaxed">
            Funding, investimentos e proteção patrimonial para empresas e produtores que querem crescer com segurança.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <button
              onClick={() => onOpenRegistration('CNPJ')}
              className="w-full sm:w-auto bg-white hover:bg-gray-100 text-[#083c4a] px-9 py-3 rounded-full font-bold text-base transition-all transform hover:scale-105 shadow-2xl flex items-center justify-center gap-2.5"
            >
              Começar agora
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white p-6 md:p-8 rounded-[28px] md:rounded-[34px] shadow-2xl w-full lg:max-w-[460px] lg:ml-auto border border-white/20"
        >
          <h2 className="text-2xl md:text-[30px] font-bold text-gray-900 mb-1">
            Abra sua conta em minutos
          </h2>
          <p className="text-gray-500 mb-6 text-sm">
            Preencha os dados abaixo para iniciar seu atendimento especializado.
          </p>

          <div className="flex gap-2 mb-6 p-1.5 bg-gray-100 rounded-2xl">
            <button
              onClick={() => setType('CNPJ')}
              className={`relative flex-1 py-3 rounded-xl font-bold transition-colors text-sm ${
                type === 'CNPJ' ? 'text-white' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {type === 'CNPJ' && (
                <motion.span
                  layoutId="heroTypePill"
                  className="absolute inset-0 bg-gci rounded-xl shadow-lg"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">Pessoa Jurídica</span>
            </button>
            <button
              onClick={() => setType('CPF')}
              className={`relative flex-1 py-3 rounded-xl font-bold transition-colors text-sm ${
                type === 'CPF' ? 'text-white' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {type === 'CPF' && (
                <motion.span
                  layoutId="heroTypePill"
                  className="absolute inset-0 bg-gci rounded-xl shadow-lg"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">Pessoa Física</span>
            </button>
          </div>

          <form onSubmit={handleContinue} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder={type === 'CPF' ? 'Digite seu CPF' : 'Digite seu CNPJ'}
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3.5 px-6 text-base focus:ring-4 focus:ring-gci/10 focus:border-gci outline-none transition-all placeholder:text-gray-400"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gci hover:bg-gci-hover text-white h-[52px] rounded-2xl font-bold text-base flex items-center justify-center gap-2 group transition-all shadow-xl"
            >
              Continuar
              <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <p className="text-[12px] text-gray-400 mt-6 text-center leading-relaxed">
            Ao continuar, você concorda com nossa <a href="#" className="underline hover:text-gci transition-colors">Política de Privacidade</a>.
          </p>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      {/* <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/60 to-transparent" />
      </div> */}
    </section>
  );
};
