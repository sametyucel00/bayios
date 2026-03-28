import React, { useState } from 'react';
import { Truck, Phone, MessageSquare, MapPin, XCircle, Plus, User, CheckCircle2, Banknote, Package, MoreHorizontal, Edit2, Trash2, Map, Hash } from 'lucide-react';
import useStore from '../store/useStore';
import { ShieldCheck, Copy, Info, RefreshCw } from 'lucide-react';
import GoogleMapTracker from '../components/GoogleMapTracker';

const CourierCard = ({ courier, onAnalyze, onEdit, onDelete, onMapClick }) => (
    <div className="premium-card p-7 group transition-all duration-500 hover:scale-[1.02]">
        <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-5">
                <div className="w-16 h-16 bg-slate-50 rounded-[1.5rem] flex items-center justify-center text-brand-primary shadow-inner group-hover:bg-brand-primary group-hover:text-white transition-all duration-500">
                    <Truck size={28} />
                </div>
                <div>
                    <h3 className="font-black text-slate-900 text-xl tracking-tight group-hover:text-brand-primary transition-colors">{courier.name}</h3>
                    <div className="flex items-center gap-2 text-xs font-bold mt-1.5">
                        <div className={`w-2 h-2 rounded-full ${courier.status === 'Yolda' ? 'bg-brand-accent' :
                            courier.status === 'MÃ¼sait' ? 'bg-emerald-500' : 'bg-slate-300'
                            }`}></div>
                        <span className="text-slate-500 uppercase tracking-widest">{courier.status}</span>
                    </div>
                </div>
            </div>
            <div className="flex gap-2 relative">
                <button onClick={() => onEdit(courier)} className="p-3 bg-slate-50 text-slate-400 hover:bg-blue-500 hover:text-white rounded-xl transition-all shadow-sm active:scale-90" title="DÃ¼zenle">
                    <Edit2 size={18} />
                </button>
                <button onClick={() => onDelete(courier.id)} className="p-3 bg-slate-50 text-slate-400 hover:bg-rose-500 hover:text-white rounded-xl transition-all shadow-sm active:scale-90" title="Sil">
                    <Trash2 size={18} />
                </button>
            </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-slate-100">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-2">Ã¼zerindeki Stok</p>
                <div className="text-slate-800 font-black text-sm">
                    {(courier.currentStock?.water || 0) > 0 && <div>{courier.currentStock.water} Su</div>}
                    {(courier.currentStock?.tube || 0) > 0 && <div>{courier.currentStock.tube} TÃ¼p</div>}
                    {!(courier.currentStock?.water) && !(courier.currentStock?.tube) && <div className="text-slate-300">Stok Yok</div>}
                </div>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-right">
                <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-2">GÃ¼ncel Kasa</p>
                <p className="text-slate-900 font-black text-xl font-display">{`\u20BA${courier.cash || 0}`}</p>
            </div>
        </div>

        <div className="mt-6 flex gap-3">
            <button
                onClick={() => onAnalyze(courier)}
                className="flex-[2] bg-slate-900 text-white py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200"
            >
                DETAYLI ANALÄ±Z
            </button>
            <button 
                onClick={() => onMapClick(courier)}
                className="flex-1 border-2 border-slate-100 text-slate-500 py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
                <MapPin size={16} /> KONUM
            </button>
        </div>
    </div>
);

const Couriers = () => {
    const { couriers, orders, addCourierAccount, updateCourier, deleteCourier, currentUser, updateUserSettings } = useStore();
    const [isSimulating, setIsSimulating] = useState(false);
    const [isCreateDrawerOpen, setIsCreateDrawerOpen] = useState(false);
    const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
    const [analysisCourier, setAnalysisCourier] = useState(null);
    const [showCredentialsModal, setShowCredentialsModal] = useState(null);
    const [isMapDrawerOpen, setIsMapDrawerOpen] = useState(false);
    const [selectedMapCourier, setSelectedMapCourier] = useState(null);
    const [eta, setEta] = useState(null);

    const [newCourier, setNewCourier] = useState({
        name: '',
        phone: '',
        vehicle: 'Motor'
    });
    const [notification, setNotification] = useState(null);

    const showNotification = (message, type = 'success') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    const [showConfirmRefresh, setShowConfirmRefresh] = useState(false);

    const handleRegenerate = async () => {
        if (!showConfirmRefresh) {
            setShowConfirmRefresh(true);
            setTimeout(() => setShowConfirmRefresh(false), 3000);
            showNotification("Yenilemek iÃ§in tekrar basÄ±n", "error");
            return;
        }
        setShowConfirmRefresh(false);
        const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
        await updateUserSettings({ courierCode: randomCode });
        showNotification("Kurye kodu baÅŸarÄ±yla yenilendi!", "success");
    };

    const activeCouriersCount = couriers.filter(c => c.status === 'Yolda' || c.status === 'MÃ¼sait').length;
    const activeDeliveriesCount = orders.filter(o => o.status === 'Yolda' || o.status === 'HazÄ±rlanÄ±yor' || o.status === 'Beklemede').length;

    const today = new Date().toISOString().split('T')[0];
    const completedTodayCount = orders.filter(o =>
        o.status === 'TamamlandÄ±' && o.date && o.date.startsWith(today)
    ).length;

    const statsItems = [
        { label: 'Aktif Kuryeler', value: activeCouriersCount, icon: User, color: 'text-brand-primary', bg: 'bg-brand-primary/10' },
        { label: 'Aktif GÃ¶revler', value: activeDeliveriesCount, icon: Truck, color: 'text-brand-accent', bg: 'bg-brand-accent/10' },
        { label: 'Tamamlanan', value: completedTodayCount, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    ];

    // Generate Courier Code if not exists
    React.useEffect(() => {
        if (currentUser && currentUser.role === 'admin' && !currentUser.courierCode) {
            const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
            updateUserSettings({ courierCode: randomCode });
        }
    }, [currentUser, updateUserSettings]);

    const generateCourierCredentials = (name) => {
        const username = (name || 'kurye').toLowerCase().replace(/\s+/g, '') + Math.floor(100 + Math.random() * 899);
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const lower = "abcdefghijklmnopqrstuvwxyz";
        const nums = "0123456789";

        let password = "";
        password += upper[Math.floor(Math.random() * upper.length)];
        password += lower[Math.floor(Math.random() * lower.length)];
        password += nums[Math.floor(Math.random() * nums.length)];

        for (let i = 0; i < 5; i++) {
            password += chars[Math.floor(Math.random() * chars.length)];
        }
        password = password.split('').sort(() => 0.5 - Math.random()).join('');

        return { username, password };
    };

    const handleCreateCourier = async (e) => {
        e.preventDefault();
        const { username, password } = generateCourierCredentials(newCourier.name);

        await addCourierAccount({
            ...newCourier,
            username,
            password,
            securityQuestion: 'Ä±ÅŸletme tarafÄ±ndan oluÅŸturuldu',
            securityAnswer: 'bayios'
        });

        setIsCreateDrawerOpen(false);
        setShowCredentialsModal({ name: newCourier.name, username, password });
        setNewCourier({ name: '', phone: '', vehicle: 'Motor' });
    };

    const handleEditCourier = async (e) => {
        e.preventDefault();
        await updateCourier(newCourier.id, {
            name: newCourier.name,
            phone: newCourier.phone,
            vehicle: newCourier.vehicle
        });
        setIsEditDrawerOpen(false);
        setNewCourier({ name: '', phone: '', vehicle: 'Motor' });
        showNotification("Kurye bilgileri gÃ¼ncellendi.");
    };

    const openEditDrawer = (courier) => {
        setNewCourier({ id: courier.id, name: courier.name, phone: courier.phone, vehicle: courier.vehicle || 'Motor' });
        setIsEditDrawerOpen(true);
    };

    const [deleteConfirmId, setDeleteConfirmId] = useState(null);

    const handleDeleteCourier = async (courierId) => {
        if (deleteConfirmId !== courierId) {
            setDeleteConfirmId(courierId);
            showNotification("Silmek iÃ§in tekrar basÄ±n!", "error");
            setTimeout(() => setDeleteConfirmId(null), 3000);
            return;
        }
        await deleteCourier(courierId);
        showNotification("Kurye silindi.", "success");
        setDeleteConfirmId(null);
    };

    // Simulation Logic
    React.useEffect(() => {
        let interval;
        if (isSimulating) {
            interval = setInterval(() => {
                const currentCouriers = useStore.getState().couriers;
                if (currentCouriers.length === 0) return;

                const randomIndex = Math.floor(Math.random() * currentCouriers.length);
                const courier = currentCouriers[randomIndex];

                // Randomly change status
                const statuses = ['MÃ¼sait', 'Yolda', 'MÃ¼sait', 'MeÅŸgul'];
                const status = statuses[Math.floor(Math.random() * statuses.length)];

                // Randomly increment cash if "Yolda" (simulating a delivery)
                const cashIncrease = status === 'Yolda' ? Math.floor(Math.random() * 50) + 20 : 0;

                // Randomly update stock
                const waterStock = Math.max(0, (courier.currentStock?.water || 0) + (status === 'MÃ¼sait' ? 5 : -1));
                const tubeStock = Math.max(0, (courier.currentStock?.tube || 0) + (status === 'MÃ¼sait' ? 2 : 0));

                useStore.getState().updateCourier(courier.id, {
                    status,
                    cash: (courier.cash || 0) + cashIncrease,
                    currentStock: {
                        water: waterStock,
                        tube: tubeStock
                    }
                });
            }, 5000);
        }
        return () => clearInterval(interval);
    }, [isSimulating]);

    return (
        <div className="p-4 md:p-8 bg-slate-50 min-h-screen w-full overflow-hidden">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                <div>
                    <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight font-display">Kurye Yönetimi</h1>
                    <div className="flex items-center gap-3 mt-1">
                        <p className="text-slate-500 font-medium">Saha ekibi ve teslimat operasyon takibi</p>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row flex-wrap gap-3 w-full md:w-auto items-stretch sm:items-center">
                    {currentUser?.role === 'admin' && (
                        <div className="flex w-full sm:w-auto bg-white border border-slate-200 rounded-2xl p-2 items-center gap-2 shadow-sm hover:border-slate-300 transition-all group">
                            <div className="flex flex-col px-3 py-0.5 border-r border-slate-100 min-w-0">
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">KURYE KODU</span>
                                <div className="flex items-center gap-2">
                                    <ShieldCheck size={14} className="text-blue-500" />
                                    <span className="text-sm font-black text-slate-900 tracking-[0.2em] font-mono break-all">
                                        {currentUser.courierCode || '------'}
                                    </span>
                                </div>
                            </div>
                            <div className="flex gap-1 pl-1 shrink-0">
                                <button
                                    onClick={async () => {
                                        let code = currentUser?.courierCode;
                                        if (!code) {
                                            code = Math.floor(100000 + Math.random() * 900000).toString();
                                            await updateUserSettings({ courierCode: code });
                                        }
                                        navigator.clipboard.writeText(code);
                                        showNotification("Kurye kodu kopyalandÄ±!");
                                    }}
                                    className="p-2 text-slate-400 hover:text-brand-primary hover:bg-slate-50 rounded-xl transition-all active:scale-90"
                                    title="Kopyala"
                                >
                                    <Copy size={16} />
                                </button>
                                <button
                                    onClick={handleRegenerate}
                                    className={`p-2 rounded-xl transition-all active:scale-90 ${showConfirmRefresh ? 'bg-rose-50 text-rose-500' : 'text-slate-400 hover:text-brand-accent hover:bg-slate-50'
                                        }`}
                                    title={showConfirmRefresh ? "Onaylamak iÃ§in tekrar bas" : "Yenile"}
                                >
                                    <RefreshCw size={16} className={`${showConfirmRefresh ? 'animate-spin' : 'group-hover:rotate-180'} transition-transform duration-500`} />
                                </button>
                            </div>
                        </div>
                    )}
                    <button
                        onClick={() => setIsCreateDrawerOpen(true)}
                        className="w-full sm:w-auto flex-1 md:flex-none bg-brand-primary hover:bg-slate-900 text-white px-8 py-3.5 rounded-2xl transition-all font-black text-sm shadow-xl shadow-brand-primary/20 flex items-center justify-center gap-2.5 active:scale-95"
                    >
                        <Plus size={20} /> Yeni Kurye Ekle
                    </button>
                </div>
            </div>

            {/* Premium Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {statsItems.map((item, idx) => (
                    <div key={idx} className="premium-card p-5 group relative overflow-hidden flex items-center gap-5">
                        <div className={`p-3 rounded-xl ${item.bg} group-hover:scale-110 transition-transform duration-500 shrink-0`}>
                            <item.icon className={item.color} size={22} />
                        </div>
                        <div>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{item.label}</p>
                            <h3 className="text-2xl font-black text-slate-900 tracking-tight font-display">{item.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {couriers.length === 0 ? (
                    <div className="col-span-full p-20 bg-white rounded-[2.5rem] border-2 border-dashed border-slate-200 text-center">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Truck size={40} className="text-slate-300" />
                        </div>
                        <h3 className="text-xl font-black text-slate-800">HenÃ¼z Kurye Yok</h3>
                        <p className="text-slate-400 font-medium mt-1 mb-8">Ekibinizi oluÅŸturmak iÃ§in yeni kurye kaydÄ± yapÄ±n.</p>
                        <button onClick={() => setIsCreateModalOpen(true)} className="bg-slate-100 text-slate-600 hover:bg-brand-primary hover:text-white px-6 py-3 rounded-xl font-black text-xs transition-all uppercase tracking-widest">KayÄ±t BaÅŸlat</button>
                    </div>
                ) : (
                    couriers.map(courier => (
                        <CourierCard 
                            key={courier.id} 
                            courier={courier} 
                            onAnalyze={setAnalysisCourier} 
                            onMapClick={(c) => { setEta(null); setSelectedMapCourier(c); setIsMapDrawerOpen(true); }}
                            onEdit={openEditDrawer}
                            onDelete={handleDeleteCourier}
                        />
                    ))
                )}
            </div>

            {/* Courier Analysis Drawer */}
            {analysisCourier && (
                <div className="fixed inset-0 z-[150] flex justify-end">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setAnalysisCourier(null)}></div>
                    <div className="relative w-full sm:max-w-xl h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
                        <div className="p-5 sm:p-8 border-b border-slate-100 flex justify-between items-center bg-white/50 sticky top-0 z-10 backdrop-blur-md">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-lg">
                                    <Truck size={24} sm:size={28} />
                                </div>
                                <div>
                                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-display uppercase leading-tight">{analysisCourier.name}</h3>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{analysisCourier.vehicle} OperatÃ¶rÃ¼</p>
                                </div>
                            </div>
                            <button onClick={() => setAnalysisCourier(null)} className="p-2 sm:p-3 bg-white rounded-2xl text-slate-400 hover:text-slate-600 shadow-sm transition-colors border border-slate-100">
                                <XCircle size={24} sm:size={28} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-5 sm:p-10 space-y-8 sm:space-y-10 scrollbar-hide">
                            {/* Performance Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                <div className="bg-slate-50 p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2.5rem] border-2 border-slate-100/50 shadow-sm">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Teslimat PerformansÄ±</p>
                                    <p className="text-2xl sm:text-3xl font-black text-brand-primary font-display">
                                        {orders.filter(o => o.courierId === analysisCourier.id && o.status === 'TamamlandÄ±').length} BaÅŸarÄ±lÄ±
                                    </p>
                                    <div className="mt-4 h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-brand-primary rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all duration-1000"
                                            style={{ width: `${Math.min(100, (orders.filter(o => o.courierId === analysisCourier.id && o.status === 'TamamlandÄ±').length / Math.max(1, orders.filter(o => o.courierId === analysisCourier.id).length)) * 100)}%` }}
                                        ></div>
                                    </div>
                                </div>
                                <div className="bg-slate-50 p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2.5rem] border-2 border-slate-100/50 shadow-sm">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">GiriÅŸ Durumu</p>
                                    <p className="text-2xl sm:text-3xl font-black text-emerald-600 font-display uppercase">{analysisCourier.status || 'Aktif'}</p>
                                    <div className="mt-4 h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                                        <div className={`h-full rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)] ${analysisCourier.status === 'Yolda' ? 'bg-amber-500 w-[70%]' : 'bg-emerald-500 w-full'}`}></div>
                                    </div>
                                </div>
                            </div>

                            {/* Stock and Cash */}
                            <div className="space-y-4">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 sm:p-8 bg-white border-2 border-slate-50 rounded-[1.5rem] sm:rounded-[2.5rem] shadow-sm hover:border-indigo-100 transition-colors gap-4">
                                    <div className="flex items-center gap-5">
                                        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shadow-inner">
                                            <Package size={20} sm:size={24} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">GÃ¼NCEL STOK DURUMU</p>
                                            <p className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                                                {(analysisCourier.currentStock?.water || 0)} Su, {(analysisCourier.currentStock?.tube || 0)} TÃ¼p
                                            </p>
                                        </div>
                                    </div>
                                    <button className="w-full sm:w-auto bg-indigo-500 text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-lg shadow-indigo-500/20">DETAY</button>
                                </div>

                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 sm:p-8 bg-white border-2 border-slate-50 rounded-[1.5rem] sm:rounded-[2.5rem] shadow-sm hover:border-emerald-100 transition-colors gap-4">
                                    <div className="flex items-center gap-5">
                                        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shadow-inner">
                                            <Banknote size={20} sm:size={24} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">TOPLANAN KASA (NET)</p>
                                            <p className="text-2xl sm:text-3xl font-black text-slate-900 font-display">{`\u20BA${analysisCourier.cash || 0}`}</p>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => {
                                            if (analysisCourier.cash > 0) {
                                                updateCourier(analysisCourier.id, { cash: 0 });
                                                useStore.getState().addNotification(`\u20BA${analysisCourier.cash} tahsil edildi.`, 'success');
                                            }
                                        }}
                                        className="w-full sm:w-auto bg-slate-900 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-slate-900/10 active:scale-95"
                                    >TAHSÄ±L ET</button>
                                </div>
                            </div>

                            {/* Timeline */}
                            <div>
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6 px-1 flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 bg-brand-accent rounded-full"></div>
                                    SON OPERASYONLAR
                                </h4>
                                <div className="space-y-6 pl-2 pb-10">
                                    {orders.filter(o => o.courierId === analysisCourier.id).sort((a, b) => new Date(b.timestamp || b.date) - new Date(a.timestamp || a.date)).slice(0, 5).map((order) => (
                                        <div key={order.id} className="relative pl-8 border-l-2 border-slate-100 pb-2">
                                            <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-4 border-white shadow-sm ${order.status === 'TamamlandÄ±' ? 'bg-emerald-500' : 'bg-brand-accent'}`}></div>
                                            <p className="text-sm sm:text-base font-black text-slate-800 tracking-tight">
                                                SipariÅŸ {order.status === 'TamamlandÄ±' ? 'Teslim Edildi' : 'Aktif / Yolda'}
                                            </p>
                                            <p className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                                                {new Date(order.timestamp || order.date).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })} ? {order.customer} ? {order.paymentMethod || 'Nakit'}
                                            </p>
                                        </div>
                                    ))}
                                    {orders.filter(o => o.courierId === analysisCourier.id).length === 0 && (
                                        <p className="text-slate-400 text-xs font-black uppercase tracking-widest">HenÃ¼z operasyon kaydÄ± yok.</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="p-5 sm:p-8 pt-0 sticky bottom-0 bg-white">
                            <button
                                onClick={() => setAnalysisCourier(null)}
                                className="w-full bg-slate-100 text-slate-600 font-black py-4 sm:py-6 rounded-[1.5rem] sm:rounded-[2rem] hover:bg-slate-200 transition-all uppercase tracking-widest text-xs"
                            >
                                ANALÄ±ZDEN AYRIL
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Create Courier Drawer */}
            {isCreateDrawerOpen && (
                <div className="fixed inset-0 z-[150] flex justify-end">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setIsCreateDrawerOpen(false)}></div>
                    <div className="relative w-full sm:max-w-xl h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
                        <div className="p-5 sm:p-8 border-b border-slate-100 flex justify-between items-center bg-white/50 sticky top-0 z-10 backdrop-blur-md">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-brand-primary text-white rounded-2xl flex items-center justify-center shadow-lg">
                                    <User size={24} sm:size={28} />
                                </div>
                                <div>
                                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-display uppercase leading-tight">Yeni Kurye Kaydı</h3>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Saha ekibine yeni üye ekle</p>
                                </div>
                            </div>
                            <button onClick={() => setIsCreateDrawerOpen(false)} className="p-2 sm:p-3 bg-white rounded-2xl text-slate-400 hover:text-slate-600 shadow-sm transition-colors border border-slate-100">
                                <XCircle size={24} sm:size={28} />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-5 sm:p-10 scrollbar-hide">
                            <form onSubmit={handleCreateCourier} className="space-y-6 sm:space-y-8">
                                <div>
                                    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">AD SOYAD</label>
                                    <input
                                        type="text" required
                                        placeholder="Ã¶rn: Mehmet YÄ±lmaz"
                                        className="w-full p-4 sm:p-5 bg-slate-50 border-2 border-transparent rounded-[1.2rem] sm:rounded-[1.5rem] focus:outline-none focus:border-brand-primary focus:bg-white transition-all font-black text-slate-800 shadow-inner text-sm"
                                        value={newCourier.name}
                                        onChange={e => setNewCourier({ ...newCourier, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">TELEFON NUMARASI</label>
                                    <input
                                        type="tel" required
                                        placeholder="05xx xxx xx xx"
                                        className="w-full p-4 sm:p-5 bg-slate-50 border-2 border-transparent rounded-[1.2rem] sm:rounded-[1.5rem] focus:outline-none focus:border-brand-primary focus:bg-white transition-all font-black text-slate-800 shadow-inner text-sm"
                                        value={newCourier.phone}
                                        onChange={e => setNewCourier({ ...newCourier, phone: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">ARAÃ§ TÄ±PÄ±</label>
                                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                                        {['Motor', 'Car'].map(vehicle => (
                                            <button
                                                key={vehicle}
                                                type="button"
                                                onClick={() => setNewCourier({ ...newCourier, vehicle })}
                                                className={`p-4 sm:p-6 rounded-[1.5rem] sm:rounded-[2rem] border-2 flex flex-col items-center gap-2 sm:gap-3 font-black text-[9px] sm:text-[10px] transition-all duration-300 ${newCourier.vehicle === vehicle
                                                    ? 'bg-slate-900 border-slate-900 text-white shadow-xl translate-y-[-4px]'
                                                    : 'bg-slate-50 border-transparent text-slate-400 hover:border-slate-200'
                                                    }`}
                                            >
                                                <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl ${newCourier.vehicle === vehicle ? 'bg-white/10' : 'bg-white'} shadow-sm`}>
                                                    <Truck size={20} sm:size={24} />
                                                </div>
                                                {vehicle === 'Motor' ? 'MOTOSÄ±KLET' : 'HAFÄ±F TÄ±CARÄ±'}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="pt-6 pb-20 sm:pb-0">
                                    <button type="submit" className="w-full bg-brand-primary text-white font-black py-4 sm:py-6 rounded-[1.5rem] sm:rounded-[2rem] shadow-xl shadow-brand-primary/20 hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-widest text-xs">
                                        KAYDI TAMAMLA VE KAYDET
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            {/* Credentials Info Modal */}
            {showCredentialsModal && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setShowCredentialsModal(null)}></div>
                    <div className="relative glass p-0 rounded-[2.5rem] w-full max-w-sm shadow-2xl border-white/20 overflow-hidden animate-in zoom-in duration-200">
                        <div className="p-8 text-center">
                            <div className="w-16 h-16 bg-emerald-500 text-white rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-500/20">
                                <ShieldCheck size={32} />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 tracking-tight font-display mb-2">Kurye HesabÄ± OluÅŸturuldu!</h3>
                            <p className="text-sm text-slate-500 font-medium mb-8">{showCredentialsModal.name} iÃ§in giriÅŸ bilgileri aÅŸaÄŸÄ±dadÄ±r.</p>

                            <div className="space-y-3 mb-8">
                                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-left">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">KULLANICI ADI</p>
                                    <p className="font-bold text-slate-900">{showCredentialsModal.username}</p>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-left">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">ÅŸÄ±FRE</p>
                                    <p className="font-bold text-slate-900 tracking-wider font-mono">{showCredentialsModal.password}</p>
                                </div>
                            </div>

                            <div className="bg-blue-50 p-4 rounded-2xl flex gap-3 text-left mb-8">
                                <Info className="text-blue-500 shrink-0" size={18} />
                                <p className="text-[10px] text-blue-700 font-bold leading-relaxed">
                                    Kurye bu bilgilerle sisteme giriÅŸ yapabilir. LÃ¼tfen bu bilgileri kurye ile gÃ¼venli bir ÅŸekilde paylaÅŸÄ±n.
                                </p>
                            </div>

                            <button
                                onClick={() => setShowCredentialsModal(null)}
                                className="w-full bg-slate-900 text-white font-black py-4 rounded-2xl text-xs uppercase tracking-widest hover:bg-slate-800 transition-all active:scale-95"
                            >
                                TAMAMLANDI
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Courier Drawer */}
            {isEditDrawerOpen && (
                <div className="fixed inset-0 z-[150] flex justify-end">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setIsEditDrawerOpen(false)}></div>
                    <div className="relative w-full sm:max-w-xl h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
                        <div className="p-5 sm:p-8 border-b border-slate-100 flex justify-between items-center bg-white/50 sticky top-0 z-10 backdrop-blur-md">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-500 text-white rounded-2xl flex items-center justify-center shadow-lg">
                                    <Edit2 size={24} sm:size={28} />
                                </div>
                                <div>
                                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-display uppercase leading-tight">Kurye DÃ¼zenle</h3>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Kurye bilgilerini gÃ¼ncelle</p>
                                </div>
                            </div>
                            <button onClick={() => setIsEditDrawerOpen(false)} className="p-2 sm:p-3 bg-white rounded-2xl text-slate-400 hover:text-slate-600 shadow-sm transition-colors border border-slate-100">
                                <XCircle size={24} sm:size={28} />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-5 sm:p-10 scrollbar-hide">
                            <form onSubmit={handleEditCourier} className="space-y-6 sm:space-y-8">
                                <div>
                                    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">AD SOYAD</label>
                                    <input
                                        type="text" required
                                        placeholder="Ã¶rn: Mehmet YÄ±lmaz"
                                        className="w-full p-4 sm:p-5 bg-slate-50 border-2 border-transparent rounded-[1.2rem] sm:rounded-[1.5rem] focus:outline-none focus:border-brand-primary focus:bg-white transition-all font-black text-slate-800 shadow-inner text-sm"
                                        value={newCourier.name}
                                        onChange={e => setNewCourier({ ...newCourier, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">TELEFON NUMARASI</label>
                                    <input
                                        type="tel" required
                                        placeholder="05xx xxx xx xx"
                                        className="w-full p-4 sm:p-5 bg-slate-50 border-2 border-transparent rounded-[1.2rem] sm:rounded-[1.5rem] focus:outline-none focus:border-brand-primary focus:bg-white transition-all font-black text-slate-800 shadow-inner text-sm"
                                        value={newCourier.phone}
                                        onChange={e => setNewCourier({ ...newCourier, phone: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">ARAÃ§ TÄ±PÄ±</label>
                                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                                        {['Motor', 'Car'].map(vehicle => (
                                            <button
                                                key={vehicle}
                                                type="button"
                                                onClick={() => setNewCourier({ ...newCourier, vehicle })}
                                                className={`p-4 sm:p-6 rounded-[1.5rem] sm:rounded-[2rem] border-2 flex flex-col items-center gap-2 sm:gap-3 font-black text-[9px] sm:text-[10px] transition-all duration-300 ${newCourier.vehicle === vehicle
                                                    ? 'bg-slate-900 border-slate-900 text-white shadow-xl translate-y-[-4px]'
                                                    : 'bg-slate-50 border-transparent text-slate-400 hover:border-slate-200'
                                                    }`}
                                            >
                                                <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl ${newCourier.vehicle === vehicle ? 'bg-white/10' : 'bg-white'} shadow-sm`}>
                                                    <Truck size={20} sm:size={24} />
                                                </div>
                                                {vehicle === 'Motor' ? 'MOTOSÄ±KLET' : 'HAFÄ±F TÄ±CARÄ±'}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="pt-6 pb-20 sm:pb-0">
                                    <button
                                        type="submit"
                                        className="w-full bg-slate-900 text-white py-5 sm:py-6 rounded-[1.5rem] sm:rounded-[2rem] text-[10px] sm:text-xs font-black uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-slate-900/20 active:scale-95 flex flex-col items-center justify-center gap-1.5"
                                    >
                                        <span>GÃ¼NCELLE</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Notification Toast */}
            {notification && (
                <div className="fixed bottom-8 right-8 z-[200] animate-in slide-in-from-right-10 duration-500">
                    <div className={`px-6 py-4 rounded-2xl shadow-2xl border flex items-center gap-3 ${notification.type === 'success'
                        ? 'bg-emerald-500 border-emerald-400 text-white'
                        : 'bg-slate-900 border-slate-800 text-white'
                        }`}>
                        <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center">
                            <CheckCircle2 size={14} />
                        </div>
                        <p className="font-black text-xs uppercase tracking-widest">{notification.message}</p>
                    </div>
                </div>
            )}

            {/* Map Tracking Drawer */}
            {isMapDrawerOpen && selectedMapCourier && (
                <div className="fixed inset-0 z-[160] flex justify-end">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setIsMapDrawerOpen(false)}></div>
                    <div className="relative w-full sm:max-w-xl h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
                        <div className="p-5 sm:p-8 border-b border-slate-100 flex justify-between items-center bg-white/50 sticky top-0 z-10 backdrop-blur-md">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/20">
                                    <MapPin size={24} sm:size={28} />
                                </div>
                                <div>
                                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-display uppercase leading-tight">CANLI KONUM</h3>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{selectedMapCourier.name}</p>
                                </div>
                            </div>
                            <button onClick={() => setIsMapDrawerOpen(false)} className="p-2 sm:p-3 bg-white rounded-2xl text-slate-400 hover:text-slate-600 shadow-sm transition-colors border border-slate-100">
                                <XCircle size={24} sm:size={28} />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-5 sm:p-10 space-y-8 sm:space-y-10 scrollbar-hide">
                            <div className="h-[400px] sm:h-[500px] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white relative group">
                                <GoogleMapTracker
                                    courierLocation={selectedMapCourier.location}
                                    businessAddress={currentUser?.address || "Ã„Â°stanbul Merkez"}
                                    businessLocation={currentUser?.location}
                                    onTimeEstimate={(time) => setEta(time)}
                                />
                                {selectedMapCourier.status === 'Yolda' && eta && (
                                    <div className="absolute top-6 left-6 bg-slate-900/90 backdrop-blur-xl px-6 py-3 rounded-2xl text-xs shadow-2xl font-black text-white flex items-center gap-2">
                                        <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-ping" />
                                        <span className="uppercase tracking-[0.2em]">Tahmini VarÄ±ÅŸ: {eta}</span>
                                    </div>
                                )}
                            </div>
                            <div className="pt-6">
                                <button
                                    onClick={() => setIsMapDrawerOpen(false)}
                                    className="w-full bg-slate-100 text-slate-600 font-black py-4 sm:py-6 rounded-[1.5rem] sm:rounded-[2rem] hover:bg-slate-200 transition-all uppercase tracking-widest text-xs"
                                >
                                    TAKÄ±BÄ± KAPAT
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Couriers;


