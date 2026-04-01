import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface CallToActionProps {
  onOpenRegistration: () => void;
}

export const CallToAction = ({ onOpenRegistration }: CallToActionProps) => {
  return (
    <section className="py-20 md:py-32 bg-gci relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=2000"
          alt="Agro field sunset"
          className="w-full h-full object-cover opacity-30"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gci via-gci/90 to-gci/80" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl z-10" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-6xl font-extrabold text-white mb-8 leading-tight">
            Pronto para <span className="text-agro-orange">transformar</span> seus resultados?
          </h2>
          <p className="text-lg md:text-xl text-white/70 mb-12 leading-relaxed">
            Junte-se a centenas de empresas e produtores que já confiam no Grupo GCI para potencializar seus investimentos e proteger seu patrimônio.
          </p>
          <button
            onClick={onOpenRegistration}
            className="w-full sm:w-auto bg-white text-gci hover:bg-gray-100 px-12 py-5 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-2xl flex items-center justify-center gap-3 mx-auto group"
          >
            Abra sua conta agora
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
