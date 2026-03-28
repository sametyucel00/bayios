import React, { useState, useMemo } from 'react';
import { Phone, Search, Clock, Smartphone, User, Trash2, XCircle, ShoppingCart } from 'lucide-react';
import useStore from '../store/useStore';

const Calls = () => {
    const { incomingCalls, clearIncomingCalls, deleteIncomingCall, setActiveCall } = useStore();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCalls = incomingCalls.filter(c => 
        (c.number || '').includes(searchTerm) ||
        (c.deviceId || '').toLowerCase().includes((searchTerm || '').toLowerCase())
    );

    const formatTime = (isoString) => {
        if (!isoString) return '-';
        return new Date(isoString).toLocaleString('tr-TR', {
            day: '2-digit', month: '2-digit', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });
    };

    return (
        <div className="p-4 md:p-8 bg-slate-50 min-h-screen w-full overflow-hidden">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                <div>
                    <p className="text-brand-primary text-[10px] font-black uppercase tracking-[0.2em] mb-2">İletişim Kayıtları</p>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight font-display">Arama Geçmişi</h1>
                </div>
                <div className="flex flex-wrap gap-4">
                    <button
                        onClick={() => setActiveCall({ number: '', manual: true })}
                        className="bg-slate-900 text-white hover:bg-slate-800 px-6 py-3.5 rounded-2xl transition-all font-black text-xs uppercase tracking-widest shadow-xl shadow-slate-900/10 flex items-center justify-center gap-2.5 active:scale-95 border border-slate-900"
                    >
                        <ShoppingCart size={18} /> MANUEL SİPARİŞ OLUŞTUR
                    </button>
                    <button
                        onClick={clearIncomingCalls}
                        className="bg-white border border-slate-200 text-rose-500 hover:bg-rose-50 px-6 py-3.5 rounded-2xl transition-all font-black text-xs uppercase tracking-widest shadow-sm flex items-center justify-center gap-2.5 active:scale-95"
                    >
                        <Trash2 size={18} /> LİSTEYİ TEMİZLE
                    </button>
                </div>
            </div>

            <div className="premium-card p-5 mb-8 bg-white/50 backdrop-blur-xl">
                <div className="relative group w-full max-w-md">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-primary transition-colors" size={20} />
                    <input
                        type="text"
                        placeholder="Numara veya hat ID ile ara..."
                        className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-brand-primary/5 focus:border-brand-primary focus:bg-white transition-all font-bold text-sm shadow-inner"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Desktop Table View */}
            <div className="premium-card overflow-hidden hidden md:block">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-black tracking-widest">
                            <tr>
                                <th className="px-8 py-5">Telefon Numarası</th>
                                <th className="px-8 py-5">Hat / Cihaz</th>
                                <th className="px-8 py-5">Zamanlama</th>
                                <th className="px-8 py-5">İşlem</th>
                                <th className="px-8 py-5 text-right w-10">Durum</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filteredCalls.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-8 py-20 text-center">
                                        <div className="flex flex-col items-center gap-4 opacity-20">
                                            <Phone size={48} />
                                            <p className="text-sm font-black uppercase">Arama kaydı bulunamadı</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredCalls.map((call, idx) => (
                                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600">
                                                    <User size={20} />
                                                </div>
                                                <span className="font-black text-slate-900 tracking-tight">{call.number}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-2">
                                                <Smartphone size={14} className="text-brand-primary" />
                                                <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{call.deviceId || 'Bilinmeyen'}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-2 text-slate-400">
                                                <Clock size={14} />
                                                <span className="text-xs font-bold">{formatTime(call.timestamp)}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <button
                                                onClick={() => setActiveCall({ number: call.number, deviceId: call.deviceId, manual: true })}
                                                className="flex items-center gap-2 bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white px-5 py-2.5 rounded-xl transition-all font-black text-[10px] uppercase tracking-widest shadow-sm active:scale-95 border border-emerald-100/50"
                                            >
                                                <ShoppingCart size={14} /> SİPARİŞ OLUŞTUR
                                            </button>
                                        </td>
                                        <td className="px-8 py-5 text-right flex items-center justify-end gap-3">
                                            <button 
                                                onClick={() => deleteIncomingCall(call.id)}
                                                className="p-2 text-slate-300 hover:text-rose-500 transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block shadow-lg shadow-emerald-500/50"></span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
                {filteredCalls.length === 0 ? (
                    <div className="premium-card p-12 text-center flex flex-col items-center gap-4 opacity-20">
                        <Phone size={48} />
                        <p className="text-sm font-black uppercase">Arama kaydı bulunamadı</p>
                    </div>
                ) : (
                    filteredCalls.map((call, idx) => (
                        <div key={idx} className="premium-card p-5 space-y-4">
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600">
                                        <User size={20} />
                                    </div>
                                    <div>
                                        <p className="font-black text-slate-900 text-lg tracking-tight">{call.number}</p>
                                        <div className="flex items-center gap-2">
                                            <Smartphone size={12} className="text-brand-primary" />
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{call.deviceId || 'Bilinmeyen'}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button 
                                        onClick={() => deleteIncomingCall(call.id)}
                                        className="p-2 text-slate-300"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-2 text-slate-400">
                                <Clock size={14} />
                                <span className="text-xs font-bold">{formatTime(call.timestamp)}</span>
                            </div>

                            <button
                                onClick={() => setActiveCall({ number: call.number, deviceId: call.deviceId, manual: true })}
                                className="w-full flex items-center justify-center gap-2 bg-emerald-50 text-emerald-600 active:bg-emerald-600 active:text-white py-4 rounded-2xl transition-all font-black text-[10px] uppercase tracking-widest border border-emerald-100 /50"
                            >
                                <ShoppingCart size={16} /> ŞİMDİ SİPARİŞ OLUŞTUR
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Calls;
