import React from 'react';
import { motion } from 'motion/react';

const stats = [
  { label: 'ANOS DE MERCADO', value: '10+' },
  { label: 'EM ATIVOS SOB GESTÃO', value: 'R$ 6B+' },
  { label: 'CLIENTES ATIVOS', value: '500+' },
];

export const SocialProof = () => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=2000"
          alt="Agro landscape"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gci/80 backdrop-blur-[2px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-20"
        >
          <span className="text-white/60 font-bold text-[10px] md:text-xs tracking-[0.2em] uppercase mb-4 block">NOSSOS NÚMEROS</span>
          <h2 className="text-3xl md:text-6xl font-extrabold text-white mb-8">
            O grupo que o <span className="text-agro-orange">Agro precisa</span>
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            Desde 2013 construindo uma trajetória de sucesso impulsionada pela confiança de nossos parceiros.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-md border border-white/10 p-8 md:p-12 rounded-[32px] md:rounded-[40px] hover:bg-white/10 transition-colors duration-500"
            >
              <p className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
                {stat.value}
              </p>
              <p className="text-[10px] md:text-xs font-bold text-white/40 tracking-[0.2em] uppercase">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
