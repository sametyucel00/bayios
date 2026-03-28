import React, { useState } from 'react';
import { Plus, Search, Filter, Edit2, Trash2, Calendar, FileText, CheckCircle2, X, XCircle, ChevronRight, Wallet, PieChart, ArrowUpRight, ArrowDownRight, TrendingUp, TrendingDown, Coins, Calculator, Building2, Landmark } from 'lucide-react';
import useStore from '../store/useStore';

const Expenses = () => {
    const { suppliers, expenses, addExpense, updateExpense, deleteExpense } = useStore();

    const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
    const [editingExpense, setEditingExpense] = useState(null);
    const [tempAmount, setTempAmount] = useState('');
    const [tempName, setTempName] = useState('');
    const [deleteConfirmId, setDeleteConfirmId] = useState(null);

    const handleEdit = (expense) => {
        setEditingExpense(expense);
        setTempName(expense.label);
        setTempAmount(expense.amount.toString());
        setIsEditDrawerOpen(true);
    };

    const handleUpdateAmount = async (e) => {
        e.preventDefault();
        if (!editingExpense) return;

        await updateExpense(editingExpense.id, {
            amount: parseFloat(tempAmount) || 0,
            label: tempName
        });

        setIsEditDrawerOpen(false);
        setEditingExpense(null);
    };

    const handleDelete = async () => {
        if (!editingExpense) return;
        if (deleteConfirmId === editingExpense.id) {
            await deleteExpense(editingExpense.id);
            useStore.getState().addNotification("Gider silindi.", "info");
            setIsEditDrawerOpen(false);
            setEditingExpense(null);
            setDeleteConfirmId(null);
        } else {
            setDeleteConfirmId(editingExpense.id);
            useStore.getState().addNotification("Silmek için tekrar tıklayın.", "warning");
            setTimeout(() => setDeleteConfirmId(null), 3000);
        }
    };

    const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
    const [newName, setNewName] = useState('');
    const [newAmount, setNewAmount] = useState('');
    const [newPeriod, setNewPeriod] = useState('monthly'); // 'daily' | 'monthly'
    const [newCategory, setNewCategory] = useState('Genel');

    const [isPaymentPlanDrawerOpen, setIsPaymentPlanDrawerOpen] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState('');
    const [paymentAmount, setPaymentAmount] = useState('');
    const [paymentDate, setPaymentDate] = useState('');

    const handlePlanPayment = (e) => {
        e.preventDefault();
        const supplierName = (suppliers || []).find(s => String(s.id) === selectedSupplier)?.name || 'Tedarikçi';
        useStore.getState().addNotification(`Plan Kaydedildi! ${supplierName} için ${paymentDate} tarihine ₺${paymentAmount} tutarında ödeme planlandı.`, "success");
        setIsPaymentPlanDrawerOpen(false);
        setSelectedSupplier('');
        setPaymentAmount('');
        setPaymentDate('');
    };

    const [isGovPaymentPlanDrawerOpen, setIsGovPaymentPlanDrawerOpen] = useState(false);
    const [selectedGovExpense, setSelectedGovExpense] = useState('');
    const [govPaymentAmount, setGovPaymentAmount] = useState('');
    const [govPaymentDate, setGovPaymentDate] = useState('');

    const handlePlanGovPayment = (e) => {
        e.preventDefault();
        const expenseName = (expenses || []).find(ex => String(ex.id) === selectedGovExpense)?.label || 'Sabit Gider';
        useStore.getState().addNotification(`Plan Kaydedildi! ${expenseName} için ${govPaymentDate} tarihine ₺${govPaymentAmount} tutarında ödeme planlandı.`, "success");
        setIsGovPaymentPlanDrawerOpen(false);
        setSelectedGovExpense('');
        setGovPaymentAmount('');
        setGovPaymentDate('');
    };

    const handleAddExpense = async (e) => {
        e.preventDefault();
        const newEntry = {
            label: newName,
            amount: parseFloat(newAmount) || 0,
            period: newPeriod,
            category: newCategory,
            type: 'gov', // To indicate it's an operational/fixed expense
            iconName: 'Coins',
            color: 'text-emerald-500',
            bg: 'bg-emerald-50',
            timestamp: new Date().toISOString()
        };
        await addExpense(newEntry);
        setIsAddDrawerOpen(false);
        setNewName('');
        setNewAmount('');
        setNewPeriod('monthly');
        setNewCategory('Genel');
    };

    const monthlyExpenses = expenses.filter(e => e.period === 'monthly' || !e.period); // varsayılan aylık sayılır
    const dailyExpenses = expenses.filter(e => e.period === 'daily');

    const totalMonthlyGovExpenses = monthlyExpenses.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
    const totalDailyGovExpenses = dailyExpenses.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
    const totalSupplierDebt = suppliers.reduce((acc, curr) => acc + (curr.balance < 0 ? Math.abs(curr.balance) : 0), 0);
    const totalOverallExpenses = totalMonthlyGovExpenses + totalSupplierDebt; // Ana özet genelde aylığı + toptancıyı baz alır

    return (
        <div className="p-4 md:p-8 bg-slate-50 min-h-screen pb-24 md:pb-8 w-full overflow-hidden">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
                <div>
                    <p className="text-brand-primary text-[10px] font-black uppercase tracking-[0.2em] mb-1">Finansal Yönetim</p>
                    <h1 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight font-display">Gider Yönetimi</h1>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full md:w-auto">
                    <button
                        onClick={() => setIsAddDrawerOpen(true)}
                        className="bg-slate-900 text-white px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-brand-primary transition-all shadow-lg shadow-slate-900/10 active:scale-95 flex items-center justify-center gap-2"
                    >
                        <Plus size={18} /> GİDER EKLE
                    </button>
                    <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between sm:justify-end gap-6">
                        <div className="text-right">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Toplam Aylık</p>
                            <p className="text-xl md:text-2xl font-black text-rose-600 font-display">₺{totalOverallExpenses.toLocaleString('tr-TR')}</p>
                        </div>
                        <div className="w-px h-10 bg-slate-100 hidden sm:block"></div>
                        <div className="p-3 bg-rose-50 text-rose-500 rounded-xl">
                            <TrendingDown size={24} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* Government Expenses Section */}
                <div className="bg-white p-5 md:p-8 rounded-[2rem] shadow-sm border border-slate-100">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shadow-sm">
                                <Landmark size={24} />
                            </div>
                            <div>
                                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Devlet & Operasyonel</h3>
                                <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">Sabit Gider Kayıtları</p>
                            </div>
                        </div>
                        <div className="sm:text-right">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ara Toplam</p>
                            <p className="text-xl font-black text-slate-900 font-display">₺{totalMonthlyGovExpenses.toLocaleString('tr-TR')}</p>
                        </div>
                    </div>

                    <div className="mb-4">
                        <h4 className="text-[11px] font-black tracking-widest uppercase text-slate-500 mb-3 border-b border-slate-100 pb-2">Aylık Sabit Giderler</h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        {monthlyExpenses.length === 0 ? (
                            <div className="col-span-2 text-center text-slate-400 py-6 text-sm">Aylık gider kaydı bulunmuyor.</div>
                        ) : monthlyExpenses.map((expense) => {
                            const IconComp = expense.iconName === 'Coins' ? Coins : FileText;
                            return (
                                <div key={expense.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-200 transition-all group">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2.5 ${expense.bg || 'bg-slate-100'} ${expense.color || 'text-slate-500'} rounded-xl shadow-sm group-hover:scale-110 transition-transform`}>
                                            <IconComp size={18} />
                                        </div>
                                        <div className="flex-1 overflow-hidden">
                                            <div className="flex justify-between items-center mb-0.5">
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest truncate">{expense.label}</p>
                                                {expense.category && <span className="text-[8px] bg-slate-200 text-slate-500 px-1.5 py-0.5 rounded font-bold uppercase shrink-0">{expense.category}</span>}
                                            </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm font-black text-slate-900 font-display transition-all group-hover:text-blue-600">
                                                        ₺{Number(expense.amount).toLocaleString('tr-TR')}
                                                    </span>
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => {
                                                                setSelectedGovExpense(expense.id);
                                                                setGovPaymentAmount(expense.amount.toString());
                                                                setIsGovPaymentPlanDrawerOpen(true);
                                                            }}
                                                            className="text-[8px] font-black bg-blue-50 text-blue-600 px-2 py-1 rounded-md uppercase tracking-tighter hover:bg-blue-100 transition-colors"
                                                        >
                                                            Ödeme Planla
                                                        </button>
                                                        <button
                                                            onClick={() => handleEdit(expense)}
                                                            className="text-[8px] font-black text-slate-400 uppercase tracking-tighter hover:text-slate-600 px-1"
                                                        >
                                                            Düzenle
                                                        </button>
                                                    </div>
                                                </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mb-4 flex justify-between items-end">
                        <h4 className="text-[11px] font-black tracking-widest uppercase text-slate-500 border-b border-slate-100 pb-2 flex-1">Günlük Akış Giderleri</h4>
                        <div className="text-right pl-4 border-b border-slate-100 pb-2">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Günlük Toplam</p>
                            <p className="text-sm font-black text-slate-900 font-display">₺{totalDailyGovExpenses.toLocaleString('tr-TR')}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {dailyExpenses.length === 0 ? (
                            <div className="col-span-2 text-center text-slate-400 py-6 text-sm">Bugün için gider kaydı bulunmuyor.</div>
                        ) : dailyExpenses.map((expense) => {
                            const IconComp = expense.iconName === 'Coins' ? Coins : FileText;
                            return (
                                <div key={expense.id} className="p-4 bg-white rounded-2xl border border-dashed border-slate-300 hover:border-blue-300 transition-all group">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2.5 ${expense.bg || 'bg-slate-100'} ${expense.color || 'text-slate-500'} rounded-xl shadow-sm scale-90`}>
                                            <IconComp size={16} />
                                        </div>
                                        <div className="flex-1 overflow-hidden">
                                            <div className="flex justify-between items-center mb-0.5">
                                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest truncate">{expense.label}</p>
                                                {expense.category && <span className="text-[8px] bg-slate-100 text-slate-400 px-1.5 py-0.5 rounded font-bold uppercase shrink-0">{expense.category}</span>}
                                            </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm font-black text-slate-800 font-display">
                                                        ₺{Number(expense.amount).toLocaleString('tr-TR')}
                                                    </span>
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => {
                                                                setSelectedGovExpense(expense.id);
                                                                setGovPaymentAmount(expense.amount.toString());
                                                                setIsGovPaymentPlanDrawerOpen(true);
                                                            }}
                                                            className="text-[8px] font-black bg-slate-100 text-slate-600 px-2 py-1 rounded-md uppercase tracking-tighter hover:bg-slate-200 transition-colors"
                                                        >
                                                            Ödeme Planla
                                                        </button>
                                                        <button
                                                            onClick={() => handleEdit(expense)}
                                                            className="text-[8px] font-black text-slate-400 uppercase tracking-tighter hover:text-slate-600 px-1"
                                                        >
                                                            Düzenle
                                                        </button>
                                                    </div>
                                                </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-8 p-6 bg-slate-900 text-white rounded-[2rem] relative overflow-hidden group">
                        <div className="relative z-10 flex flex-col sm:flex-row justify-between items-center gap-4">
                            <div className="text-center sm:text-left">
                                <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-1">ÖDEME PLANI</p>
                                <h4 className="text-base font-black tracking-tight leading-tight uppercase">Gider Ödemesi</h4>
                            </div>
                            <button onClick={() => setIsGovPaymentPlanDrawerOpen(true)} className="w-full sm:w-auto px-6 py-3 bg-white text-slate-900 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-100 transition-all shadow-lg active:scale-95">ÖDEME PLANLA</button>
                        </div>
                    </div>
                </div>

                {/* Supplier Expenses Section */}
                <div className="bg-white p-5 md:p-8 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center shadow-sm">
                                <Building2 size={24} />
                            </div>
                            <div>
                                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Tedarikçi Borçları</h3>
                                <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">Mal Alım ve Ödemeler</p>
                            </div>
                        </div>
                        <div className="sm:text-right">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ara Toplam</p>
                            <p className="text-xl font-black text-slate-900 font-display">₺{totalSupplierDebt.toLocaleString('tr-TR')}</p>
                        </div>
                    </div>

                    <div className="flex-1 space-y-3">
                        {suppliers.map((supplier) => (
                            <div key={supplier.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-orange-200 transition-all group flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 group-hover:text-orange-500 transition-colors shadow-sm">
                                        <Building2 size={20} />
                                    </div>
                                    <div className="overflow-hidden">
                                        <h4 className="font-black text-slate-900 text-[11px] uppercase tracking-tight truncate max-w-[120px] sm:max-w-none">{supplier.name}</h4>
                                        <p className="text-[9px] font-bold text-slate-400 uppercase">{supplier.contact || 'Merkez'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="text-right">
                                        <p className={`text-xs font-black font-display ${supplier.balance < 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                                            {supplier.balance < 0 ? '-' : ''}₺{Math.abs(supplier.balance).toLocaleString('tr-TR')}
                                        </p>
                                        <span className={`text-[8px] font-black uppercase tracking-tighter ${supplier.balance < 0 ? 'text-rose-300' : 'text-emerald-300'}`}>
                                            {supplier.balance < 0 ? 'BORÇ' : 'ALACAK'}
                                        </span>
                                    </div>
                                    <div className="p-1.5 bg-white rounded-lg text-slate-300 group-hover:text-orange-500 transition-all">
                                        <ArrowUpRight size={14} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 p-6 bg-slate-900 text-white rounded-[2rem] relative overflow-hidden group">
                        <div className="relative z-10 flex flex-col sm:flex-row justify-between items-center gap-4">
                            <div className="text-center sm:text-left">
                                <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-1">DURUM ANALİZİ</p>
                                <h4 className="text-base font-black tracking-tight leading-tight uppercase">Tedarikçi Limiti</h4>
                            </div>
                            <button onClick={() => setIsPaymentPlanDrawerOpen(true)} className="w-full sm:w-auto px-6 py-3 bg-white text-slate-900 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-orange-50 transition-all shadow-lg active:scale-95">ÖDEME PLANLA</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Analysis Box */}
            <div className="mt-8 premium-card p-10 bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden">
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="space-y-4">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Gider Analizi</p>
                        <h2 className="text-4xl font-black tracking-tighter font-display leading-tight">İşletme Gider Karşılaştırması</h2>
                        <p className="text-sm text-slate-400 font-medium leading-relaxed">
                            Devlet giderleri toplam maliyetin <span className="text-white font-bold text-lg">%{((totalMonthlyGovExpenses / totalOverallExpenses) * 100).toFixed(1)}</span>'ini oluşturuyor.
                        </p>
                    </div>
                    <div className="md:col-span-2 flex flex-col justify-center gap-8">
                        <div className="space-y-3">
                            <div className="flex justify-between items-end">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Devlet & Sabit Giderler</span>
                                <span className="text-sm font-black">₺{totalMonthlyGovExpenses.toLocaleString()}</span>
                            </div>
                            <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden p-1">
                                <div
                                    className="h-full bg-blue-500 rounded-full transition-all duration-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                                    style={{ width: `${(totalMonthlyGovExpenses / totalOverallExpenses) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between items-end">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tedarikçi & Değişken Giderler</span>
                                <span className="text-sm font-black">₺{totalSupplierDebt.toLocaleString()}</span>
                            </div>
                            <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden p-1">
                                <div
                                    className="h-full bg-orange-500 rounded-full transition-all duration-500 shadow-[0_0_15px_rgba(249,115,22,0.5)]"
                                    style={{ width: `${(totalSupplierDebt / totalOverallExpenses) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isEditDrawerOpen && (
                <div className="fixed inset-0 z-[150] flex justify-end">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setIsEditDrawerOpen(false)}></div>
                    <div className="relative w-full max-w-xl h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
                        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white/50">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-lg">
                                    <FileText size={24} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-slate-900 tracking-tight font-display uppercase">GİDER DÜZENLE</h3>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{editingExpense?.label}</p>
                                </div>
                            </div>
                            <button onClick={() => setIsEditDrawerOpen(false)} className="p-3 bg-white rounded-2xl text-slate-400 hover:text-slate-600 shadow-sm transition-colors border border-slate-100">
                                <XCircle size={28} />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-10 scrollbar-hide">
                            <form onSubmit={handleUpdateAmount} className="space-y-8">
                                <div>
                                    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">GİDER ADI</label>
                                    <input
                                        type="text" required
                                        className="w-full px-6 py-5 bg-slate-50 border-2 border-transparent rounded-[1.5rem] focus:outline-none focus:border-brand-primary focus:bg-white transition-all font-black text-slate-800 shadow-inner"
                                        value={tempName}
                                        onChange={e => setTempName(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">TUTAR (₺)</label>
                                    <input
                                        type="number" required
                                        placeholder="0.00"
                                        className="w-full px-6 py-5 bg-slate-50 border-2 border-transparent rounded-[1.5rem] focus:outline-none focus:border-brand-primary focus:bg-white transition-all font-black text-slate-800 shadow-inner"
                                        value={tempAmount}
                                        onChange={e => setTempAmount(e.target.value)}
                                    />
                                </div>
                                <div className="flex gap-4 pt-6">
                                    <button
                                        type="button"
                                        onClick={handleDelete}
                                        className={`p-6 border-2 transition-all flex items-center justify-center group rounded-[1.5rem] ${deleteConfirmId === editingExpense?.id ? 'bg-rose-500 text-white border-rose-600 shadow-lg' : 'bg-rose-50 border-transparent hover:border-rose-200 text-rose-500 hover:bg-rose-100'}`}
                                        title="Gideri Sil"
                                    >
                                        <Trash2 size={24} className="group-hover:scale-110 transition-transform" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsEditDrawerOpen(false)}
                                        className="flex-1 py-6 bg-slate-100 text-slate-500 font-black rounded-[1.5rem] hover:bg-slate-200 transition-all active:scale-95 uppercase tracking-widest text-xs"
                                    >
                                        İPTAL
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-[2] py-6 bg-slate-900 text-white font-black rounded-[1.5rem] shadow-xl hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-widest text-xs"
                                    >
                                        KAYDET
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {isAddDrawerOpen && (
                <div className="fixed inset-0 z-[150] flex justify-end">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setIsAddDrawerOpen(false)}></div>
                    <div className="relative w-full max-w-xl h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
                        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white/50">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-brand-primary text-white rounded-2xl flex items-center justify-center shadow-lg">
                                    <Plus size={28} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-slate-900 tracking-tight font-display uppercase">Yeni Gider</h3>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Sisteme yeni gider kalemi ekle</p>
                                </div>
                            </div>
                            <button onClick={() => setIsAddDrawerOpen(false)} className="p-3 bg-white rounded-2xl text-slate-400 hover:text-slate-600 shadow-sm transition-colors border border-slate-100">
                                <XCircle size={28} />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-10 scrollbar-hide">
                            <form onSubmit={handleAddExpense} className="space-y-8">
                                <div>
                                    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">GİDER ADI</label>
                                    <input
                                        type="text" required
                                        placeholder="Örn: Kırtasiye Gideri"
                                        className="w-full px-6 py-5 bg-slate-50 border-2 border-transparent rounded-[1.5rem] focus:outline-none focus:border-brand-primary focus:bg-white transition-all font-black text-slate-800 shadow-inner"
                                        value={newName}
                                        onChange={e => setNewName(e.target.value)}
                                        autoFocus
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">TUTAR (₺)</label>
                                    <input
                                        type="number" required
                                        placeholder="0.00"
                                        className="w-full px-6 py-5 bg-slate-50 border-2 border-transparent rounded-[1.5rem] focus:outline-none focus:border-brand-primary focus:bg-white transition-all font-black text-slate-800 shadow-inner"
                                        value={newAmount}
                                        onChange={e => setNewAmount(e.target.value)}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">KATEGORİ</label>
                                        <select
                                            className="w-full px-6 py-5 bg-slate-50 border-2 border-transparent rounded-[1.5rem] focus:outline-none focus:border-brand-primary focus:bg-white transition-all font-black text-slate-800 shadow-inner"
                                            value={newCategory}
                                            onChange={e => setNewCategory(e.target.value)}
                                        >
                                            <option value="Genel">Genel</option>
                                            <option value="Faturalar">Faturalar</option>
                                            <option value="Personel">Personel</option>
                                            <option value="Yakıt/Araç">Yakıt / Araç</option>
                                            <option value="Kırtasiye">Kırtasiye</option>
                                            <option value="Yemek">Yemek</option>
                                            <option value="Diğer">Diğer</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">PERİYOT</label>
                                        <select
                                            className="w-full px-6 py-5 bg-slate-50 border-2 border-transparent rounded-[1.5rem] focus:outline-none focus:border-brand-primary focus:bg-white transition-all font-black text-slate-800 shadow-inner text-sm"
                                            value={newPeriod}
                                            onChange={e => setNewPeriod(e.target.value)}
                                        >
                                            <option value="monthly">Aylık Değişmez</option>
                                            <option value="daily">Günlük Akış</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex gap-4 pt-6">
                                    <button
                                        type="button"
                                        onClick={() => setIsAddDrawerOpen(false)}
                                        className="flex-1 py-6 bg-slate-100 text-slate-500 font-black rounded-[1.5rem] hover:bg-slate-200 transition-all active:scale-95 uppercase tracking-widest text-xs"
                                    >
                                        İPTAL
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-[2] py-6 bg-brand-primary text-white font-black rounded-[1.5rem] shadow-xl shadow-brand-primary/20 hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-widest text-xs"
                                    >
                                        GİDER EKLE
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {isGovPaymentPlanDrawerOpen && (
                <div className="fixed inset-0 z-[150] flex justify-end">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setIsGovPaymentPlanDrawerOpen(false)}></div>
                    <div className="relative w-full max-w-xl h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
                        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white/50">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-blue-500 text-white rounded-2xl flex items-center justify-center shadow-lg">
                                    <Landmark size={28} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-slate-900 tracking-tight font-display uppercase">Sabit Gider Ödemesi</h3>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Devlet & Operasyonel gideri planla</p>
                                </div>
                            </div>
                            <button onClick={() => setIsGovPaymentPlanDrawerOpen(false)} className="p-3 bg-white rounded-2xl text-slate-400 hover:text-slate-600 shadow-sm transition-colors border border-slate-100">
                                <XCircle size={28} />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-10 scrollbar-hide">
                            <form onSubmit={handlePlanGovPayment} className="space-y-8">
                                <div>
                                    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">GİDER KALEMİ</label>
                                    <select
                                        required
                                        className="w-full px-6 py-5 bg-slate-50 border-2 border-transparent rounded-[1.5rem] focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-black text-slate-800 shadow-inner"
                                        value={selectedGovExpense}
                                        onChange={e => setSelectedGovExpense(e.target.value)}
                                    >
                                        <option value="" disabled>Gider Seçiniz</option>
                                        {monthlyExpenses.map(e => (
                                            <option key={e.id} value={e.id}>{e.label} (Aylık Tutarı: ₺{Number(e.amount).toLocaleString('tr-TR')})</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">ÖDENECEK TUTAR (₺)</label>
                                    <input
                                        type="number" required
                                        placeholder="0.00"
                                        className="w-full px-6 py-5 bg-slate-50 border-2 border-transparent rounded-[1.5rem] focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-black text-slate-800 shadow-inner"
                                        value={govPaymentAmount}
                                        onChange={e => setGovPaymentAmount(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">ÖDEME TARİHİ</label>
                                    <input
                                        type="date" required
                                        className="w-full px-6 py-5 bg-slate-50 border-2 border-transparent rounded-[1.5rem] focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-black text-slate-800 shadow-inner"
                                        value={govPaymentDate}
                                        onChange={e => setGovPaymentDate(e.target.value)}
                                    />
                                </div>
                                <div className="flex gap-4 pt-6">
                                    <button
                                        type="button"
                                        onClick={() => setIsGovPaymentPlanDrawerOpen(false)}
                                        className="flex-1 py-6 bg-slate-100 text-slate-500 font-black rounded-[1.5rem] hover:bg-slate-200 transition-all active:scale-95 uppercase tracking-widest text-xs"
                                    >
                                        İPTAL
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-[2] py-6 bg-blue-600 text-white font-black rounded-[1.5rem] shadow-xl shadow-blue-500/20 hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-widest text-xs"
                                    >
                                        PLANLA
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {isPaymentPlanDrawerOpen && (
                <div className="fixed inset-0 z-[150] flex justify-end">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setIsPaymentPlanDrawerOpen(false)}></div>
                    <div className="relative w-full max-w-xl h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
                        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white/50">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-orange-500 text-white rounded-2xl flex items-center justify-center shadow-lg">
                                    <Building2 size={28} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-slate-900 tracking-tight font-display uppercase">Tedarikçi Ödemesi</h3>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Gelecek bir tarihe ödeme planla</p>
                                </div>
                            </div>
                            <button onClick={() => setIsPaymentPlanDrawerOpen(false)} className="p-3 bg-white rounded-2xl text-slate-400 hover:text-slate-600 shadow-sm transition-colors border border-slate-100">
                                <XCircle size={28} />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-10 scrollbar-hide">
                            <form onSubmit={handlePlanPayment} className="space-y-8">
                                <div>
                                    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">TEDARİKÇİ</label>
                                    <select
                                        required
                                        className="w-full px-6 py-5 bg-slate-50 border-2 border-transparent rounded-[1.5rem] focus:outline-none focus:border-brand-primary focus:bg-white transition-all font-black text-slate-800 shadow-inner"
                                        value={selectedSupplier}
                                        onChange={e => setSelectedSupplier(e.target.value)}
                                    >
                                        <option value="" disabled>Tedarikçi Seçiniz</option>
                                        {suppliers.filter(s => s.balance < 0).map(s => (
                                            <option key={s.id} value={s.id}>{s.name} (Borç: ₺{Math.abs(s.balance).toLocaleString('tr-TR')})</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">TUTAR (₺)</label>
                                    <input
                                        type="number" required
                                        placeholder="0.00"
                                        className="w-full px-6 py-5 bg-slate-50 border-2 border-transparent rounded-[1.5rem] focus:outline-none focus:border-brand-primary focus:bg-white transition-all font-black text-slate-800 shadow-inner"
                                        value={paymentAmount}
                                        onChange={e => setPaymentAmount(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">ÖDEME TARİHİ</label>
                                    <input
                                        type="date" required
                                        className="w-full px-6 py-5 bg-slate-50 border-2 border-transparent rounded-[1.5rem] focus:outline-none focus:border-brand-primary focus:bg-white transition-all font-black text-slate-800 shadow-inner"
                                        value={paymentDate}
                                        onChange={e => setPaymentDate(e.target.value)}
                                    />
                                </div>
                                <div className="flex gap-4 pt-6">
                                    <button
                                        type="button"
                                        onClick={() => setIsPaymentPlanDrawerOpen(false)}
                                        className="flex-1 py-6 bg-slate-100 text-slate-500 font-black rounded-[1.5rem] hover:bg-slate-200 transition-all active:scale-95 uppercase tracking-widest text-xs"
                                    >
                                        İPTAL
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-[2] py-6 bg-orange-500 text-white font-black rounded-[1.5rem] shadow-xl shadow-orange-500/20 hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-widest text-xs"
                                    >
                                        PLANLA
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div >
    );
};

export default Expenses;
