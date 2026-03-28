import React, { useState } from 'react';
import { X } from 'lucide-react';

const TransactionDrawer = ({ isOpen, onClose, onSave }) => {
    const [type, setType] = useState('income');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('Nakit');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            type,
            amount: parseFloat(amount),
            description,
            category,
            paymentMethod,
            date: new Date().toISOString() // Simplified date for now
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[150] flex justify-end">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose}></div>

            <div className="relative w-full sm:max-w-xl h-full bg-white sm:shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
                <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white/50 sticky top-0 z-10 backdrop-blur-md">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-lg">
                            <Plus size={24} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black text-slate-900 tracking-tight font-display uppercase leading-tight">İşlem Ekle</h3>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Yeni gelir veya gider kaydı</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-3 bg-white rounded-2xl text-slate-400 hover:text-slate-600 shadow-sm transition-colors border border-slate-100">
                        <X size={28} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden">
                    <div className="flex-1 overflow-y-auto p-10 space-y-8 scrollbar-hide">
                        <div className="p-1.5 bg-slate-100 rounded-2xl flex gap-1.5">
                            <button
                                type="button"
                                onClick={() => setType('income')}
                                className={`flex-1 py-4 text-xs font-black uppercase tracking-widest rounded-xl transition-all ${type === 'income' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                                    }`}
                            >
                                Gelir / Tahsilat
                            </button>
                            <button
                                type="button"
                                onClick={() => setType('expense')}
                                className={`flex-1 py-4 text-xs font-black uppercase tracking-widest rounded-xl transition-all ${type === 'expense' ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                                    }`}
                            >
                                Gider / Ödeme
                            </button>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">TUTAR (₺)</label>
                                <div className="relative">
                                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 font-bold text-2xl">₺</div>
                                    <input
                                        type="number" required step="0.01"
                                        placeholder="0.00"
                                        className="w-full pl-16 pr-8 py-6 bg-slate-50 border-2 border-transparent rounded-[2rem] outline-none focus:border-brand-primary focus:bg-white transition-all font-black text-slate-900 shadow-inner text-3xl"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        autoFocus
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">KATEGORİ</label>
                                    <select
                                        required
                                        className="w-full px-6 py-5 bg-slate-50 border-2 border-transparent rounded-[1.5rem] focus:outline-none focus:border-brand-primary focus:bg-white transition-all font-black text-slate-800 shadow-inner text-sm appearance-none"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                    >
                                        <option value="">Seçiniz</option>
                                        {type === 'income' ? (
                                            <>
                                                <option value="Satış">Satış</option>
                                                <option value="Tahsilat">Tahsilat</option>
                                                <option value="Diğer Gelir">Diğer Gelir</option>
                                            </>
                                        ) : (
                                            <>
                                                <option value="Yakıt">Yakıt</option>
                                                <option value="Yemek">Yemek</option>
                                                <option value="Tamir">Tamir/Bakım</option>
                                                <option value="Mal Alımı">Mal Alımı</option>
                                                <option value="Diğer Gider">Diğer Gider</option>
                                            </>
                                        )}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">ÖDEME YÖNTEMİ</label>
                                    <select
                                        className="w-full px-6 py-5 bg-slate-50 border-2 border-transparent rounded-[1.5rem] focus:outline-none focus:border-brand-primary focus:bg-white transition-all font-black text-slate-800 shadow-inner text-sm appearance-none"
                                        value={paymentMethod}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                    >
                                        <option value="Nakit">Nakit</option>
                                        <option value="POS">Kredi Kartı / POS</option>
                                        <option value="IBAN">Havale / EFT</option>
                                        <option value="Veresiye">Veresiye (Cari)</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">AÇIKLAMA</label>
                                <textarea
                                    className="w-full px-6 py-5 bg-slate-50 border-2 border-transparent rounded-[1.5rem] focus:outline-none focus:border-brand-primary focus:bg-white transition-all font-black text-slate-800 shadow-inner h-32 resize-none text-sm"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="İşlem detayları..."
                                />
                            </div>
                        </div>
                    </div>

                    <div className="p-8 bg-slate-50 border-t border-slate-100 flex gap-4 sticky bottom-0">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-6 bg-white border-2 border-slate-100 rounded-[2rem] font-black text-xs uppercase tracking-widest text-slate-400 hover:bg-slate-50 transition-all active:scale-95"
                        >
                            İPTAL
                        </button>
                        <button
                            type="submit"
                            className="flex-[2] py-6 bg-slate-900 text-white rounded-[2rem] font-black text-xs uppercase tracking-widest hover:bg-brand-primary transition-all shadow-2xl active:scale-95"
                        >
                            İŞLEMİ KAYDET
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TransactionDrawer;
