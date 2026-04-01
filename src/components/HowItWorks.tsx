import React from 'react';
import { motion } from 'motion/react';
import { FileText, PhoneCall, Rocket } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Preencha seus dados',
    description: 'Informe seu CPF ou CNPJ no formulário. É rápido, simples e 100% digital — sem papelada.',
    icon: FileText,
  },
  {
    number: '02',
    title: 'Fale com um especialista',
    description: 'Nossa equipe especializada em agronegócio entra em contato para entender suas necessidades.',
    icon: PhoneCall,
  },
  {
    number: '03',
    title: 'Comece a crescer',
    description: 'Com a solução ideal para o seu perfil, seu negócio e patrimônio evoluem com segurança.',
    icon: Rocket,
  },
];

export const HowItWorks = () => {
  return (
    <section id="como-funciona" className="py-20 md:py-32 bg-white scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 md:mb-24">
          <span className="text-gci font-bold text-[10px] md:text-xs tracking-[0.2em] uppercase mb-4 block">COMO FUNCIONA</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            Simples, rápido e <span className="text-gci">sem burocracia</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-12 md:gap-16 relative">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-[1px] bg-gray-100 z-0" />
          
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative z-10 text-center"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gray-50 text-gci flex items-center justify-center mx-auto mb-8 md:mb-10 relative shadow-sm border border-gray-100 group hover:bg-gci hover:text-white transition-colors duration-500">
                <step.icon size={28} className="md:w-8 md:h-8" />
                <span className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-7 h-7 md:w-8 md:h-8 rounded-full bg-gci text-white text-[10px] md:text-xs font-bold flex items-center justify-center border-4 border-white">
                  {step.number}
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-[280px] mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 md:mt-24 text-center">
          <button className="w-full sm:w-auto bg-gci hover:bg-gci-hover text-white px-12 py-5 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-xl flex items-center justify-center gap-3 mx-auto">
            Abrir minha conta agora
            <span className="text-xl">→</span>
          </button>
        </div>
      </div>
    </section>
  );
};
