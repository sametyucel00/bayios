import React, { useState } from 'react';
import { Lock, Code2, ShieldAlert, LogIn, ChevronRight } from 'lucide-react';

const DeveloperLogin = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        setTimeout(() => {
            // Hardcoded strong developer credentials
            if (username === 'dev_admin_master' && password === 'BayiosDeveloper2026!') {
                onLogin({ id: 'developer_root', name: 'Sistem Mimarı', role: 'developer' });
            } else {
                setError('Erişim reddedildi. Yetkisiz girişim kaydedildi.');
                setIsLoading(false);
            }
        }, 1500);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 relative bg-slate-50 font-sans">
            <div className="relative w-full max-w-[400px]">


                <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-sm border border-slate-200 relative overflow-hidden">
                    <div className="text-center mb-6">
                        <div className="inline-flex relative mb-4 group">
                            <div className="absolute inset-0 bg-brand-primary/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                            <div className="relative p-4 rounded-3xl bg-gradient-to-br from-brand-primary/90 to-blue-600 shadow-xl border border-white/10">
                                <ShieldAlert className="text-white w-8 h-8" />
                            </div>
                        </div>
                        <h1 className="text-2xl font-black tracking-tight text-slate-800 mb-2 font-display">
                            Sistem <span className="text-blue-600">Mimarı.</span>
                        </h1>
                        <p className="text-slate-500 text-[9px] font-black tracking-[0.3em] uppercase opacity-60 flex items-center justify-center gap-2">
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-1.5 animate-in fade-in slide-in-from-top-2">
                            <label className="text-slate-500 text-[8px] font-black ml-1 uppercase tracking-widest opacity-50">Sistem Kimliği (Root_ID)</label>
                            <div className="relative group">
                                <Code2 className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-brand-primary transition-all duration-200" size={16} />
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 pl-12 pr-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold text-sm"
                                    placeholder="Sistem kimliğinizi girin..."
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5 animate-in fade-in slide-in-from-top-2 border-b border-transparent">
                            <label className="text-slate-500 text-[8px] font-black ml-1 uppercase tracking-widest opacity-50">Güvenlik Anahtarı</label>
                            <div className="relative group">
                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-brand-primary transition-all duration-200" size={16} />
                                <input
                                    type="password"
                                    required
                                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 pl-12 pr-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold text-sm"
                                    placeholder="• • • • • • • • • • • •"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="flex justify-center mt-2 animate-in slide-in-from-bottom-2">
                                <span className="inline-flex items-center gap-2 bg-red-500/10 text-red-500 text-xs font-bold px-4 py-2 rounded-xl border border-red-500/20 shadow-lg">
                                    <ShieldAlert size={14} className="animate-pulse" />
                                    {error}
                                </span>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-black uppercase tracking-widest text-xs py-4 px-6 rounded-2xl hover:bg-blue-700 transition-colors"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    <span>Yetkilendiriliyor...</span>
                                </>
                            ) : (
                                <>
                                    <span>Giriş Yap</span>
                                    <LogIn size={16} />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default DeveloperLogin;
