import React from 'react';
import { motion } from 'motion/react';
import { Zap, Users, BarChart3, Lock, Headphones, Globe } from 'lucide-react';

const benefits = [
  {
    title: 'Inovação Fintech',
    description: 'Tecnologia de ponta a serviço do agronegócio, com plataformas digitais modernas e ágeis.',
    icon: Zap,
  },
  {
    title: 'Atendimento Personalizado',
    description: 'Cada cliente é único. Soluções customizadas de acordo com a sua realidade e necessidades.',
    icon: Users,
  },
  {
    title: 'Resultados Comprovados',
    description: 'Mais de 10 anos de mercado com crescimento consistente e parceiros satisfeitos em todo o Brasil.',
    icon: BarChart3,
  },
  {
    title: 'Segurança e Transparência',
    description: 'Proteção completa com regulamentação sólida e transparência em todas as operações.',
    icon: Lock,
  },
  {
    title: 'Suporte Especializado',
    description: 'Time especialista no agro disponível para te atender quando e onde você precisar.',
    icon: Headphones,
  },
  {
    title: 'Presença Nacional',
    description: 'Atuação nas principais regiões produtoras do agronegócio brasileiro. Do campo ao mercado.',
    icon: Globe,
  },
];

export const Benefits = () => {
  return (
    <section id="beneficios" className="py-20 md:py-32 bg-gray-50 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 md:mb-20 text-center lg:text-left">
          <span className="text-gci font-bold text-[10px] md:text-xs tracking-[0.2em] uppercase mb-4 block">POR QUE A GCI?</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 max-w-2xl mx-auto lg:mx-0 leading-tight">
            Tradição do <span className="text-agro-orange">Agro</span> com inovação de <span className="text-agro-orange">Fintech</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-white p-10 rounded-[32px] border border-gray-100 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-gray-50 text-gci flex items-center justify-center mb-8 group-hover:bg-gci group-hover:text-white transition-colors duration-300">
                <benefit.icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
