import React, { useState, useEffect } from 'react';
import { Sun, Moon, Package, Wallet, CheckCircle, AlertTriangle, Calculator, Plus, X, ListOrdered, Banknote, CreditCard, Landmark, Receipt, TrendingDown, TrendingUp, RefreshCcw } from 'lucide-react';
import useStore from '../store/useStore';

const Reconciliation = () => {
    const { couriers, orders, addReconciliation, updateCourier, products, subscribers, reconciliations } = useStore();
    const [activeTab, setActiveTab] = useState('morning'); // morning | evening
    const [selectedCourier, setSelectedCourier] = useState('');

    // Morning State
    const [morningItems, setMorningItems] = useState([{ productId: '', quantity: 1 }]);
    const [startCash, setStartCash] = useState(0);

    // Evening State (Will be preset by courier's daily activities, but editable)
    const [eveningData, setEveningData] = useState({
        cashHanded: 0,
        creditCard: 0,
        iban: 0,
        veresiye: 0,
        expenses: 0,
        emptyBottles: 0
    });

    const [todaysDeliveries, setTodaysDeliveries] = useState([]);

    const todayStr = new Date().toDateString();
    let calculatedSalesTotal = 0;

    if (selectedCourier) {
        const selectedObj = couriers.find(c => c.id === selectedCourier);
        const cName = selectedObj ? selectedObj.name : selectedCourier;

        const todaysOrders = orders.filter(o =>
            new Date(o.timestamp || o.date).toDateString() === todayStr &&
            o.status === 'Tamamlandı' &&
            (o.courierId === selectedCourier || (o.courier && o.courier === cName))
        );
        calculatedSalesTotal = todaysOrders.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
    }

    // Pre-fill Evening Data when a courier is selected
    useEffect(() => {
        if(!selectedCourier) {
            setTodaysDeliveries([]);
            setEveningData({cashHanded:0,creditCard:0,iban:0,veresiye:0,expenses:0,emptyBottles:0});
            return;
        }

        const selectedObj = couriers.find(c => c.id === selectedCourier);
        const cName = selectedObj ? selectedObj.name : selectedCourier;

        const todaysOrders = orders.filter(o =>
            new Date(o.timestamp || o.date).toDateString() === todayStr &&
            o.status === 'Tamamlandı' &&
            (o.courierId === selectedCourier || (o.courier && o.courier === cName))
        );

        setTodaysDeliveries(todaysOrders);
        
        // Find morning reconciliation to get correct start cash
        const morningRecon = (reconciliations || []).find(r => 
            r.courierId === selectedCourier && 
            r.type === 'morning' && 
            new Date(r.timestamp || r.date).toDateString() === todayStr
        );
        
        const systemStartCash = morningRecon ? (parseFloat(morningRecon.cash) || 0) : (parseFloat(selectedObj?.cash) || 0);
        setStartCash(systemStartCash);

        let cashSales = 0, cc = 0, iban = 0, veresiye = 0, empties = 0;
        todaysOrders.forEach(o => {
            const amt = Number(o.amount) || 0;
            if(o.paymentMethod === 'Nakit') cashSales += amt;
            else if(o.paymentMethod === 'POS' || o.paymentMethod === 'Kredi Kartı') cc += amt;
            else if(o.paymentMethod === 'IBAN') iban += amt;
            else if(o.paymentMethod === 'Veresiye') veresiye += amt;

            if(o.emptiesReturned) empties += Number(o.emptiesReturned);
        });

        setEveningData({
            cashHanded: systemStartCash + cashSales, 
            creditCard: cc,
            iban: iban,
            veresiye: veresiye,
            expenses: 0,
            emptyBottles: empties
        });

    }, [selectedCourier, couriers, orders, reconciliations]);

    const calculateDiscrepancy = () => {
        const expectedTotal = parseFloat(startCash) + calculatedSalesTotal - parseFloat(eveningData.expenses);
        const actualTotal =
            (parseFloat(eveningData.cashHanded) || 0) +
            (parseFloat(eveningData.creditCard) || 0) +
            (parseFloat(eveningData.iban) || 0) +
            (parseFloat(eveningData.veresiye) || 0);

        return actualTotal - expectedTotal;
    };

    const discrepancy = calculateDiscrepancy();

    const handleConfirmMorning = async () => {
        if (!selectedCourier) {
            useStore.getState().addNotification("Lütfen kurye seçiniz.", "error");
            return;
        }

        const validItems = morningItems.filter(i => i.productId && i.quantity > 0);
        if(validItems.length === 0) {
            useStore.getState().addNotification("Lütfen en az bir ürün seçiniz.", "error");
            return;
        }

        const structuredStock = {};
        validItems.forEach(vi => {
            const pName = products.find(p => p.id === vi.productId)?.name || vi.productId;
            structuredStock[pName] = (structuredStock[pName] || 0) + vi.quantity;
        });

        await addReconciliation({
            courierId: selectedCourier,
            type: 'morning',
            stock: structuredStock,
            cash: startCash,
            date: new Date().toISOString()
        });

        // Also update actual courier cash & stock dynamically
        await updateCourier(selectedCourier, { cash: parseFloat(startCash) || 0, currentStock: structuredStock });

        useStore.getState().addNotification("Sabah çıkışı kaydedildi.", "success");
        setActiveTab('evening');
    };

    const handleConfirmEvening = async () => {
        if (!selectedCourier) {
            useStore.getState().addNotification("Lütfen kurye seçiniz.", "error");
            return;
        }
        if (discrepancy !== 0) {
            useStore.getState().addNotification("Kasa tutmadığı için kapanış yapılamaz.", "error");
            return;
        }

        await addReconciliation({
            courierId: selectedCourier,
            type: 'evening',
            ...eveningData,
            calculatedSalesTotal,
            discrepancy,
            date: new Date().toISOString()
        });

        // Clear courier cash & stock on hand at closing
        await updateCourier(selectedCourier, { cash: 0, currentStock: {} });

        useStore.getState().addNotification("Akşam kapanışı başarıyla yapıldı. Kurye kasası sıfırlandı.", "success");
    };

    return (
        <div className="p-4 md:p-8 bg-slate-50 min-h-screen w-full overflow-hidden">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-800">Kurye Mutabakat</h1>
                <p className="text-slate-500">Sabah stok çıkışı ve akşam kasa kapanışı</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden max-w-4xl mx-auto">
                {/* Tabs */}
                <div className="flex border-b border-slate-100 overflow-x-auto no-scrollbar">
                    <button
                        onClick={() => setActiveTab('morning')}
                        className={`flex-1 min-w-[150px] py-4 text-xs md:text-sm font-bold flex items-center justify-center gap-2 transition-colors ${activeTab === 'morning'
                            ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                            : 'text-slate-500 hover:bg-slate-50'
                            }`}
                    >
                        <Sun size={18} />
                        Sabah Çıkışı
                    </button>
                    <button
                        onClick={() => setActiveTab('evening')}
                        className={`flex-1 min-w-[150px] py-4 text-xs md:text-sm font-bold flex items-center justify-center gap-2 transition-colors ${activeTab === 'evening'
                            ? 'bg-purple-50 text-purple-600 border-b-2 border-purple-600'
                            : 'text-slate-500 hover:bg-slate-50'
                            }`}
                    >
                        <Moon size={18} />
                        Akşam Kapanışı
                    </button>
                </div>

                <div className="p-4 md:p-8">
                    <div className="mb-6">
                        <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Kurye Seçimi</label>
                        <select
                            value={selectedCourier}
                            onChange={(e) => setSelectedCourier(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 bg-white transition-all font-bold"
                        >
                            <option value="">Kurye Seçiniz...</option>
                            {couriers.map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </div>

                    {activeTab === 'morning' ? (
                        <div className="space-y-6 animate-fadeIn">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                <div className="bg-slate-50 p-4 md:p-6 rounded-xl border border-slate-200">
                                    <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-sm md:text-base">
                                        <Plus size={16} className="text-blue-500" /> Stok Ekle
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Yüklenecek Ürünler</span>
                                            <button onClick={() => setMorningItems([...morningItems, { productId: '', quantity: 1 }])} className="text-[10px] font-black uppercase text-blue-500 flex items-center gap-1"><Plus size={12}/> Ekle</button>
                                        </div>
                                        {morningItems.map((item, idx) => (
                                            <div key={idx} className="flex gap-2">
                                                <select
                                                    value={item.productId}
                                                    onChange={(e) => {
                                                        const nItems = [...morningItems];
                                                        nItems[idx].productId = e.target.value;
                                                        setMorningItems(nItems);
                                                    }}
                                                    className="flex-1 w-full p-3 border border-slate-300 rounded-lg text-sm font-bold bg-white outline-none focus:border-blue-500"
                                                >
                                                    <option value="">Ürün Seçiniz...</option>
                                                    {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                                                </select>
                                                <input
                                                    type="number" min="1"
                                                    value={item.quantity}
                                                    onChange={(e) => {
                                                        const qt = parseInt(e.target.value) || 1;
                                                        const nItems = [...morningItems];
                                                        nItems[idx].quantity = qt;
                                                        setMorningItems(nItems);
                                                    }}
                                                    className="w-20 p-3 border border-slate-300 rounded-lg text-lg font-bold text-center bg-white outline-none focus:border-blue-500"
                                                />
                                                {morningItems.length > 1 && (
                                                    <button onClick={() => setMorningItems(morningItems.filter((_, i) => i !== idx))} className="bg-rose-50 text-rose-500 p-3 rounded-lg border border-rose-100"><X size={16}/></button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-slate-50 p-4 md:p-6 rounded-xl border border-slate-200">
                                    <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-sm md:text-base">
                                        <Wallet size={20} className="text-green-500" /> Başlangıç Kasası
                                    </h3>
                                    <div>
                                        <label className="text-[10px] md:text-sm text-slate-500 mb-1 block font-bold uppercase tracking-widest">Bozuk Para / Nakit (₺)</label>
                                        <input
                                            type="number"
                                            value={startCash}
                                            onChange={(e) => setStartCash(parseFloat(e.target.value) || 0)}
                                            className="w-full p-3 border border-slate-300 rounded-lg text-2xl font-bold text-center text-green-600 bg-white"
                                        />
                                        <p className="text-[10px] text-slate-400 mt-2 text-center font-medium">
                                            Kuryeye para üstü için verilen nakit
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleConfirmMorning}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-xl shadow-xl shadow-blue-200 transition-all active:scale-95 flex items-center justify-center gap-2 uppercase tracking-widest text-xs"
                            >
                                <CheckCircle size={20} />
                                Sabah Çıkışını Onayla
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-8 animate-fadeIn">
                            {/* Main Evening Layout: Stats and Inputs Side-by-Side */}
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                                
                                {/* 1. Collection Inputs (Kasa ve Tahsilatlar) */}
                                <div className="lg:col-span-7 space-y-6">
                                    <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-blue-500/10 transition-colors"></div>
                                        <div className="relative z-10">
                                            <div className="flex items-center gap-4 mb-8">
                                                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shadow-sm border border-blue-100">
                                                    <Wallet size={24} />
                                                </div>
                                                <div>
                                                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Kasa ve Tahsilatlar</h3>
                                                    <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Gelen ödemelerin dökümü</p>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                {/* Nakit */}
                                                <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100 hover:border-emerald-200 transition-colors">
                                                    <label className="flex items-center gap-2 text-[10px] font-black text-slate-500 mb-2 uppercase tracking-widest">
                                                        <Banknote size={14} className="text-emerald-500"/> Nakit
                                                    </label>
                                                    <div className="relative">
                                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-black">₺</span>
                                                        <input
                                                            type="number"
                                                            value={eveningData.cashHanded}
                                                            onChange={(e) => setEveningData({ ...eveningData, cashHanded: parseFloat(e.target.value) || 0 })}
                                                            className="w-full pl-8 pr-4 py-3 border-2 border-transparent rounded-xl font-black text-xl bg-white focus:border-emerald-500 outline-none transition-all shadow-sm"
                                                        />
                                                    </div>
                                                </div>

                                                {/* Kredi Kartı */}
                                                <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100 hover:border-blue-200 transition-colors">
                                                    <label className="flex items-center gap-2 text-[10px] font-black text-slate-500 mb-2 uppercase tracking-widest">
                                                        <CreditCard size={14} className="text-blue-500"/> POS / Kredi Kartı
                                                    </label>
                                                    <div className="relative">
                                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-black">₺</span>
                                                        <input
                                                            type="number"
                                                            value={eveningData.creditCard}
                                                            onChange={(e) => setEveningData({ ...eveningData, creditCard: parseFloat(e.target.value) || 0 })}
                                                            className="w-full pl-8 pr-4 py-3 border-2 border-transparent rounded-xl font-black text-xl bg-white focus:border-blue-500 outline-none transition-all shadow-sm"
                                                        />
                                                    </div>
                                                </div>

                                                {/* IBAN */}
                                                <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100 hover:border-indigo-200 transition-colors">
                                                    <label className="flex items-center gap-2 text-[10px] font-black text-slate-500 mb-2 uppercase tracking-widest">
                                                        <Landmark size={14} className="text-indigo-500"/> IBAN / Havale
                                                    </label>
                                                    <div className="relative">
                                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-black">₺</span>
                                                        <input
                                                            type="number"
                                                            value={eveningData.iban}
                                                            onChange={(e) => setEveningData({ ...eveningData, iban: parseFloat(e.target.value) || 0 })}
                                                            className="w-full pl-8 pr-4 py-3 border-2 border-transparent rounded-xl font-black text-xl bg-white focus:border-indigo-500 outline-none transition-all shadow-sm"
                                                        />
                                                    </div>
                                                </div>

                                                {/* Veresiye */}
                                                <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100 hover:border-orange-200 transition-colors">
                                                    <label className="flex items-center gap-2 text-[10px] font-black text-slate-500 mb-2 uppercase tracking-widest">
                                                        <Receipt size={14} className="text-orange-500"/> Veresiye
                                                    </label>
                                                    <div className="relative">
                                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-black">₺</span>
                                                        <input
                                                            type="number"
                                                            value={eveningData.veresiye}
                                                            onChange={(e) => setEveningData({ ...eveningData, veresiye: parseFloat(e.target.value) || 0 })}
                                                            className="w-full pl-8 pr-4 py-3 border-2 border-transparent rounded-xl font-black text-xl bg-white focus:border-orange-500 outline-none transition-all shadow-sm"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-100">
                                                <div className="bg-rose-50/30 p-5 rounded-2xl border border-rose-100 group-hover:bg-rose-50/50 transition-colors">
                                                    <label className="flex items-center gap-2 text-[10px] font-black text-rose-500 mb-2 uppercase tracking-widest">
                                                        <TrendingDown size={14}/> Günlük Gider
                                                    </label>
                                                    <div className="relative">
                                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-300 font-black">₺</span>
                                                        <input
                                                            type="number"
                                                            value={eveningData.expenses}
                                                            onChange={(e) => setEveningData({ ...eveningData, expenses: parseFloat(e.target.value) || 0 })}
                                                            className="w-full pl-8 pr-4 py-3 bg-white border-2 border-transparent rounded-xl font-black text-lg text-rose-600 focus:border-rose-500 outline-none shadow-sm"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="bg-slate-50/30 p-5 rounded-2xl border border-slate-100 transition-colors">
                                                    <label className="flex items-center gap-2 text-[10px] font-black text-slate-500 mb-2 uppercase tracking-widest">
                                                        <RefreshCcw size={14}/> Boş İade Adedi
                                                    </label>
                                                    <input
                                                        type="number"
                                                        value={eveningData.emptyBottles}
                                                        onChange={(e) => setEveningData({ ...eveningData, emptyBottles: parseInt(e.target.value) || 0 })}
                                                        className="w-full px-4 py-3 bg-white border-2 border-transparent rounded-xl font-black text-lg text-center text-slate-700 focus:border-slate-500 outline-none shadow-sm"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* 2. Account Summary (Hesap Özeti) */}
                                <div className="lg:col-span-5 space-y-6">
                                    <div className="bg-slate-900 text-white rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden flex flex-col h-full ring-8 ring-slate-900/5">
                                        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full -mr-24 -mt-24 blur-3xl"></div>
                                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/5 rounded-full -ml-16 -mb-16 blur-2xl"></div>
                                        
                                        <div className="relative z-10 flex-1">
                                            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                                                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white/60">Hesap Özeti</h3>
                                                <Calculator size={20} className="text-blue-400" />
                                            </div>

                                            <div className="space-y-6">
                                                <div className="flex justify-between items-center group">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40 group-hover:bg-white/10 group-hover:text-white transition-all">
                                                            <Wallet size={14} />
                                                        </div>
                                                        <span className="text-xs font-bold text-white/50 tracking-wider">BAŞLANGIÇ KASASI</span>
                                                    </div>
                                                    <span className="font-black text-lg tracking-tight">₺{startCash}</span>
                                                </div>

                                                <div className="flex justify-between items-center group">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/20 transition-all">
                                                            <TrendingUp size={14} />
                                                        </div>
                                                        <span className="text-xs font-bold text-white/50 tracking-wider">SİSTEM SATIŞI (+)</span>
                                                    </div>
                                                    <span className="font-black text-lg text-emerald-400 tracking-tight">₺{calculatedSalesTotal}</span>
                                                </div>

                                                <div className="flex justify-between items-center group">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-400 group-hover:bg-rose-500/20 transition-all">
                                                            <TrendingDown size={14} />
                                                        </div>
                                                        <span className="text-xs font-bold text-white/50 tracking-wider">TOPLAM GİDER (-)</span>
                                                    </div>
                                                    <span className="font-black text-lg text-rose-400 tracking-tight">₺{eveningData.expenses}</span>
                                                </div>

                                                <div className="mt-8 pt-6 border-t border-white/10">
                                                    <div className="flex justify-between items-end">
                                                        <div>
                                                            <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] mb-1">BEKLENEN TOPLAM</p>
                                                            <p className="text-4xl font-black text-white font-display tracking-tighter">
                                                                ₺{(parseFloat(startCash) || 0) + calculatedSalesTotal - (parseFloat(eveningData.expenses) || 0)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={`mt-8 p-6 rounded-3xl text-center border-2 transition-all duration-300 relative z-10 ring-4 ring-black/10 ${discrepancy === 0 ? 'bg-emerald-500 border-emerald-400 text-white shadow-lg shadow-emerald-500/20' : 'bg-rose-500 border-rose-400 text-white shadow-lg shadow-rose-500/20'}`}>
                                            <p className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-80">Mutabakat Durumu</p>
                                            <div className="text-2xl font-black font-display flex justify-center items-center gap-2">
                                                {discrepancy === 0 ? <CheckCircle size={24} /> : <AlertTriangle size={24} />}
                                                {discrepancy === 0 ? 'KASA HATASIZ' : `${discrepancy > 0 ? '+' : ''}₺${discrepancy} FARK`}
                                            </div>
                                        </div>

                                        <button
                                            onClick={handleConfirmEvening}
                                            disabled={discrepancy !== 0}
                                            className="w-full mt-6 bg-white text-slate-900 font-black py-5 rounded-[1.5rem] hover:bg-blue-50 disabled:opacity-30 disabled:grayscale transition-all active:scale-95 shadow-xl uppercase tracking-widest text-xs relative z-10"
                                        >
                                            {discrepancy === 0 ? 'MUTABAKATI TAMAMLA' : 'KASA UYUŞMUYOR'}
                                        </button>
                                    </div>
                                </div>

                                {/* 3. Detailed Delivery Report (Günlük Teslimat Raporu) */}
                                <div className="lg:col-span-12">
                                    <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm">
                                        <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                                                    <ListOrdered size={20} />
                                                </div>
                                                <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Gün İçi Yapılan Teslimatlar</h3>
                                            </div>
                                            <span className="text-[10px] font-black bg-slate-100 text-slate-500 px-3 py-1 rounded-full uppercase tracking-widest">{todaysDeliveries.length} İŞLEM</span>
                                        </div>

                                        {todaysDeliveries.length === 0 ? (
                                            <div className="py-16 text-center">
                                                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-200">
                                                    <Package size={32} />
                                                </div>
                                                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Henüz bir teslimat kaydı bulunmuyor.</p>
                                            </div>
                                        ) : (
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                                {todaysDeliveries.map((del, idx) => (
                                                    <div key={idx} className="group premium-card p-5 bg-slate-50 hover:bg-white hover:border-blue-200 transition-all">
                                                        <div className="flex justify-between items-start mb-3">
                                                            <div className="max-w-[150px]">
                                                                <p className="font-black text-slate-900 text-xs uppercase truncate">{del.customer}</p>
                                                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1 truncate">{del.product}</p>
                                                            </div>
                                                            <div className={`p-2 rounded-lg ${del.paymentMethod === 'Nakit' ? 'bg-emerald-50 text-emerald-500' : 'bg-blue-50 text-blue-500'}`}>
                                                                {del.paymentMethod === 'Nakit' ? <Banknote size={14}/> : <CreditCard size={14}/>}
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-between items-end mt-4 pt-4 border-t border-slate-200/50">
                                                            <div>
                                                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">TUTAR</span>
                                                                <span className="font-black text-slate-900 text-base">₺{del.amount || 0}</span>
                                                            </div>
                                                            <div className="text-right">
                                                                <span className={`text-[9px] font-black px-2 py-1 rounded-md uppercase tracking-tighter ${
                                                                    del.paymentMethod === 'IBAN' ? 'bg-blue-100 text-blue-600' : 
                                                                    del.paymentMethod === 'POS' || del.paymentMethod === 'Kredi Kartı' ? 'bg-purple-100 text-purple-600' : 
                                                                    del.paymentMethod === 'Veresiye' ? 'bg-orange-100 text-orange-600' : 
                                                                    'bg-emerald-100 text-emerald-600'
                                                                }`}>
                                                                    {del.paymentMethod}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Reconciliation;
