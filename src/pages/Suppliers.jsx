import React, { useState } from 'react';
import { Warehouse, Plus, FileText, Banknote, History, XCircle, Phone, User, Package, ChevronRight, ArrowUpRight, TrendingUp, ShieldCheck, MapPin, Search, MoreHorizontal, Calculator, Upload } from 'lucide-react';
import SupplierExcelImportDrawer from '../components/SupplierExcelImportDrawer';
import useStore from '../store/useStore';

const Suppliers = () => {
    const { suppliers, addSupplier, products, updateStock, updateSupplier, expenses } = useStore();
    const [selectedSupplier, setSelectedSupplier] = useState(null);
    const [transactionType, setTransactionType] = useState('Invoice');
    const [searchQuery, setSearchQuery] = useState('');
    const [activeMenu, setActiveMenu] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isImportDrawerOpen, setIsImportDrawerOpen] = useState(false);
    const [drawerMode, setDrawerMode] = useState('add'); // 'add', 'edit', 'details', 'invoice', 'payment', 'categories'
    const { categories, addCategory, deleteCategory } = useStore();
    const [newCategoryName, setNewCategoryName] = useState('');
    const [confirmDeleteCat, setConfirmDeleteCat] = useState(null);
    const supplierCategories = categories.filter(c => c.type === 'supplier');

    const [lineItems, setLineItems] = useState([{ productId: '', quantity: 0, price: 0 }]);
    const [manualTotal, setManualTotal] = useState('');
    const [transactionNote, setTransactionNote] = useState('');

    const [newSupplier, setNewSupplier] = useState({
        name: '', contact: '', phone: '', category: 'Su', balance: 0, address: ''
    });

    const filteredSuppliers = suppliers.filter(s =>
        (s.name || '').toLowerCase().includes((searchQuery || '').toLowerCase()) ||
        (s.category || '').toLowerCase().includes((searchQuery || '').toLowerCase())
    );

    const handleCreateSupplier = async (e) => {
        e.preventDefault();
        await addSupplier(newSupplier);
        setIsDrawerOpen(false);
        setNewSupplier({ name: '', contact: '', phone: '', category: 'Su', balance: 0, address: '' });
    };

    const handleImportSuppliers = async (importedSuppliers) => {
        for (const supplierData of importedSuppliers) {
            await addSupplier(supplierData);
        }
    };

    const handleOpenEdit = (supplier) => {
        setSelectedSupplier(supplier);
        setNewSupplier({
            name: supplier.name,
            contact: supplier.contact,
            phone: supplier.phone,
            category: supplier.category || 'Su',
            balance: supplier.balance || 0,
            address: supplier.address || ''
        });
        setDrawerMode('edit');
        setIsDrawerOpen(true);
        setActiveMenu(null);
    };

    const handleEditSupplier = async (e) => {
        e.preventDefault();
        await updateSupplier(selectedSupplier.id, newSupplier);
        setIsDrawerOpen(false);
        setSelectedSupplier(null);
        setNewSupplier({ name: '', contact: '', phone: '', category: 'Su', balance: 0, address: '' });
    };

    const addLineItem = () => {
        setLineItems([...lineItems, { productId: '', quantity: 0, price: 0 }]);
    };

    const removeLineItem = (index) => {
        setLineItems(lineItems.filter((_, i) => i !== index));
    };

    const updateLineItem = (index, field, value) => {
        const newItems = [...lineItems];
        newItems[index][field] = value;
        setLineItems(newItems);
    };

    const calculatedTotal = lineItems.reduce((acc, item) => acc + (item.quantity * item.price), 0);
    const displayedTotal = manualTotal !== '' ? manualTotal : calculatedTotal;

    const handleTransaction = async (e) => {
        e.preventDefault();
        const finalTotal = parseFloat(displayedTotal) || 0;

        if (transactionType === 'Invoice') {
            // 1. Update Stocks
            for (const item of lineItems) {
                if (item.productId && item.quantity > 0) {
                    await updateStock(item.productId, parseInt(item.quantity), true, {
                        buyPrice: parseFloat(item.price),
                        transportCost: 0 // Simplification for now
                    });
                }
            }

            // 2. Update Supplier Balance (Increase debt/decrease balance for Invoice)
            await updateSupplier(selectedSupplier.id, {
                balance: (selectedSupplier.balance || 0) - finalTotal
            });
        } else {
            // Payment: Increase balance (towards 0 if in debt)
            await updateSupplier(selectedSupplier.id, {
                balance: (selectedSupplier.balance || 0) + finalTotal
            });
        }

        setIsDrawerOpen(false);
        setLineItems([{ productId: '', quantity: 0, price: 0 }]);
        setManualTotal('');
        setTransactionNote('');
    };

    const handleOpenTransaction = (supplier, type) => {
        setSelectedSupplier(supplier);
        setTransactionType(type);
        setDrawerMode(type.toLowerCase()); // 'invoice' or 'payment'
        setLineItems([{ productId: '', quantity: 0, price: 0 }]);
        setManualTotal('');
        setTransactionNote('');
        setIsDrawerOpen(true);
    };

    return (
        <div className="p-4 md:p-8 bg-slate-50 min-h-screen selection:bg-brand-primary/10 w-full overflow-hidden">
            {/* Header section with Stats & Search */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-12 gap-8">
                <div className="animate-in fade-in slide-in-from-left duration-300">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-1.5 h-6 bg-brand-primary rounded-full"></div>
                        <p className="text-brand-primary text-[9px] font-black uppercase tracking-[0.3em]">TEDARİKÇİ YÖNETİMİ</p>
                    </div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tighter font-display leading-tight">
                        Tedarikçi <span className="text-brand-primary">Ekosistemi</span>
                    </h1>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full xl:w-auto animate-in fade-in slide-in-from-right duration-300">
                    <div className="relative group flex-1 sm:w-80">
                        <div className="absolute inset-0 bg-brand-primary/5 rounded-2xl blur-xl group-focus-within:bg-brand-primary/10 transition-all"></div>
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-primary transition-colors" size={20} />
                        <input
                            type="text"
                            placeholder="İsim, kategori veya yetkili ara..."
                            className="relative w-full pl-14 pr-6 py-4 bg-white/80 backdrop-blur-md border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-brand-primary/5 focus:border-brand-primary transition-all font-bold text-sm shadow-sm"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-1 sm:flex-none gap-3">
                        <button
                            onClick={() => setIsImportDrawerOpen(true)}
                            className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 px-6 py-3.5 rounded-2xl transition-all font-black text-xs uppercase tracking-widest shadow-sm flex items-center justify-center gap-2.5 active:scale-95"
                        >
                            <Upload size={18} className="text-emerald-500" /> EXCEL AKTAR
                        </button>
                        <button
                            onClick={() => { setDrawerMode('add'); setIsDrawerOpen(true); }}
                            className="relative group bg-slate-900 text-white px-8 py-4 rounded-2xl transition-all font-black text-xs uppercase tracking-widest shadow-2xl flex items-center justify-center gap-3 active:scale-95 overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-300"></div>
                            <span className="relative z-10">TEDARİKÇİ EKLE</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Quick Summary Cards */}
            {/* Quick Summary Cards - Compact Version */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 animate-in fade-in slide-in-from-bottom duration-300">
                <div className="premium-card p-5 md:p-6 flex items-center gap-5 group hover:border-indigo-500/30 transition-all duration-300">
                    <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 shadow-inner group-hover:scale-110 transition-transform duration-300">
                        <Warehouse size={24} />
                    </div>
                    <div>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-0.5">STRATEJİK ORTAK</p>
                        <p className="text-xl font-black text-slate-900 font-display tracking-tight">{suppliers.length} <span className="text-slate-400 text-[10px] uppercase">Firma</span></p>
                    </div>
                </div>
                <div className="premium-card p-5 md:p-6 flex items-center gap-5 group hover:border-rose-500/30 transition-all duration-300">
                    <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600 shadow-inner group-hover:scale-110 transition-transform duration-300">
                        <TrendingUp className="rotate-180" size={24} />
                    </div>
                    <div>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-0.5">TOPLAM YÜKÜMLÜLÜK</p>
                        <p className="text-xl font-black text-slate-900 font-display tracking-tight">₺{Math.abs(suppliers.reduce((acc, s) => acc + (s.balance < 0 ? s.balance : 0), 0)).toLocaleString('tr-TR')}</p>
                    </div>
                </div>
                <div className="premium-card p-5 md:p-6 flex items-center gap-5 group hover:border-emerald-500/30 transition-all duration-300">
                    <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 shadow-inner group-hover:scale-110 transition-transform duration-300">
                        <ShieldCheck size={24} />
                    </div>
                    <div>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-0.5">RİSK ANALİZİ</p>
                        <p className="text-xl font-black text-emerald-600 font-display tracking-tight">GÜVENLİ</p>
                    </div>
                </div>
            </div>

            {/* Suppliers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                {filteredSuppliers.length === 0 ? (
                    <div className="col-span-full py-28 bg-white/50 backdrop-blur-md rounded-[3.5rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 animate-in fade-in zoom-in duration-300">
                        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-8 opacity-40">
                            <Warehouse size={48} />
                        </div>
                        <p className="font-black text-2xl text-slate-800">Tedarikçi Bulunamadı</p>
                        <p className="text-sm font-medium mt-2 max-w-xs text-center">Arama kriterlerinize uygun sonuç yok veya henüz veri girişi yapılmamış.</p>
                    </div>
                ) : (
                    filteredSuppliers.map((supplier, idx) => (
                        <div
                            key={supplier.id}
                            style={{ animationDelay: `${idx * 100}ms` }}
                            className="premium-card group relative flex flex-col h-full hover:translate-y-[-8px] hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] transition-all duration-300 animate-in fade-in slide-in-from-bottom"
                        >
                            {/* Card Status Indicator */}
                            <div className={`absolute top-0 left-0 w-full h-1.5 rounded-t-2xl opacity-80 ${supplier.balance < -10000 ? 'bg-gradient-to-r from-rose-500 to-rose-300' :
                                supplier.category === 'Su' ? 'bg-gradient-to-r from-blue-500 to-blue-300' :
                                    'bg-gradient-to-r from-brand-primary to-brand-secondary'
                                }`}></div>

                            <div className="p-8 pb-4 flex-1">
                                <div className="flex justify-between items-start mb-8">
                                    <div className="flex items-center gap-5">
                                        <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-[2.2rem] flex items-center justify-center text-slate-800 group-hover:bg-slate-900 group-hover:text-white transition-all duration-300 shadow-inner group-hover:rotate-6">
                                            <Warehouse size={36} />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-none mb-2">{supplier.name}</h3>
                                            <div className="flex items-center gap-2">
                                                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${supplier.category === 'Su' ? 'bg-blue-50 text-blue-600' :
                                                    supplier.category === 'Tüp' ? 'bg-orange-50 text-orange-600' :
                                                        supplier.category === 'Lojistik' ? 'bg-indigo-50 text-indigo-600' :
                                                            'bg-slate-100 text-slate-600'
                                                    }`}>
                                                    {supplier.category === 'Su' ? '💧 SU PARTNERİ' :
                                                        supplier.category === 'Tüp' ? '🔥 ENERJİ GRUBU' :
                                                            supplier.category === 'Lojistik' ? '🚚 LOJİSTİK' : '📦 GENEL'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => { setSelectedSupplier(supplier); setDrawerMode('statement'); setIsDrawerOpen(true); }}
                                        className="p-3 text-slate-300 hover:text-slate-900 hover:bg-slate-50 rounded-2xl transition-all"
                                    >
                                        <ArrowUpRight size={22} />
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 gap-4 mb-8">
                                    <div className="flex items-center gap-4 p-4 bg-slate-50/50 rounded-2xl border border-transparent group-hover:border-slate-100 transition-all">
                                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-brand-primary shadow-sm">
                                            <User size={18} />
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Yönetici</p>
                                            <p className="text-xs font-black text-slate-700">{supplier.contact}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 p-4 bg-slate-50/50 rounded-2xl border border-transparent group-hover:border-slate-100 transition-all">
                                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-brand-primary shadow-sm">
                                            <Phone size={18} />
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">İrtibat</p>
                                            <p className="text-xs font-black text-slate-700">{supplier.phone}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="px-8 py-6 bg-slate-50/80 backdrop-blur-sm border-t border-slate-100 rounded-b-2xl mt-auto">
                                <div className="flex justify-between items-center relative">
                                    <div>
                                        <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.2em] mb-1">FİNANSAL DURUM</p>
                                        <div className="flex items-baseline gap-2">
                                            <p className={`text-2xl font-black font-display tracking-tight ${supplier.balance < 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                                                {supplier.balance < 0 ? `-₺${Math.abs(supplier.balance).toLocaleString('tr-TR')}` : `+₺${(supplier.balance || 0).toLocaleString('tr-TR')}`}
                                            </p>
                                            <span className={`text-[10px] font-black uppercase ${supplier.balance < 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                                                {supplier.balance < 0 ? 'Borçlu' : 'Bakiyeli'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => setActiveMenu(activeMenu === supplier.id ? null : supplier.id)}
                                            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${activeMenu === supplier.id ? 'bg-slate-900 text-white shadow-xl rotate-90 scale-110' : 'bg-white text-slate-400 hover:text-slate-900 shadow-sm hover:shadow-md'
                                                }`}
                                        >
                                            <MoreHorizontal size={22} />
                                        </button>

                                        {activeMenu === supplier.id && (
                                            <>
                                                <div className="fixed inset-0 z-[55]" onClick={() => setActiveMenu(null)} />
                                                <div className="absolute right-0 bottom-full mb-4 glass-dark rounded-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] z-[60] w-64 overflow-hidden animate-in fade-in zoom-in slide-in-from-bottom-4 duration-200 border border-white/10 p-2">
                                                    <div className="bg-white/5 px-4 py-4 rounded-2xl mb-2 border border-white/5">
                                                        <p className="text-[9px] font-black uppercase tracking-widest text-brand-primary mb-1">Kurumsal İşlemler</p>
                                                        <h4 className="text-sm font-black text-white truncate">{supplier.name}</h4>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <button onClick={() => { handleOpenTransaction(supplier, 'Invoice'); setActiveMenu(null); }} className="w-full text-left px-4 py-3 rounded-xl text-[10px] font-black text-slate-300 hover:bg-white/5 hover:text-white transition-all flex items-center gap-3">
                                                            <FileText size={18} className="text-brand-primary" /> ALIM KAYDI OLUŞTUR
                                                        </button>
                                                        <button onClick={() => { handleOpenTransaction(supplier, 'Payment'); setActiveMenu(null); }} className="w-full text-left px-4 py-3 rounded-xl text-[10px] font-black text-slate-300 hover:bg-emerald-500/10 hover:text-emerald-400 transition-all flex items-center gap-3">
                                                            <Banknote size={18} className="text-emerald-500" /> ÖDEME KAYDI GİR
                                                        </button>
                                                        <div className="h-px bg-white/5 mx-2 my-1" />
                                                        <button onClick={() => { handleOpenEdit(supplier); }} className="w-full text-left px-4 py-3 rounded-xl text-[10px] font-black text-slate-300 hover:bg-white/5 hover:text-white transition-all flex items-center gap-3">
                                                            <Plus size={18} className="text-amber-400" /> PROFİLİ DÜZENLE
                                                        </button>
                                                        <button onClick={() => { setSelectedSupplier(supplier); setDrawerMode('statement'); setIsDrawerOpen(true); setActiveMenu(null); }} className="w-full text-left px-4 py-3 rounded-xl text-[10px] font-black text-slate-300 hover:bg-white/5 hover:text-white transition-all flex items-center justify-between group">
                                                            <span className="flex items-center gap-3"><History size={18} className="text-indigo-400" /> TİCARİ EKSTRE</span>
                                                            <ChevronRight size={14} className="opacity-0 group-hover:opacity-100" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Premium Slide-over Drawer */}
            {isDrawerOpen && (
                <div className="fixed inset-0 z-[150] flex justify-end">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200"
                        onClick={() => setIsDrawerOpen(false)}
                    ></div>

                    <div className="relative w-full max-w-xl h-full bg-white shadow-[-20px_0_80px_-20px_rgba(0,0,0,0.2)] animate-in slide-in-from-right duration-200 ease-out border-l border-slate-100 flex flex-col">
                        {/* Drawer Header */}
                        <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-xl ${drawerMode === 'add' ? 'bg-slate-900' : drawerMode === 'edit' ? 'bg-brand-primary' : drawerMode === 'invoice' ? 'bg-brand-primary' : drawerMode === 'statement' ? 'bg-indigo-600' : 'bg-emerald-600'
                                    }`}>
                                    {drawerMode === 'add' ? <Plus size={28} /> : drawerMode === 'edit' ? <Warehouse size={28} /> : drawerMode === 'invoice' ? <FileText size={28} /> : drawerMode === 'statement' ? <History size={28} /> : <Banknote size={28} />}
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase font-display">
                                        {drawerMode === 'add' ? 'Yeni Partner' : drawerMode === 'edit' ? 'Profil Güncelleme' : drawerMode === 'invoice' ? 'Alım İşlemi' : drawerMode === 'statement' ? 'Ticari Ekstre' : 'Ödeme Kaydı'}
                                    </h3>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                        {drawerMode === 'add' ? 'Ekosisteme yeni bir tedarikçi dahil et' : drawerMode === 'edit' ? 'Tedarikçi bilgilerini revize et' : drawerMode === 'invoice' ? 'Yeni bir alım kaydı oluştur' : drawerMode === 'statement' ? 'Tedarikçi finansal işlem geçmişi' : 'Tedarikçiye yapılan ödemeyi kaydet'}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsDrawerOpen(false)}
                                className="w-12 h-12 flex items-center justify-center bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-slate-900 hover:shadow-lg transition-all"
                            >
                                <XCircle size={24} />
                            </button>
                        </div>

                        {/* Drawer Body */}
                        <div className="flex-1 overflow-y-auto p-10 scrollbar-hide">
                            {(drawerMode === 'add' || drawerMode === 'edit') ? (
                                <form onSubmit={drawerMode === 'add' ? handleCreateSupplier : handleEditSupplier} className="space-y-8">
                                    <div className="space-y-6">
                                        <div className="group">
                                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1 group-focus-within:text-brand-primary transition-colors">FİRMA RESMİ ÜNVANI</label>
                                            <input
                                                type="text" required
                                                placeholder="Örn: Kuzey Su Dağıtım Ltd. Şti."
                                                className="w-full p-5 bg-slate-50 border-2 border-transparent rounded-[1.5rem] outline-none focus:border-brand-primary focus:bg-white transition-all font-bold text-slate-800 shadow-inner"
                                                value={newSupplier.name}
                                                onChange={e => setNewSupplier({ ...newSupplier, name: e.target.value })}
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="group">
                                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1 group-focus-within:text-brand-primary transition-colors">YETKİLİ TEMSİLCİ</label>
                                                <input
                                                    type="text" required
                                                    placeholder="Ad Soyad"
                                                    className="w-full p-5 bg-slate-50 border-2 border-transparent rounded-[1.2rem] outline-none focus:border-brand-primary focus:bg-white transition-all font-bold text-slate-800 shadow-inner"
                                                    value={newSupplier.contact}
                                                    onChange={e => setNewSupplier({ ...newSupplier, contact: e.target.value })}
                                                />
                                            </div>
                                            <div className="group">
                                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1 group-focus-within:text-brand-primary transition-colors">TEMAS HATTI</label>
                                                <input
                                                    type="tel" required
                                                    placeholder="05..."
                                                    className="w-full p-5 bg-slate-50 border-2 border-transparent rounded-[1.2rem] outline-none focus:border-brand-primary focus:bg-white transition-all font-bold text-slate-800 shadow-inner"
                                                    value={newSupplier.phone}
                                                    onChange={e => setNewSupplier({ ...newSupplier, phone: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <div className="group">
                                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1 group-focus-within:text-brand-primary transition-colors">İŞBİRLİĞİ KATEGORİSİ</label>
                                            <div className="relative">
                                                <select
                                                    className="w-full p-5 bg-slate-50 border-2 border-transparent rounded-[1.5rem] outline-none focus:border-brand-primary focus:bg-white transition-all font-bold text-slate-800 shadow-inner appearance-none relative z-10"
                                                    value={newSupplier.category}
                                                    onChange={e => setNewSupplier({ ...newSupplier, category: e.target.value })}
                                                >
                                                    <option value="Su">Su Tedariği & Dağıtım</option>
                                                    <option value="Tüp">LPG / Enerji Tedariği</option>
                                                    <option value="Lojistik">Lojistik Performans</option>
                                                    {supplierCategories.map(cat => (
                                                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                                                    ))}
                                                    <option value="Diğer">Genel Ürün / Hizmet</option>
                                                </select>
                                                <div className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-20">
                                                    <ChevronRight className="rotate-90" size={18} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="group">
                                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1 group-focus-within:text-brand-primary transition-colors">OPERASYON MERKEZİ ADRESİ</label>
                                            <textarea
                                                className="w-full p-5 bg-slate-50 border-2 border-transparent rounded-[1.5rem] outline-none focus:border-brand-primary focus:bg-white transition-all font-bold text-slate-800 shadow-inner resize-none h-32"
                                                value={newSupplier.address}
                                                onChange={e => setNewSupplier({ ...newSupplier, address: e.target.value })}
                                                placeholder="Detaylı adres bilgisi..."
                                            />
                                        </div>
                                    </div>

                                    <div className="pt-8 space-y-4">
                                        <button
                                            type="submit"
                                            className={`w-full text-white font-black py-6 rounded-[2rem] shadow-2xl hover:scale-[1.02] active:scale-95 transition-all tracking-[0.2em] text-xs uppercase ${drawerMode === 'add' ? 'bg-slate-900 shadow-slate-900/20' : 'bg-brand-primary shadow-brand-primary/20'
                                                }`}
                                        >
                                            {drawerMode === 'add' ? 'PARTNERLİĞİ BAŞLAT' : 'KAYDI GÜNCELLE'}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setIsDrawerOpen(false)}
                                            className="w-full bg-slate-100 text-slate-500 font-black py-4 rounded-[1.5rem] hover:bg-slate-200 transition-all text-xs tracking-widest uppercase"
                                        >
                                            VAZGEÇ
                                        </button>
                                    </div>
                                </form>
                            ) : drawerMode === 'categories' ? (
                                <div className="space-y-8 animate-in fade-in slide-in-from-bottom duration-300">
                                    <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 px-1">YENİ KATEGORİ EKLE</label>
                                        <div className="flex gap-3">
                                            <input
                                                type="text"
                                                placeholder="Örn: İşbirliği Kategorisi"
                                                className="flex-1 p-4 bg-white border-2 border-transparent rounded-2xl outline-none focus:border-brand-primary transition-all font-bold text-slate-800 shadow-sm"
                                                value={newCategoryName}
                                                onChange={e => setNewCategoryName(e.target.value)}
                                            />
                                            <button
                                                onClick={async () => {
                                                    if (!newCategoryName.trim()) return;
                                                    await addCategory({ name: newCategoryName.trim(), type: 'supplier' });
                                                    setNewCategoryName('');
                                                    useStore.getState().addNotification('Kategori başarıyla eklendi.', 'success');
                                                }}
                                                className="bg-slate-900 text-white px-6 py-4 rounded-2xl transition-all font-black text-xs uppercase tracking-widest shadow-lg active:scale-95"
                                            >
                                                EKLE
                                            </button>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-2 px-2">Mevcut Kategoriler</p>
                                        {supplierCategories.length > 0 ? (
                                            supplierCategories.map((cat, idx) => (
                                                <div key={idx} className="flex justify-between items-center bg-white p-5 rounded-2xl border border-slate-100 shadow-sm group hover:shadow-md transition-all">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 bg-indigo-50 text-indigo-500 rounded-xl flex items-center justify-center font-black">
                                                            {idx + 1}
                                                        </div>
                                                        <p className="font-black text-slate-800 text-sm tracking-tight">{cat.name}</p>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        {confirmDeleteCat === cat.id ? (
                                                            <div className="flex items-center gap-1 animate-in slide-in-from-right-4 duration-200">
                                                                <button
                                                                    onClick={async () => {
                                                                        await deleteCategory(cat.id);
                                                                        setConfirmDeleteCat(null);
                                                                        useStore.getState().addNotification('Kategori silindi.', 'info');
                                                                    }}
                                                                    className="bg-rose-500 text-white px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-rose-600 transition-all shadow-sm"
                                                                >
                                                                    EVET, SİL
                                                                </button>
                                                                <button
                                                                    onClick={() => setConfirmDeleteCat(null)}
                                                                    className="bg-slate-100 text-slate-500 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all"
                                                                >
                                                                    İPTAL
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <button
                                                                onClick={() => setConfirmDeleteCat(cat.id)}
                                                                className="p-3 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                                                            >
                                                                <Trash2 size={18} />
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="py-12 bg-white/50 backdrop-blur-sm rounded-[2rem] border border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 text-center px-8">
                                                <Package size={32} className="mb-4 opacity-50" />
                                                <p className="text-sm font-bold text-slate-500">Henüz özel bir kategori tanımlanmamış.</p>
                                                <p className="text-[10px] font-medium mt-2">Yukarıdaki alandan yeni kategoriler ekleyerek tedarikçilerinizi gruplandırabilirsiniz.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : drawerMode === 'statement' ? (
                                <div className="space-y-6 animate-in fade-in zoom-in duration-200 pt-4">
                                    <div className="bg-slate-50 border border-slate-100 rounded-[2rem] p-8">
                                        <div className="flex justify-between items-center mb-6">
                                            <div>
                                                <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1">Cari Hesap Durumu</p>
                                                <h4 className="text-2xl font-black text-slate-900 truncate">
                                                    {selectedSupplier?.name}
                                                </h4>
                                            </div>
                                            <div className={`px-4 py-2 rounded-xl text-xs font-black uppercase ${selectedSupplier?.balance < 0 ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-600'}`}>
                                                BAKİYE: {selectedSupplier?.balance < 0 ? `-₺${Math.abs(selectedSupplier?.balance).toLocaleString('tr-TR')}` : `+₺${(selectedSupplier?.balance || 0).toLocaleString('tr-TR')}`}
                                            </div>
                                        </div>

                                        <div className="mt-8 space-y-4">
                                            <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-4 px-2">Son İşlem Geçmişi</p>
                                            {expenses?.filter(e => e.type === 'supplier' && e.label.includes(selectedSupplier?.name)).length > 0 ? (
                                                expenses.filter(e => e.type === 'supplier' && e.label.includes(selectedSupplier?.name)).map((expense, idx) => (
                                                    <div key={idx} className="flex justify-between items-center bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-10 h-10 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center">
                                                                <FileText size={18} />
                                                            </div>
                                                            <div>
                                                                <p className="font-bold text-slate-800 text-sm group-hover:text-indigo-600 transition-colors">{expense.label}</p>
                                                                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold mt-1">{new Date(expense.timestamp).toLocaleDateString('tr-TR')}</p>
                                                            </div>
                                                        </div>
                                                        <p className="font-black text-emerald-600 font-display">₺{expense.amount.toLocaleString('tr-TR')}</p>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="py-12 bg-white/50 backdrop-blur-sm rounded-[2rem] border border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400">
                                                    <History size={32} className="mb-4 opacity-50" />
                                                    <p className="text-sm font-bold text-slate-500">Sistemde geçmiş bir işlem bulunamadı.</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="pt-4 grid grid-cols-2 gap-4">
                                        <button onClick={() => useStore.getState().addNotification('Ekstre başarıyla indirildi.', 'success')} className="col-span-2 text-white font-black py-5 rounded-[1.5rem] bg-indigo-600 shadow-xl shadow-indigo-600/20 hover:scale-[1.02] active:scale-95 transition-all tracking-[0.2em] text-[10px] uppercase flex items-center justify-center gap-3">
                                            <FileText size={18} /> TİCARİ EKSTREYİ İNDİR (PDF)
                                        </button>
                                        <button onClick={() => { handleOpenTransaction(selectedSupplier, 'Invoice'); }} className="col-span-1 text-slate-600 font-black py-4 rounded-[1.5rem] bg-slate-100 hover:bg-slate-200 transition-all tracking-[0.2em] text-[10px] uppercase">
                                            YENİ ALIM
                                        </button>
                                        <button onClick={() => { handleOpenTransaction(selectedSupplier, 'Payment'); }} className="col-span-1 text-emerald-600 font-black py-4 rounded-[1.5rem] bg-emerald-50 hover:bg-emerald-100 transition-all tracking-[0.2em] text-[10px] uppercase">
                                            YENİ ÖDEME
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={handleTransaction} className="space-y-10">
                                    {drawerMode === 'invoice' && (
                                        <div className="space-y-6">
                                            <div className="flex justify-between items-center px-1">
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Envanter Hareketleri</p>
                                                <button
                                                    type="button"
                                                    onClick={addLineItem}
                                                    className="text-[9px] font-black bg-slate-900 text-white px-4 py-2 rounded-xl hover:scale-105 transition-all shadow-md"
                                                >
                                                    + SATIR EKLE
                                                </button>
                                            </div>

                                            <div className="space-y-4">
                                                {lineItems.map((item, index) => (
                                                    <div key={index} className="bg-slate-50 border border-slate-100 p-6 rounded-[2rem] relative group/item">
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                                            <div className="col-span-1 md:col-span-2">
                                                                <label className="block text-[9px] font-black text-slate-400 uppercase mb-2 px-1">ÜRÜN / HİZMET SEÇİMİ</label>
                                                                <select
                                                                    required
                                                                    className="w-full p-4 bg-white border border-slate-100 rounded-xl font-bold text-sm outline-none focus:border-brand-primary shadow-sm"
                                                                    value={item.productId}
                                                                    onChange={e => updateLineItem(index, 'productId', e.target.value)}
                                                                >
                                                                    <option value="">Seçiniz...</option>
                                                                    {products.map(p => (
                                                                        <option key={p.id} value={p.id}>{p.name}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                            <div>
                                                                <label className="block text-[9px] font-black text-slate-400 uppercase mb-2 px-1">MİKTAR</label>
                                                                <input
                                                                    type="number" required min="1"
                                                                    placeholder="0"
                                                                    className="w-full p-4 bg-white border border-slate-100 rounded-xl font-bold text-sm outline-none focus:border-brand-primary shadow-sm"
                                                                    value={item.quantity}
                                                                    onChange={e => updateLineItem(index, 'quantity', e.target.value)}
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-[9px] font-black text-slate-400 uppercase mb-2 px-1">BİRİM MALİYET (₺)</label>
                                                                <input
                                                                    type="number" required step="0.01"
                                                                    placeholder="0.00"
                                                                    className="w-full p-4 bg-white border border-slate-100 rounded-xl font-bold text-sm outline-none focus:border-brand-primary shadow-sm"
                                                                    value={item.price}
                                                                    onChange={e => updateLineItem(index, 'price', e.target.value)}
                                                                />
                                                            </div>
                                                        </div>
                                                        {lineItems.length > 1 && (
                                                            <button
                                                                type="button"
                                                                onClick={() => removeLineItem(index)}
                                                                className="absolute -top-2 -right-2 bg-rose-500 text-white p-2 rounded-full shadow-lg hover:scale-110 transition-all opacity-0 group-hover/item:opacity-100"
                                                            >
                                                                <XCircle size={16} />
                                                            </button>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="space-y-8 pt-6 border-t border-slate-100">
                                        <div className="group">
                                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 px-1">
                                                {drawerMode === 'invoice' ? 'FİNANSAL YANSIMA (TOPLAM TUTAR)' : 'TRANSFER TUTARI'}
                                            </label>
                                            <div className="flex items-center gap-6">
                                                <div className="relative flex-1">
                                                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-black text-slate-400 tracking-tighter">₺</span>
                                                    <input
                                                        type="number" required step="0.01"
                                                        placeholder="0.00"
                                                        className="w-full pl-12 pr-6 py-6 bg-slate-900 text-white border-2 border-transparent rounded-[2.5rem] outline-none focus:border-brand-primary transition-all font-black text-3xl shadow-2xl font-display"
                                                        value={displayedTotal}
                                                        onChange={e => setManualTotal(e.target.value)}
                                                    />
                                                </div>
                                                <div className="text-right hidden sm:block">
                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Cari Bakiye</p>
                                                    <p className="text-lg font-black text-slate-900 font-display">₺{(selectedSupplier.balance || 0).toLocaleString('tr-TR')}</p>
                                                </div>
                                            </div>
                                            {drawerMode === 'invoice' && manualTotal === '' && (
                                                <p className="mt-4 text-[10px] font-bold text-brand-primary flex items-center gap-2">
                                                    <Calculator size={14} /> Kalemlerden otomatik hesaplanıyor
                                                </p>
                                            )}
                                        </div>

                                        <div className="group">
                                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">REFERANS / AÇIKLAMA</label>
                                            <input
                                                type="text" required
                                                placeholder={drawerMode === 'invoice' ? "Alım No veya Belge Referansı" : "Banka/Kasa veya Ödeme Detayı"}
                                                className="w-full p-5 bg-slate-50 border-2 border-transparent rounded-[1.5rem] outline-none focus:border-brand-primary focus:bg-white transition-all font-bold text-slate-800 shadow-inner"
                                                value={transactionNote}
                                                onChange={e => setTransactionNote(e.target.value)}
                                            />
                                        </div>

                                        <div className="pt-8 space-y-4">
                                            <button
                                                type="submit"
                                                className={`w-full text-white font-black py-6 rounded-[2.5rem] shadow-2xl hover:scale-[1.02] active:scale-95 transition-all tracking-[0.2em] text-xs uppercase ${drawerMode === 'invoice' ? 'bg-slate-900 shadow-slate-900/20' : 'bg-emerald-600 shadow-emerald-600/20'
                                                    }`}
                                            >
                                                {drawerMode === 'invoice' ? 'FİNANSAL HAREKETİ ONAYLA' : 'ÖDEME KAYDINI TAMAMLA'}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setIsDrawerOpen(false)}
                                                className="w-full bg-slate-100 text-slate-500 font-black py-4 rounded-[1.5rem] hover:bg-slate-200 transition-all text-xs tracking-widest uppercase"
                                            >
                                                İPTAL
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            )
            }

            {/* Excel Import Drawer */}
            <SupplierExcelImportDrawer
                isOpen={isImportDrawerOpen}
                onClose={() => setIsImportDrawerOpen(false)}
                onImport={handleImportSuppliers}
                suppliers={suppliers}
            />
        </div >
    );
};

export default Suppliers;
