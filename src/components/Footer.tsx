import React from 'react';
import { Instagram, Linkedin, Twitter } from 'lucide-react';
import logoFooter from '../assets/logos/logo-footer.png';

export const Footer = () => {
  return (
    <footer className="bg-white pt-24 pb-12 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-16 mb-20">
          <div className="col-span-2 lg:col-span-1">
            <img
              src={logoFooter}
              alt="Grupo Ceres Investimentos"
              className="mb-8 h-28 w-auto object-contain"
            />
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Transformando a relação do agronegócio com o dinheiro através de tecnologia e atendimento especializado.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-8 uppercase text-xs tracking-widest">GCI</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><a href="#" className="hover:text-gci transition-colors">Sobre nós</a></li>
              <li><a href="#" className="hover:text-gci transition-colors">Carreiras</a></li>
              <li><a href="#" className="hover:text-gci transition-colors">Imprensa</a></li>
              <li><a href="#" className="hover:text-gci transition-colors">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-8 uppercase text-xs tracking-widest">Soluções</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><a href="#" className="hover:text-gci transition-colors">Funding Agro</a></li>
              <li><a href="#" className="hover:text-gci transition-colors">Investimentos</a></li>
              <li><a href="#" className="hover:text-gci transition-colors">Conta Digital</a></li>
              <li><a href="#" className="hover:text-gci transition-colors">Proteção Patrimonial</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-8 uppercase text-xs tracking-widest">Ajuda</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><a href="#" className="hover:text-gci transition-colors">Central de Ajuda</a></li>
              <li><a href="#" className="hover:text-gci transition-colors">Canais de Atendimento</a></li>
              <li><a href="#" className="hover:text-gci transition-colors">Ouvidoria</a></li>
              <li><a href="#" className="hover:text-gci transition-colors">Segurança</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-8 uppercase text-xs tracking-widest">Siga-nos</h4>
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gci hover:text-white transition-all duration-300">
                <Linkedin size={20} />
              </a>
              <a href="#" className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gci hover:text-white transition-all duration-300">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gci hover:text-white transition-all duration-300">
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8 text-[11px] text-gray-400 font-medium uppercase tracking-widest">
          <p>© 2026 Grupo Ceres Investimentos. Todos os direitos reservados.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-gci transition-colors">Privacidade</a>
            <a href="#" className="hover:text-gci transition-colors">Termos</a>
            <a href="#" className="hover:text-gci transition-colors">Ética</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
