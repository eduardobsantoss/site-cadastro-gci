import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ArrowLeft,
  ChevronRight,
  CheckCircle2,
  User,
  Building2,
  Mail,
  Phone,
  MapPin,
  Upload,
  ShieldCheck,
  Clock,
  Briefcase,
  FileText,
  Check,
  Lock
} from 'lucide-react';
import { Logo } from './Logo';
import { cn } from '../lib/utils';

interface RegistrationFlowProps {
  initialType?: 'CPF' | 'CNPJ';
  initialDocument?: string;
  onClose: () => void;
}

type Step = 'TIPO' | 'CADASTRO' | 'SERVICOS' | 'TERMOS' | 'CONFIRMACAO';

const STEPS: { id: Step; label: string; icon: any }[] = [
  { id: 'TIPO', label: 'Tipo', icon: User },
  { id: 'CADASTRO', label: 'Cadastro', icon: FileText },
  { id: 'SERVICOS', label: 'Serviços', icon: Briefcase },
  { id: 'TERMOS', label: 'Termos', icon: ShieldCheck },
  { id: 'CONFIRMACAO', label: 'Confirmação', icon: CheckCircle2 },
];

export const RegistrationFlow = ({ initialType = 'CNPJ', initialDocument = '', onClose }: RegistrationFlowProps) => {
  const [step, setStep] = useState<Step>('TIPO');
  const [type, setType] = useState<'CPF' | 'CNPJ'>(initialType);
  const [formData, setFormData] = useState({
    name: '',
    document: initialDocument,
    repName: '',
    repCpf: '',
    phone: '',
    email: '',
    address: '',
    services: [] as string[],
    termsAccepted: false,
    privacyAccepted: false,
    scrAuthorized: false,
  });

  useEffect(() => {
    if (initialDocument) {
      setStep('CADASTRO');
      setType(initialType);
    }
  }, [initialDocument, initialType]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousOverscroll = document.body.style.overscrollBehavior;
    document.body.style.overflow = 'hidden';
    document.body.style.overscrollBehavior = 'none';

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.overscrollBehavior = previousOverscroll;
    };
  }, []);

  const nextStep = () => {
    const currentIndex = STEPS.findIndex(s => s.id === step);
    if (currentIndex < STEPS.length - 1) {
      setStep(STEPS[currentIndex + 1].id);
    }
  };

  const prevStep = () => {
    const currentIndex = STEPS.findIndex(s => s.id === step);
    if (currentIndex > 0) {
      setStep(STEPS[currentIndex - 1].id);
    }
  };

  const toggleService = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const renderStepContent = () => {
    switch (step) {
      case 'TIPO':
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-8 text-center"
          >
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-black text-gci tracking-tighter">Bem-vindo ao GCI</h2>
              <p className="text-gray-500 text-lg md:text-xl font-medium">Selecione o tipo de cadastro para começar</p>
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-sm text-gray-400 pt-4">
                <span className="flex items-center gap-2 font-bold"><ShieldCheck size={18} className="text-gci" /> Dados protegidos pela LGPD</span>
                <span className="flex items-center gap-2 font-bold"><Clock size={18} className="text-gci" /> ~5 min para concluir</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => setType('CPF')}
                className={cn(
                  "p-6 rounded-2xl border-2 transition-all text-left group hover:shadow-lg",
                  type === 'CPF' ? "border-gci bg-gci/5 shadow-md" : "border-gray-100 bg-white"
                )}
              >
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-colors",
                  type === 'CPF' ? "bg-gci text-white" : "bg-gray-100 text-gray-400 group-hover:bg-gray-200"
                )}>
                  <User size={24} />
                </div>
                <h3 className="text-lg font-bold text-gci mb-1">Pessoa Física</h3>
                <p className="text-gray-500 text-xs leading-relaxed">Cadastro individual para investidores</p>
              </button>

              <button
                onClick={() => setType('CNPJ')}
                className={cn(
                  "p-6 rounded-2xl border-2 transition-all text-left group hover:shadow-lg",
                  type === 'CNPJ' ? "border-gci bg-gci/5 shadow-md" : "border-gray-100 bg-white"
                )}
              >
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-colors",
                  type === 'CNPJ' ? "bg-gci text-white" : "bg-gray-100 text-gray-400 group-hover:bg-gray-200"
                )}>
                  <Building2 size={24} />
                </div>
                <h3 className="text-lg font-bold text-gci mb-1">Pessoa Jurídica</h3>
                <p className="text-gray-500 text-xs leading-relaxed">Cadastro para empresas e organizações</p>
              </button>
            </div>
          </motion.div>
        );

      case 'CADASTRO':
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-8"
          >
            <div className="text-center space-y-2">
              <h2 className="text-3xl md:text-4xl font-black text-gci tracking-tighter">Dados da {type === 'CPF' ? 'Pessoa' : 'Empresa'}</h2>
              <p className="text-gray-500 text-lg md:text-xl font-medium">Preencha os dados da pessoa {type === 'CPF' ? 'física' : 'jurídica'}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-black text-gci ml-2 uppercase tracking-widest">{type === 'CPF' ? 'Nome Completo' : 'Razão Social'}</label>
                <input
                  type="text"
                  placeholder={type === 'CPF' ? 'Seu nome completo' : 'Razão social da empresa'}
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl py-3 px-5 text-base font-bold focus:ring-4 focus:ring-gci/5 focus:border-gci outline-none transition-all shadow-sm placeholder:text-gray-300"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-black text-gci ml-2 uppercase tracking-widest">{type}</label>
                <input
                  type="text"
                  placeholder={type === 'CPF' ? '000.000.000-00' : '00.000.000/0000-00'}
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl py-3 px-5 text-base font-bold focus:ring-4 focus:ring-gci/5 focus:border-gci outline-none transition-all shadow-sm placeholder:text-gray-300"
                  value={formData.document}
                  onChange={(e) => setFormData({ ...formData, document: e.target.value })}
                />
              </div>

              {type === 'CNPJ' && (
                <>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gci ml-2 uppercase tracking-widest">Nome do Representante</label>
                    <input
                      type="text"
                      placeholder="Nome completo"
                      className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl py-3 px-5 text-base font-bold focus:ring-4 focus:ring-gci/5 focus:border-gci outline-none transition-all shadow-sm placeholder:text-gray-300"
                      value={formData.repName}
                      onChange={(e) => setFormData({ ...formData, repName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gci ml-2 uppercase tracking-widest">CPF do Representante</label>
                    <input
                      type="text"
                      placeholder="000.000.000-00"
                      className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl py-3 px-5 text-base font-bold focus:ring-4 focus:ring-gci/5 focus:border-gci outline-none transition-all shadow-sm placeholder:text-gray-300"
                      value={formData.repCpf}
                      onChange={(e) => setFormData({ ...formData, repCpf: e.target.value })}
                    />
                  </div>
                </>
              )}

              <div className="space-y-2">
                <label className="text-xs font-black text-gci ml-2 uppercase tracking-widest">Telefone</label>
                <input
                  type="tel"
                  placeholder="(00) 00000-0000"
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl py-3 px-5 text-base font-bold focus:ring-4 focus:ring-gci/5 focus:border-gci outline-none transition-all shadow-sm placeholder:text-gray-300"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-gci ml-2 uppercase tracking-widest">E-mail</label>
                <input
                  type="email"
                  placeholder="empresa@email.com"
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl py-3 px-5 text-base font-bold focus:ring-4 focus:ring-gci/5 focus:border-gci outline-none transition-all shadow-sm placeholder:text-gray-300"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-black text-gci ml-2 uppercase tracking-widest">Endereço {type === 'CPF' ? 'Residencial' : 'da Empresa'}</label>
                <input
                  type="text"
                  placeholder="Rua, número, bairro, cidade - UF"
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl py-3 px-5 text-base font-bold focus:ring-4 focus:ring-gci/5 focus:border-gci outline-none transition-all shadow-sm placeholder:text-gray-300"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>
            </div>
          </motion.div>
        );

      case 'SERVICOS':
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-8"
          >
            <div className="text-center space-y-2">
              <h2 className="text-3xl md:text-4xl font-black text-gci tracking-tighter">Serviços de Interesse</h2>
              <p className="text-gray-500 text-lg md:text-xl font-medium">Selecione os serviços que deseja contratar</p>
            </div>

            <div className="space-y-4 pt-4">
              {[
                { id: 'funding', title: 'Funding para Empresas do Agro', desc: 'Soluções de crédito e financiamento para o agronegócio', icon: Briefcase },
                { id: 'banking', title: 'Conta Corrente e Investimentos', desc: 'Gestão financeira completa com rendimentos competitivos', icon: FileText },
                { id: 'realestate', title: 'Soluções Imobiliárias', desc: 'Crédito e assessoria para projetos imobiliários', icon: MapPin },
                { id: 'protection', title: 'Proteção Patrimonial', desc: 'Estratégias para preservação e blindagem de patrimônio', icon: ShieldCheck },
                { id: 'extra', title: 'Serviços Complementares', desc: 'Consultoria, câmbio e operações estruturadas', icon: Building2 },
              ].map((service) => (
                <button
                  key={service.id}
                  onClick={() => toggleService(service.id)}
                  className={cn(
                    "w-full p-6 rounded-2xl border-2 transition-all text-left flex items-center gap-6 group",
                    formData.services.includes(service.id)
                      ? "border-gci bg-gci/5 shadow-md"
                      : "border-gray-100 bg-white hover:border-gray-200"
                  )}
                >
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center transition-colors shadow-sm shrink-0",
                    formData.services.includes(service.id) ? "bg-gci text-white" : "bg-gray-100 text-gci group-hover:bg-gray-200"
                  )}>
                    <service.icon size={24} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-black text-gci">{service.title}</h4>
                    <p className="text-sm text-gray-500 mt-1 font-medium leading-tight">{service.desc}</p>
                  </div>
                  <div className={cn(
                    "w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all shrink-0",
                    formData.services.includes(service.id) ? "bg-gci border-gci text-white shadow-md" : "border-gray-200"
                  )}>
                    {formData.services.includes(service.id) && <Check size={18} />}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        );

      case 'TERMOS':
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-8"
          >
            <div className="text-center space-y-2">
              <h2 className="text-3xl md:text-4xl font-black text-gci tracking-tighter">Termos e Condições</h2>
              <p className="text-gray-500 text-lg md:text-xl font-medium">Leia e aceite os termos para prosseguir</p>
            </div>

            <div className="space-y-6 pt-4">
              <div className="bg-gray-50 border-2 border-gray-100 rounded-2xl p-8 text-sm text-gray-600 leading-relaxed shadow-inner">
                <h4 className="text-base font-black text-gci mb-4">Termos de Uso — GCI Grupo Ceres Investimentos</h4>
                <p>
                  Ao utilizar os serviços do GCI — Grupo Ceres Investimentos, você declara estar ciente e de acordo com os seguintes termos: (i) todas as informações fornecidas são verdadeiras e de sua inteira responsabilidade; (ii) o GCI poderá solicitar documentação complementar para fins de verificação cadastral e compliance; (iii) os serviços contratados estarão sujeitos às condições específicas de cada produto, que serão apresentadas em contrato próprio; (iv) o GCI se compromete a tratar seus dados pessoais de acordo com a Lei Geral de Proteção de Dados (LGPD).
                </p>
              </div>

              <div className="space-y-4">
                <label className="flex items-start gap-4 cursor-pointer group">
                  <div className="mt-1">
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={formData.termsAccepted}
                      onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                    />
                    <div className={cn(
                      "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all shadow-sm",
                      formData.termsAccepted ? "bg-gci border-gci text-white" : "border-gray-300 group-hover:border-gci"
                    )}>
                      {formData.termsAccepted && <Check size={16} />}
                    </div>
                  </div>
                  <span className="text-sm text-gci font-bold leading-tight pt-1">Li e aceito os Termos de Uso do GCI Grupo Ceres Investimentos.</span>
                </label>

                <label className="flex items-start gap-4 cursor-pointer group">
                  <div className="mt-1">
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={formData.privacyAccepted}
                      onChange={(e) => setFormData({ ...formData, privacyAccepted: e.target.checked })}
                    />
                    <div className={cn(
                      "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all shadow-sm",
                      formData.privacyAccepted ? "bg-gci border-gci text-white" : "border-gray-300 group-hover:border-gci"
                    )}>
                      {formData.privacyAccepted && <Check size={16} />}
                    </div>
                  </div>
                  <span className="text-sm text-gci font-bold leading-tight pt-1">Li e aceito a Política de Privacidade e autorizo o tratamento dos meus dados pessoais.</span>
                </label>

                <div className="bg-gci/5 border-2 border-gci/10 rounded-2xl p-6 space-y-4 shadow-sm">
                  <div className="flex items-center gap-3 text-gci font-black">
                    <Building2 size={24} />
                    <h4 className="text-lg">Autorização de Consulta ao SCR</h4>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed font-medium">
                    O Sistema de Informações de Crédito (SCR) é um instrumento de registro e consulta de informações sobre operações de crédito, gerido pelo Banco Central do Brasil. A consulta ao SCR permite ao GCI avaliar o perfil de crédito da empresa e oferecer soluções adequadas.
                  </p>
                  <label className="flex items-start gap-4 cursor-pointer group">
                    <div className="mt-1">
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={formData.scrAuthorized}
                        onChange={(e) => setFormData({ ...formData, scrAuthorized: e.target.checked })}
                      />
                      <div className={cn(
                        "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all shadow-sm",
                        formData.scrAuthorized ? "bg-gci border-gci text-white" : "border-gray-300 group-hover:border-gci"
                      )}>
                        {formData.scrAuthorized && <Check size={16} />}
                      </div>
                    </div>
                    <span className="text-sm text-gci font-black leading-tight pt-1">Autorizo a consulta ao Sistema de Informações de Crédito (SCR) do Banco Central do Brasil para fins de análise de crédito.</span>
                  </label>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'CONFIRMACAO':
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-10"
          >
            <div className="w-20 h-20 bg-gci/10 text-gci rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 size={40} />
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-black text-gci tracking-tighter">Obrigado!</h2>
              <p className="text-gray-500 text-lg md:text-xl font-medium">Estamos validando seus dados. Em breve você receberá um e-mail com seu usuário e senha de acesso.</p>
            </div>

            <div className="bg-gray-50 rounded-3xl p-8 text-left space-y-8 border-2 border-gray-100 shadow-sm">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-black">Tipo de Cadastro</p>
                  <p className="text-lg font-black text-gci">{type === 'CPF' ? 'Pessoa Física' : 'Pessoa Jurídica'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-black">{type === 'CPF' ? 'Nome' : 'Razão Social'}</p>
                  <p className="text-lg font-black text-gci truncate">{formData.name || 'Não informado'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-black">{type}</p>
                  <p className="text-lg font-black text-gci">{formData.document || 'Não informado'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-black">E-mail</p>
                  <p className="text-lg font-black text-gci truncate">{formData.email || 'Não informado'}</p>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-black">Serviços Selecionados</p>
                <div className="flex flex-wrap gap-2">
                  {formData.services.length > 0 ? (
                    formData.services.map(s => (
                      <span key={s} className="px-3 py-1 bg-gci/10 text-gci text-[10px] font-black rounded-full uppercase tracking-widest">
                        {s}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-400 text-sm italic font-medium">Nenhum serviço selecionado</span>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-gci/5 border-2 border-gci/10 rounded-2xl p-6 text-left shadow-sm">
              <h4 className="text-lg font-black text-gci mb-1">Próximos passos</h4>
              <p className="text-sm text-gray-500 leading-relaxed font-medium">
                Fique de olho na sua caixa de entrada (e no spam). Assim que a validação for concluída, enviaremos as instruções de acesso.
              </p>
            </div>
          </motion.div>
        );
    }
  };

  const isLastStep = step === 'CONFIRMACAO';
  const isFirstStep = step === 'TIPO';

  return (
    <div className="fixed inset-0 z-[100] bg-white overflow-hidden flex flex-col lg:flex-row h-[100dvh]">
      {/* Left Side: Info & Branding (Visible on Desktop) */}
      <div className="hidden lg:flex lg:w-[380px] bg-gci flex-col p-10 text-white relative overflow-hidden shrink-0">
        <div className="relative z-10">
          <Logo variant="dark" className="mb-10 scale-90 origin-left" />
          <h2 className="text-3xl font-extrabold leading-tight mb-5">
            Você começa a sua jornada <span className="text-agro-orange">aqui</span>.
          </h2>
          <p className="text-white/70 text-base leading-relaxed mb-10">
            Preencha os dados ao lado para que possamos entender seu perfil e oferecer as melhores soluções financeiras para o seu negócio.
          </p>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <ShieldCheck size={18} className="text-agro-orange" />
              </div>
              <div>
                <p className="font-bold text-sm">Ambiente Seguro</p>
                <p className="text-xs text-white/50">Seus dados estão protegidos pela LGPD.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <Clock size={18} className="text-agro-orange" />
              </div>
              <div>
                <p className="font-bold text-sm">Rápido e Prático</p>
                <p className="text-xs text-white/50">Apenas 5 minutos para concluir.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Background Element */}
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-agro-orange/10 rounded-full blur-3xl" />
        <div className="absolute top-40 -right-20 w-60 h-60 bg-white/5 rounded-full blur-2xl" />
      </div>

      {/* Right Side: Form Content */}
      <div className="flex-1 flex flex-col bg-white relative h-full overflow-hidden">
        {/* Close Button - Fixed at top right */}
        <div className="absolute top-4 right-4 md:top-8 md:right-8 z-30">
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gci transition-all shadow-sm"
            title="Fechar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar touch-pan-y">
          <div className="max-w-3xl mx-auto px-6 md:px-12 pt-16 pb-12 md:pt-20">
            {/* Mobile Logo */}
            <div className="lg:hidden mb-8">
              <Logo variant="light" className="scale-75 origin-left" />
            </div>

            {/* Progress Section - Now inside scrollable area */}
            {!isLastStep && (
              <div className="w-full space-y-5 mb-12">
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <p className="text-[9px] uppercase tracking-[0.3em] text-gray-400 font-black">
                      Progresso do Cadastro
                    </p>
                    <p className="text-xs font-bold text-gci">
                      Etapa {STEPS.findIndex(s => s.id === step) + 1} de {STEPS.length} — {STEPS.find(s => s.id === step)?.label}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-gci text-[9px] font-bold bg-gci/5 px-3 py-1.5 rounded-full border border-gci/10">
                    <Lock size={12} className="text-gci" />
                    Ambiente seguro
                  </div>
                </div>

                {/* Step Icons / Flowchart */}
                <div className="flex justify-between items-center relative pt-1">
                  {/* Progress Line Background */}
                  <div className="absolute top-5 left-0 w-full h-[2px] bg-gray-100 -z-10 rounded-full" />
                  {/* Active Progress Line */}
                  <motion.div
                    className="absolute top-5 left-0 h-[2px] bg-gci -z-10 rounded-full"
                    initial={{ width: '0%' }}
                    animate={{
                      width: `${(STEPS.findIndex(s => s.id === step) / (STEPS.length - 1)) * 100}%`
                    }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  />

                  {STEPS.map((s, idx) => {
                    const isActive = s.id === step;
                    const isCompleted = STEPS.findIndex(st => st.id === step) > idx;
                    return (
                      <div key={s.id} className="flex flex-col items-center gap-2 bg-white px-2">
                        <div className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 border-2",
                          isActive ? "bg-gci border-gci text-white scale-110 shadow-lg shadow-gci/20" :
                            isCompleted ? "bg-white border-gci text-gci" : "bg-white border-gray-100 text-gray-300"
                        )}>
                          {isCompleted ? <Check size={18} strokeWidth={3} /> : <s.icon size={18} />}
                        </div>
                        <span className={cn(
                          "text-[9px] font-black uppercase tracking-widest transition-colors hidden md:block",
                          isActive ? "text-gci" : "text-gray-300"
                        )}>{s.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <AnimatePresence mode="wait">
              {renderStepContent()}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer Actions - More Compact */}
        <div className="px-6 md:px-12 py-5 border-t border-gray-100 bg-white">
          <div className="max-w-3xl mx-auto flex items-center justify-between">
            {!isLastStep ? (
              <>
                <button
                  onClick={isFirstStep ? onClose : prevStep}
                  className="px-5 py-2.5 rounded-lg font-bold text-gray-400 hover:text-gci hover:bg-gray-50 transition-all flex items-center gap-2 text-xs uppercase tracking-widest"
                >
                  <ArrowLeft size={14} />
                  {isFirstStep ? 'Sair' : 'Voltar'}
                </button>
                <button
                  onClick={nextStep}
                  className="bg-gci hover:bg-gci/90 text-white px-10 py-3 rounded-lg font-bold text-sm uppercase tracking-widest flex items-center gap-2 transition-all shadow-lg shadow-gci/20 transform active:scale-95"
                >
                  {step === 'TERMOS' ? 'Finalizar' : 'Continuar'}
                  <ChevronRight size={16} />
                </button>
              </>
            ) : (
              <button
                onClick={onClose}
                className="w-full bg-gci text-white py-3.5 rounded-lg font-bold text-base uppercase tracking-widest transition-all shadow-xl"
              >
                Concluir e Voltar
              </button>
            )}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e5e7eb;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #d1d5db;
        }
      `}} />
    </div>
  );
};

