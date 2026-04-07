import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Landmark, ShieldCheck } from 'lucide-react';

const solutions = [
  {
    id: 'funding-agro',
    category: 'PARA EMPRESAS',
    title: <>Funding para o <span className="text-agro-orange">Agro</span></>,
    description: 'Soluções de crédito customizadas para transformar necessidades financeiras em oportunidades reais de crescimento no campo.',
    icon: TrendingUp,
    variant: 'dark',
  },
  {
    id: 'conta-investimentos',
    category: 'PARA PF E PJ',
    title: 'Conta e Investimentos',
    description: 'Gestão e rentabilização de caixa com serviços que organizam suas finanças e fazem seu dinheiro trabalhar por você.',
    icon: Landmark,
    variant: 'light',
  },
  {
    id: 'protecao-patrimonial',
    category: 'PROTEÇÃO',
    title: 'Proteção Patrimonial',
    description: 'Estratégias inteligentes que minimizam riscos no patrimônio pessoal e empresarial com seguros sob medida.',
    icon: ShieldCheck,
    variant: 'light',
  },
];

export const Solutions = () => {
  return (
    <section id="solucoes" className="py-20 md:py-32 bg-white scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 md:mb-20 text-center lg:text-left">
          <span className="text-gci font-bold text-[10px] md:text-xs tracking-[0.2em] uppercase mb-4 block">Nossas Soluções</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 max-w-2xl mx-auto lg:mx-0 leading-tight">
            Para cada necessidade, uma solução
          </h2>
          <p className="text-base md:text-lg text-gray-500 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Conhecemos o agro por dentro. Portfólio completo e integrado para impulsionar seu negócio.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {solutions.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`p-10 rounded-[40px] transition-all duration-500 group border ${item.variant === 'dark'
                ? 'bg-gci text-white border-gci shadow-2xl shadow-gci/20'
                : 'bg-white text-gray-900 border-gray-100 hover:border-gci/20 hover:shadow-xl'
                }`}
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-10 transition-transform duration-500 group-hover:scale-110 ${item.variant === 'dark' ? 'bg-white/10 text-white' : 'bg-gray-50 text-gci'
                }`}>
                <item.icon size={32} />
              </div>
              <span className={`text-[10px] font-bold tracking-[0.2em] uppercase mb-3 block ${item.variant === 'dark' ? 'text-white/60' : 'text-gci'
                }`}>
                {item.category}
              </span>
              <h3 className="text-2xl font-bold mb-5 leading-tight">{item.title}</h3>
              <p className={`leading-relaxed text-sm ${item.variant === 'dark' ? 'text-white/70' : 'text-gray-500'
                }`}>
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
