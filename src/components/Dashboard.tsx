import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
    LogOut,
    Wallet,
    TrendingUp,
    CreditCard,
    Bell,
    Search,
    ArrowUpRight,
    ArrowDownRight,
    MoreHorizontal,
    AlertCircle,
    Upload,
    X,
    FileText,
    Briefcase,
    Building2,
    Banknote,
    Hourglass,
    ChevronDown
} from 'lucide-react';
import { Logo } from './Logo';
import { OperationRequestFlow } from './OperationRequestFlow';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

interface DashboardProps {
    onLogout: () => void;
}

const data = [
    { name: 'Jan', value: 4000 },
    { name: 'Fev', value: 3000 },
    { name: 'Mar', value: 5000 },
    { name: 'Abr', value: 4500 },
    { name: 'Mai', value: 6000 },
    { name: 'Jun', value: 5500 },
    { name: 'Jul', value: 7000 },
];

const transactions = [
    { id: 1, name: 'Transferência Recebida', date: 'Hoje, 14:30', amount: '+ R$ 15.000,00', type: 'in' },
    { id: 2, name: 'Pagamento Fornecedor', date: 'Ontem, 09:15', amount: '- R$ 3.450,00', type: 'out' },
    { id: 3, name: 'Rendimento Investimento', date: '30 Mar, 08:00', amount: '+ R$ 1.240,50', type: 'in' },
    { id: 4, name: 'Pagamento Impostos', date: '28 Mar, 16:45', amount: '- R$ 8.900,00', type: 'out' },
];

export const Dashboard = ({ onLogout }: DashboardProps) => {
    const [showDocsModal, setShowDocsModal] = useState(false);
    const [showOperationRequest, setShowOperationRequest] = useState(false);
    const [selectedService, setSelectedService] = useState('');
    const [operations, setOperations] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState<'geral' | 'operacoes'>('geral');

    const handleOpenOperationRequest = (serviceName: string) => {
        setSelectedService(serviceName);
        setShowOperationRequest(true);
    };

    const handleCompleteOperation = (data: any) => {
        const newOperation = {
            id: Math.floor(Math.random() * 10000).toString(),
            type: selectedService,
            title: data.grupoEmpresarial || 'Operação',
            value: 'A calcular',
            status: 'Em análise',
            date: new Date().toLocaleDateString('pt-BR'),
        };
        setOperations([newOperation, ...operations]);
        setActiveTab('operacoes');
        setShowOperationRequest(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Top Navigation */}
            <header className="bg-white border-b border-gray-100 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Logo variant="dark" className="scale-75 origin-left" />
                        <div className="hidden md:flex items-center bg-gray-50 rounded-full px-4 py-2 border border-gray-100">
                            <Search size={18} className="text-gray-400 mr-2" />
                            <input
                                type="text"
                                placeholder="Buscar..."
                                className="bg-transparent border-none outline-none text-sm w-48 placeholder:text-gray-400"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4 md:gap-6">
                        <button className="relative p-2 text-gray-400 hover:text-gci transition-colors">
                            <Bell size={20} />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-agro-orange rounded-full"></span>
                        </button>
                        <div className="h-8 w-px bg-gray-200 hidden md:block"></div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gci/10 flex items-center justify-center text-gci font-bold">
                                JD
                            </div>
                            <div className="hidden md:block text-sm">
                                <p className="font-bold text-gray-900 leading-none">João Doe</p>
                                <p className="text-gray-500 text-xs mt-1">AgroTech S/A</p>
                            </div>
                        </div>
                        <button
                            onClick={onLogout}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors ml-2"
                            title="Sair"
                        >
                            <LogOut size={20} />
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 max-w-7xl mx-auto px-6 py-8 w-full">
                {/* Pending Docs Alert */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-orange-50 border border-orange-200 rounded-2xl p-4 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-agro-orange shrink-0">
                            <AlertCircle size={20} />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 text-sm">Finalize seu cadastro</h4>
                            <p className="text-xs text-gray-600 mt-0.5">Envie seus documentos para liberar todas as funcionalidades da sua conta.</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setShowDocsModal(true)}
                        className="bg-agro-orange hover:bg-[#e66d15] text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-colors shadow-sm whitespace-nowrap w-full md:w-auto"
                    >
                        Enviar Documentos
                    </button>
                </motion.div>

                {/* Tabs */}
                <div className="flex items-center gap-8 border-b border-gray-200 mb-8">
                    <button
                        onClick={() => setActiveTab('geral')}
                        className={`pb-4 text-sm font-black uppercase tracking-widest transition-colors relative ${activeTab === 'geral' ? 'text-gci' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        Visão Geral
                        {activeTab === 'geral' && (
                            <motion.div layoutId="activeTab" className="absolute -bottom-[1px] left-0 right-0 h-0.5 bg-gci" />
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab('operacoes')}
                        className={`pb-4 text-sm font-black uppercase tracking-widest transition-colors relative ${activeTab === 'operacoes' ? 'text-gci' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        Minhas Operações
                        {activeTab === 'operacoes' && (
                            <motion.div layoutId="activeTab" className="absolute -bottom-[1px] left-0 right-0 h-0.5 bg-gci" />
                        )}
                    </button>
                </div>

                {activeTab === 'geral' ? (
                    <>
                        <div className="mb-8">
                            <h1 className="text-2xl md:text-3xl font-black text-gci tracking-tight">Visão Geral</h1>
                            <p className="text-gray-500 mt-1">Acompanhe a saúde financeira do seu negócio.</p>
                        </div>

                        {/* KPI Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-12 h-12 rounded-2xl bg-gci/10 flex items-center justify-center text-gci">
                                        <Wallet size={24} />
                                    </div>
                                    <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-lg flex items-center gap-1">
                                        <ArrowUpRight size={14} /> 12%
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500 font-medium mb-1">Saldo Disponível</p>
                                <h3 className="text-3xl font-black text-gray-900">R$ 245.890,00</h3>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-gci p-6 rounded-3xl shadow-xl shadow-gci/20 text-white relative overflow-hidden"
                            >
                                <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                                <div className="flex items-center justify-between mb-4 relative z-10">
                                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white">
                                        <CreditCard size={24} />
                                    </div>
                                </div>
                                <p className="text-sm text-white/80 font-medium mb-1 relative z-10">Crédito Aprovado</p>
                                <h3 className="text-3xl font-black text-white relative z-10">R$ 1.500.000,00</h3>
                                <div className="mt-4 flex items-center gap-2 text-sm text-white/80 relative z-10">
                                    <span className="w-2 h-2 rounded-full bg-agro-orange"></span>
                                    Pré-aprovado para Funding
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-12 h-12 rounded-2xl bg-agro-orange/10 flex items-center justify-center text-agro-orange">
                                        <TrendingUp size={24} />
                                    </div>
                                    <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-lg flex items-center gap-1">
                                        <ArrowUpRight size={14} /> 5.4%
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500 font-medium mb-1">Investimentos</p>
                                <h3 className="text-3xl font-black text-gray-900">R$ 850.000,00</h3>
                            </motion.div>
                        </div>

                        {/* Available Services */}
                        <div className="mb-8">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-black text-gci">Serviços Disponíveis</h2>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <button
                                    onClick={() => handleOpenOperationRequest('Desconto de Duplicata')}
                                    className="bg-gci text-white p-6 rounded-2xl flex flex-col items-start gap-4 hover:bg-gci-hover transition-colors shadow-md text-left group"
                                >
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <ArrowDownRight size={20} />
                                    </div>
                                    <span className="font-bold leading-tight">Desconto de Duplicata</span>
                                </button>

                                <button
                                    onClick={() => handleOpenOperationRequest('Antecipação de Recebíveis')}
                                    className="bg-white border border-gray-200 text-gci p-6 rounded-2xl flex flex-col items-start gap-4 hover:border-gci/30 hover:bg-gray-50 transition-all shadow-sm text-left group"
                                >
                                    <div className="w-10 h-10 rounded-full bg-gci/5 flex items-center justify-center text-agro-orange group-hover:scale-110 transition-transform">
                                        <Banknote size={20} />
                                    </div>
                                    <span className="font-bold leading-tight">Antecipação de Recebíveis</span>
                                </button>

                                <button
                                    onClick={() => handleOpenOperationRequest('Capital de Giro')}
                                    className="bg-white border border-gray-200 text-gci p-6 rounded-2xl flex flex-col items-start gap-4 hover:border-gci/30 hover:bg-gray-50 transition-all shadow-sm text-left group"
                                >
                                    <div className="w-10 h-10 rounded-full bg-gci/5 flex items-center justify-center text-agro-orange group-hover:scale-110 transition-transform">
                                        <Briefcase size={20} />
                                    </div>
                                    <span className="font-bold leading-tight">Capital de Giro</span>
                                </button>

                                <button
                                    onClick={() => handleOpenOperationRequest('Financiamento Agro')}
                                    className="bg-white border border-gray-200 text-gci p-6 rounded-2xl flex flex-col items-start gap-4 hover:border-gci/30 hover:bg-gray-50 transition-all shadow-sm text-left group"
                                >
                                    <div className="w-10 h-10 rounded-full bg-gci/5 flex items-center justify-center text-agro-orange group-hover:scale-110 transition-transform">
                                        <Building2 size={20} />
                                    </div>
                                    <span className="font-bold leading-tight">Financiamento Agro</span>
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Chart Section */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="lg:col-span-2 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">Evolução Patrimonial</h3>
                                        <p className="text-sm text-gray-500">Últimos 7 meses</p>
                                    </div>
                                    <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
                                        <MoreHorizontal size={20} className="text-gray-400" />
                                    </button>
                                </div>
                                <div className="h-[300px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                            <defs>
                                                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#083c4a" stopOpacity={0.3} />
                                                    <stop offset="95%" stopColor="#083c4a" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                            <XAxis
                                                dataKey="name"
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fontSize: 12, fill: '#9ca3af' }}
                                                dy={10}
                                            />
                                            <YAxis
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fontSize: 12, fill: '#9ca3af' }}
                                                tickFormatter={(value) => `R$ ${value / 1000}k`}
                                            />
                                            <Tooltip
                                                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                                formatter={(value) => typeof value === 'number' ? `R$ ${value.toLocaleString('pt-BR')}` : 'N/A'}
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="value"
                                                stroke="#083c4a"
                                                strokeWidth={3}
                                                fillOpacity={1}
                                                fill="url(#colorValue)"
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </motion.div>

                            {/* Recent Transactions */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-bold text-gray-900">Últimas Movimentações</h3>
                                    <button className="text-sm font-bold text-gci hover:underline">Ver todas</button>
                                </div>
                                <div className="space-y-6">
                                    {transactions.map((tx) => (
                                        <div key={tx.id} className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'in' ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-500'
                                                    }`}>
                                                    {tx.type === 'in' ? <ArrowDownRight size={18} /> : <ArrowUpRight size={18} />}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-sm text-gray-900">{tx.name}</p>
                                                    <p className="text-xs text-gray-500">{tx.date}</p>
                                                </div>
                                            </div>
                                            <span className={`font-bold text-sm ${tx.type === 'in' ? 'text-green-500' : 'text-gray-900'
                                                }`}>
                                                {tx.amount}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="mb-8 flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl md:text-3xl font-black text-gci tracking-tight">Minhas Operações</h1>
                                <p className="text-gray-500 mt-1">Acompanhe o status das suas solicitações.</p>
                            </div>
                            <button
                                onClick={() => setActiveTab('geral')}
                                className="bg-gci text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-gci-hover transition-colors shadow-sm"
                            >
                                Nova Operação
                            </button>
                        </div>

                        {operations.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {operations.map((op) => (
                                    <motion.div
                                        key={op.id}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all group"
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-2xl bg-gci/5 flex items-center justify-center text-gci">
                                                    <FileText size={20} />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">#{op.id}</p>
                                                    <h3 className="font-black text-gci text-lg leading-tight">{op.type}</h3>
                                                </div>
                                            </div>
                                            <span className="bg-orange-50 text-agro-orange text-[10px] font-black px-3 py-1.5 rounded-full flex items-center gap-1.5 uppercase tracking-wider border border-orange-100">
                                                <Hourglass size={12} />
                                                {op.status}
                                            </span>
                                        </div>

                                        <div className="bg-gray-50 rounded-2xl p-4 mb-4 border border-gray-100">
                                            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-black mb-1">Grupo Empresarial</p>
                                            <p className="font-bold text-gray-700 truncate">{op.title}</p>
                                        </div>

                                        <div className="flex items-end justify-between mb-6">
                                            <div>
                                                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-black mb-1">Valor da Operação</p>
                                                <p className="text-2xl font-black text-gci">{op.value}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-black mb-1">Data</p>
                                                <p className="text-sm font-bold text-gray-600">{op.date}</p>
                                            </div>
                                        </div>

                                        <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                                                <Building2 size={14} />
                                                <span>Sem vínculo</span>
                                            </div>
                                            <button className="flex items-center gap-1 text-xs font-bold text-gci hover:text-gci-hover transition-colors bg-gci/5 px-3 py-1.5 rounded-lg">
                                                Ver detalhes
                                                <ArrowUpRight size={14} />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center flex flex-col items-center justify-center">
                                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-4">
                                    <FileText size={32} />
                                </div>
                                <h3 className="text-xl font-black text-gci mb-2">Nenhuma operação encontrada</h3>
                                <p className="text-gray-500 mb-6 max-w-md">Você ainda não possui nenhuma solicitação de operação. Acesse a Visão Geral para conhecer nossos serviços.</p>
                                <button
                                    onClick={() => setActiveTab('geral')}
                                    className="bg-gci text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-gci-hover transition-colors shadow-sm"
                                >
                                    Ver Serviços Disponíveis
                                </button>
                            </div>
                        )}
                    </>
                )}
            </main>

            {/* Document Upload Modal */}
            <AnimatePresence>
                {showDocsModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white rounded-[32px] shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]"
                        >
                            <div className="p-6 md:p-8 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
                                <div>
                                    <h2 className="text-2xl font-black text-gci">Envio de Documentos</h2>
                                    <p className="text-sm text-gray-500 mt-1">Faça o upload dos arquivos necessários para análise</p>
                                </div>
                                <button
                                    onClick={() => setShowDocsModal(false)}
                                    className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 hover:text-gci hover:bg-gray-100 transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
                                <div className="space-y-6">
                                    {[
                                        'Contrato Social',
                                        'Comprovante de Endereço da Empresa',
                                        'Documento do Representante Legal',
                                        'Balanço Patrimonial Assinado',
                                        'DRE — Demonstração do Resultado do Exercício'
                                    ].map((docLabel) => (
                                        <div key={docLabel} className="space-y-2">
                                            <label className="text-xs font-black text-gci ml-2 uppercase tracking-widest">{docLabel}</label>
                                            <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 bg-gray-50/50 hover:bg-gray-50 hover:border-gci/30 transition-all cursor-pointer group shadow-sm">
                                                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-gray-400 group-hover:text-gci transition-colors shadow-md">
                                                    <Upload size={24} />
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-sm font-bold text-gci">Arraste ou clique para enviar</p>
                                                    <p className="text-xs text-gray-400 mt-1">PDF, JPG ou PNG</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="p-6 md:p-8 border-t border-gray-100 bg-gray-50">
                                <button
                                    onClick={() => setShowDocsModal(false)}
                                    className="w-full bg-gci hover:bg-gci-hover text-white py-4 rounded-xl font-bold text-base transition-colors shadow-lg"
                                >
                                    Concluir Envio
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Operation Request Flow */}
            <AnimatePresence>
                {showOperationRequest && (
                    <OperationRequestFlow
                        serviceName={selectedService}
                        onClose={() => setShowOperationRequest(false)}
                        onComplete={handleCompleteOperation}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};
