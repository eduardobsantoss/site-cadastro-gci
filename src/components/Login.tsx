import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ChevronRight, Lock, Mail } from 'lucide-react';
import { Logo } from './Logo';

interface LoginProps {
    onBack: () => void;
    onLogin: () => void;
}

export const Login = ({ onBack, onLogin }: LoginProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin();
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <div className="p-6 md:p-8 flex items-center justify-between">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-gray-500 hover:text-gci transition-colors font-bold text-sm uppercase tracking-widest"
                >
                    <ArrowLeft size={16} />
                    Voltar
                </button>
                <Logo variant="light" className="scale-90" />
            </div>

            <div className="flex-1 flex items-center justify-center p-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-8 md:p-12 rounded-[32px] shadow-2xl w-full max-w-md border border-gray-100"
                >
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gci/10 text-gci rounded-full flex items-center justify-center mx-auto mb-6">
                            <Lock size={32} />
                        </div>
                        <h1 className="text-3xl font-black text-gci tracking-tighter mb-2">Acesse sua conta</h1>
                        <p className="text-gray-500 font-medium">Insira seus dados para continuar</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-xs font-black text-gci ml-2 uppercase tracking-widest">E-mail</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-400">
                                    <Mail size={20} />
                                </div>
                                <input
                                    type="email"
                                    required
                                    placeholder="Seu e-mail cadastrado"
                                    className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl py-3.5 pl-12 pr-5 text-base font-bold focus:ring-4 focus:ring-gci/5 focus:border-gci outline-none transition-all shadow-sm placeholder:text-gray-300"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between ml-2">
                                <label className="text-xs font-black text-gci uppercase tracking-widest">Senha</label>
                                <a href="#" className="text-xs font-bold text-gray-400 hover:text-gci transition-colors">Esqueceu a senha?</a>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-400">
                                    <Lock size={20} />
                                </div>
                                <input
                                    type="password"
                                    required
                                    placeholder="Sua senha"
                                    className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl py-3.5 pl-12 pr-5 text-base font-bold focus:ring-4 focus:ring-gci/5 focus:border-gci outline-none transition-all shadow-sm placeholder:text-gray-300"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gci hover:bg-gci-hover text-white h-[52px] rounded-xl font-bold text-base flex items-center justify-center gap-2 group transition-all shadow-xl mt-8"
                        >
                            Entrar
                            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};
