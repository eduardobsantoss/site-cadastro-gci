import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
    X,
    ArrowLeft,
    ChevronRight,
    CheckCircle2,
    FileText,
    ShieldCheck,
    Upload,
    Check,
    Lock,
    Plus,
    Trash2
} from 'lucide-react';
import { Logo } from './Logo';
import { cn } from '../lib/utils';

interface OperationRequestFlowProps {
    serviceName: string;
    onClose: () => void;
    onComplete: (operationData: any) => void;
}

type Step = 'DADOS_GERAIS' | 'DUPLICATAS' | 'CONFIRMACAO';

const STEPS: { id: Step; label: string; icon: any }[] = [
    { id: 'DADOS_GERAIS', label: 'Dados Gerais', icon: FileText },
    { id: 'DUPLICATAS', label: 'Subida de Títulos', icon: Upload },
    { id: 'CONFIRMACAO', label: 'Confirmação', icon: CheckCircle2 },
];

export const OperationRequestFlow = ({ serviceName, onClose, onComplete }: OperationRequestFlowProps) => {
    const [step, setStep] = useState<Step>('DADOS_GERAIS');
    const [formData, setFormData] = useState({
        grupoEmpresarial: '',
        conta: '',
        duplicatas: [] as string[],
    });

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

    const renderStepContent = () => {
        switch (step) {
            case 'DADOS_GERAIS':
                return (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-8"
                    >
                        <div className="text-center space-y-2">
                            <h2 className="text-3xl md:text-4xl font-black text-gci tracking-tighter">Dados Gerais</h2>
                            <p className="text-gray-500 text-lg md:text-xl font-medium">Informe os dados básicos para a operação de {serviceName}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-xs font-black text-gci ml-2 uppercase tracking-widest">Grupo Empresarial</label>
                                <select
                                    className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl py-3 px-5 text-base font-bold focus:ring-4 focus:ring-gci/5 focus:border-gci outline-none transition-all shadow-sm text-gray-700"
                                    value={formData.grupoEmpresarial}
                                    onChange={(e) => setFormData({ ...formData, grupoEmpresarial: e.target.value })}
                                >
                                    <option value="" disabled>Selecione o grupo</option>
                                    <option value="Grupo AgroTech">Grupo AgroTech</option>
                                    <option value="Fazendas Reunidas">Fazendas Reunidas</option>
                                    <option value="Ceres Participações">Ceres Participações</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black text-gci ml-2 uppercase tracking-widest">Conta</label>
                                <select
                                    className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl py-3 px-5 text-base font-bold focus:ring-4 focus:ring-gci/5 focus:border-gci outline-none transition-all shadow-sm text-gray-700"
                                    value={formData.conta}
                                    onChange={(e) => setFormData({ ...formData, conta: e.target.value })}
                                >
                                    <option value="" disabled>Selecione a conta</option>
                                    <option value="Conta Corrente - 12345-6">Conta Corrente - 12345-6</option>
                                    <option value="Conta Garantida - 98765-4">Conta Garantida - 98765-4</option>
                                    <option value="Conta Reserva - 55555-1">Conta Reserva - 55555-1</option>
                                </select>
                            </div>
                        </div>
                    </motion.div>
                );

            case 'DUPLICATAS':
                return (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-8"
                    >
                        <div className="text-center space-y-2">
                            <h2 className="text-3xl md:text-4xl font-black text-gci tracking-tighter">Subida de Títulos</h2>
                            <p className="text-gray-500 text-lg md:text-xl font-medium">Extração de Ativos (Duplicatas)</p>
                        </div>

                        <div className="space-y-6 pt-4">
                            <div className="border-2 border-dashed border-gray-200 rounded-3xl p-10 flex flex-col items-center justify-center gap-4 bg-gray-50/50 hover:bg-gray-50 hover:border-gci/30 transition-all cursor-pointer group shadow-sm">
                                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-gray-400 group-hover:text-gci transition-colors shadow-md">
                                    <Upload size={32} />
                                </div>
                                <div className="text-center">
                                    <p className="text-xl font-bold text-gci">Arraste ou clique para enviar duplicatas</p>
                                    <p className="text-sm text-gray-400 mt-2">Você pode selecionar múltiplos arquivos (XML, PDF)</p>
                                </div>
                            </div>

                            {/* Placeholder for selected files */}
                            <div className="bg-white rounded-2xl border-2 border-gray-100 p-4 flex items-center justify-between shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-gci/10 flex items-center justify-center text-gci">
                                        <FileText size={20} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm text-gray-900">NFE_001234.xml</p>
                                        <p className="text-xs text-gray-500">1.2 MB</p>
                                    </div>
                                </div>
                                <button className="text-gray-400 hover:text-red-500 transition-colors p-2">
                                    <Trash2 size={18} />
                                </button>
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
                            <h2 className="text-3xl md:text-4xl font-black text-gci tracking-tighter">Solicitação Enviada!</h2>
                            <p className="text-gray-500 text-lg md:text-xl font-medium">Sua solicitação de {serviceName} foi recebida e está em análise.</p>
                        </div>

                        <div className="bg-gray-50 rounded-3xl p-8 text-left space-y-8 border-2 border-gray-100 shadow-sm">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-black">Operação</p>
                                    <p className="text-lg font-black text-gci">{serviceName}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-black">Grupo Empresarial</p>
                                    <p className="text-lg font-black text-gci truncate">{formData.grupoEmpresarial || 'Não informado'}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-black">Conta</p>
                                    <p className="text-lg font-black text-gci truncate">{formData.conta || 'Não informada'}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-black">Títulos</p>
                                    <p className="text-lg font-black text-gci truncate">1 arquivo(s)</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gci/5 border-2 border-gci/10 rounded-2xl p-6 text-left shadow-sm">
                            <h4 className="text-lg font-black text-gci mb-1">Acompanhe sua operação</h4>
                            <p className="text-sm text-gray-500 leading-relaxed font-medium">
                                Você pode acompanhar o status desta e de outras operações diretamente na sua visão geral.
                            </p>
                        </div>
                    </motion.div>
                );
        }
    };

    const isLastStep = step === 'CONFIRMACAO';

    return (
        <div className="fixed inset-0 z-[100] bg-white overflow-hidden flex flex-col lg:flex-row h-[100dvh]">
            {/* Left Side: Info & Branding */}
            <div className="hidden lg:flex lg:w-[380px] bg-gci flex-col p-10 text-white relative overflow-hidden shrink-0">
                <div className="relative z-10">
                    <Logo variant="dark" className="mb-10 scale-90 origin-left" />
                    <h2 className="text-3xl font-extrabold leading-tight mb-5">
                        Nova Solicitação de <span className="text-agro-orange">Operação</span>.
                    </h2>
                    <p className="text-white/70 text-base leading-relaxed mb-10">
                        Preencha os dados ao lado para solicitar a operação de {serviceName}. Nossa equipe analisará sua solicitação o mais rápido possível.
                    </p>

                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                <ShieldCheck size={18} className="text-agro-orange" />
                            </div>
                            <div>
                                <p className="font-bold text-sm">Análise Rápida</p>
                                <p className="text-xs text-white/50">Processo simplificado e ágil.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-agro-orange/10 rounded-full blur-3xl" />
                <div className="absolute top-40 -right-20 w-60 h-60 bg-white/5 rounded-full blur-2xl" />
            </div>

            {/* Right Side: Form Content */}
            <div className="flex-1 flex flex-col bg-white relative h-full overflow-hidden">
                <div className="absolute top-4 right-4 md:top-8 md:right-8 z-30">
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gci transition-all shadow-sm"
                        title="Fechar"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar touch-pan-y">
                    <div className="max-w-3xl mx-auto px-6 md:px-12 pt-16 pb-12 md:pt-20">
                        <div className="lg:hidden mb-8">
                            <Logo variant="light" className="scale-75 origin-left" />
                        </div>

                        {!isLastStep && (
                            <div className="w-full space-y-5 mb-12">
                                <div className="flex justify-between items-center">
                                    <div className="space-y-1">
                                        <p className="text-[9px] uppercase tracking-[0.3em] text-gray-400 font-black">
                                            Progresso da Solicitação
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

                                <div className="flex justify-between items-center relative pt-1">
                                    <div className="absolute top-5 left-0 w-full h-[2px] bg-gray-100 -z-10 rounded-full" />
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

                <div className="px-6 md:px-12 py-5 border-t border-gray-100 bg-white">
                    <div className="max-w-3xl mx-auto flex items-center justify-between">
                        {!isLastStep ? (
                            <>
                                <button
                                    onClick={step === 'DADOS_GERAIS' ? onClose : prevStep}
                                    className="px-5 py-2.5 rounded-lg font-bold text-gray-400 hover:text-gci hover:bg-gray-50 transition-all flex items-center gap-2 text-xs uppercase tracking-widest"
                                >
                                    <ArrowLeft size={14} />
                                    {step === 'DADOS_GERAIS' ? 'Cancelar' : 'Voltar'}
                                </button>
                                <button
                                    onClick={step === 'DUPLICATAS' ? () => { setStep('CONFIRMACAO'); onComplete(formData); } : nextStep}
                                    className="bg-gci hover:bg-gci/90 text-white px-10 py-3 rounded-lg font-bold text-sm uppercase tracking-widest flex items-center gap-2 transition-all shadow-lg shadow-gci/20 transform active:scale-95"
                                >
                                    {step === 'DUPLICATAS' ? 'Enviar Solicitação' : 'Continuar'}
                                    <ChevronRight size={16} />
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={onClose}
                                className="w-full bg-gci text-white py-3.5 rounded-lg font-bold text-base uppercase tracking-widest transition-all shadow-xl"
                            >
                                Ir para Minhas Operações
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
