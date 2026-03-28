import React, { useState } from 'react';
import useStore from '../store/useStore';
import { Database, LogOut, Users, UserCog, Truck, Activity, ShoppingCart, Store, FolderSync, ShieldAlert, Cpu, Key, CalendarClock, Trash2 } from 'lucide-react';
import { addActivationCodeToFirestore, updateUserInFirestore, deleteActivationCodeFromFirestore, bulkDeleteActivationCodesFromFirestore } from '../services/firestoreService';

// eslint-disable-next-line no-unused-vars
const StatCard = ({ title, value, subtext, icon: Icon, color }) => (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 relative group overflow-hidden hover:border-blue-200 hover:shadow-lg transition-all">
        <div className={`absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 rounded-full opacity-[0.03] ${color} group-hover:scale-150 transition-transform duration-300`}></div>
        <div className="flex items-start justify-between relative z-10">
            <div>
                <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest mb-4">{title}</p>
                <h3 className="text-3xl font-black text-slate-800 tracking-tighter">{value}</h3>
                <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mt-4">{subtext}</p>
            </div>
            <div className={`p-4 rounded-xl ${color.replace('bg-', 'bg-opacity-10 ')} bg-blue-50`}>
                <Icon className="text-blue-600" size={24} />
            </div>
        </div>
    </div>
);

const DeveloperPanel = ({ onLogout }) => {
    // Note: useStore in developer mode fetches ALL documents from all collections.
    const businesses = useStore(state => state.businesses) || []; // Actually fetches ALL users
    const orders = useStore(state => state.orders) || [];
    const products = useStore(state => state.products) || [];
    const subscribers = useStore(state => state.subscribers) || [];


    const activationCodes = useStore(state => state.activationCodes) || [];

    const storeAdmins = businesses.filter(u => u.role === 'admin');
    const storeCustomers = businesses.filter(u => u.role === 'customer');
    const storeCouriers = businesses.filter(u => u.role === 'courier');

    const [activeTab, setActiveTab] = useState('overview');
    const [isGenerating, setIsGenerating] = useState(false);
    const [selectedCodes, setSelectedCodes] = useState([]);
    const [deleteConfirmId, setDeleteConfirmId] = useState(null);

    const handleGenerateCode = async () => {
        setIsGenerating(true);
        try {
            // Generate a random 12 char alphanumeric code, e.g. BAYIOS-XXXX-YYYY
            const randomPart1 = Math.random().toString(36).substring(2, 6).toUpperCase();
            const randomPart2 = Math.random().toString(36).substring(2, 6).toUpperCase();
            const code = `BAYIOS-${randomPart1}-${randomPart2}`;

            await addActivationCodeToFirestore(code);
        } catch (error) {
            console.error("Kod oluşturulurken hata:", error);
            useStore.getState().addNotification("Bir hata oluştu, lütfen konsolu kontrol edin.", "error");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleExtendSubscription = async (businessId) => {
        const bus = storeAdmins.find(b => b.id === businessId);
        if (!bus) return;

        const months = "12"; // Default for developer quick action
        if (!months || isNaN(months)) return;

        const currentEnd = bus.subscriptionEndsAt ? new Date(bus.subscriptionEndsAt).getTime() : Date.now();
        const newEndString = new Date(currentEnd + (parseInt(months) * 30 * 24 * 60 * 60 * 1000)).toISOString();
        await updateUserInFirestore(businessId, { subscriptionEndsAt: newEndString });
        useStore.getState().addNotification(`Abonelik ${months} ay uzatıldı! Bitiş: ${new Date(newEndString).toLocaleDateString('tr-TR')}`, "success");
    };

    const handleSelectAllCodes = (e) => {
        if (e.target.checked) {
            setSelectedCodes(activationCodes.map(c => c.id));
        } else {
            setSelectedCodes([]);
        }
    };

    const handleSelectCode = (id) => {
        if (selectedCodes.includes(id)) {
            setSelectedCodes(selectedCodes.filter(c => c !== id));
        } else {
            setSelectedCodes([...selectedCodes, id]);
        }
    };

    const handleDeleteCode = async (id) => {
        if (deleteConfirmId === id) {
            await deleteActivationCodeFromFirestore(id);
            setSelectedCodes(selectedCodes.filter(c => c !== id));
            useStore.getState().addNotification("Lisans kodu silindi.", "info");
            setDeleteConfirmId(null);
        } else {
            setDeleteConfirmId(id);
            useStore.getState().addNotification("Silmek için tekrar tıklayın.", "warning");
            setTimeout(() => setDeleteConfirmId(null), 3000);
        }
    };

    const handleBulkDeleteCodes = async () => {
        if (selectedCodes.length === 0) return;
        if (deleteConfirmId === 'bulk') {
            await bulkDeleteActivationCodesFromFirestore(selectedCodes);
            setSelectedCodes([]);
            useStore.getState().addNotification("Seçili lisans kodları silindi.", "info");
            setDeleteConfirmId(null);
        } else {
            setDeleteConfirmId('bulk');
            useStore.getState().addNotification("Toplu silme işlemini onaylamak için tekrar tıklayın.", "warning");
            setTimeout(() => setDeleteConfirmId(null), 3000);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
            {/* Header */}
            <header className="flex flex-col md:flex-row justify-between items-center bg-white rounded-3xl border border-slate-100 p-6 shadow-sm mb-8">
                <div className="flex items-center gap-4">
                    <div className="bg-blue-50 p-3 rounded-2xl relative">
                        <Cpu className="text-blue-600" size={28} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-800 tracking-tight">Sistem <span className="text-blue-600">Mimarı</span> Paneli</h1>
                        <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400">BayiOS Tüm Veritabanı Görüntüleme</p>
                    </div>
                </div>

                <div className="mt-6 md:mt-0 flex gap-4">
                    <button
                        onClick={onLogout}
                        className="flex items-center gap-2 bg-slate-100 text-slate-600 px-6 py-3 rounded-2xl text-[10px] uppercase font-black tracking-widest hover:bg-slate-200 hover:text-slate-800 transition-colors"
                    >
                        <LogOut size={16} /> Oturumu Kapat
                    </button>
                </div>
            </header>

            {/* Navigation */}
            <div className="flex flex-wrap gap-2 mb-8 bg-white rounded-2xl p-2 border border-slate-100 shadow-sm">
                {[
                    { id: 'overview', label: 'GENEL BAKIŞ', icon: Activity },
                    { id: 'businesses', label: `İŞLETMELER (${storeAdmins.length})`, icon: Store },
                    { id: 'users', label: `KULLANICILAR (${businesses.length})`, icon: Users },
                    { id: 'licenses', label: `LİSANSLAR (${activationCodes.length})`, icon: Key },
                    { id: 'data', label: 'HAM VERİLER', icon: Database }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all
                            ${activeTab === tab.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-500 hover:bg-slate-100'}`}
                    >
                        <tab.icon size={16} /> {tab.label}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            {activeTab === 'overview' && (
                <div className="space-y-8 animate-in fade-in duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatCard title="Toplam İşletme" value={storeAdmins.length} subtext="Aktif Bayi Sayısı" icon={Store} color="bg-blue-500" />
                        <StatCard title="Toplam Müşteri" value={storeCustomers.length} subtext="Kayıtlı Son Kullanıcılar" icon={Users} color="bg-green-500" />
                        <StatCard title="Sistem Kuryeleri" value={storeCouriers.length} subtext="Dağıtım Ağı" icon={Truck} color="bg-purple-500" />
                        <StatCard title="Genel Siparişler" value={orders.length} subtext="İşlenen Toplam İşlem" icon={ShoppingCart} color="bg-amber-500" />
                    </div>

                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                        <h2 className="text-sm font-black tracking-widest uppercase text-slate-800 border-b border-slate-100 pb-4 mb-6 flex items-center gap-2">
                            <ShieldAlert size={18} className="text-blue-600" /> Global Operasyonel Metrikler
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x divide-slate-100">
                            <div className="space-y-2">
                                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Senkronize Ürün</div>
                                <div className="text-3xl font-black text-slate-800">{products.length}</div>
                            </div>
                            <div className="space-y-2">
                                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Toplam Abone</div>
                                <div className="text-3xl font-black text-slate-800">{subscribers.length}</div>
                            </div>
                            <div className="space-y-2">
                                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Aktif Kullanıcı</div>
                                <div className="text-3xl font-black text-slate-800">{businesses.length}</div>
                            </div>
                            <div className="space-y-2">
                                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Veri Kümeleri</div>
                                <div className="text-3xl font-black text-slate-800 flex justify-center items-center gap-2"><FolderSync size={24} className="text-green-500" /> OK</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'businesses' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                    <h2 className="text-lg font-black tracking-widest uppercase text-slate-800 flex items-center gap-2 mb-6">
                        <Store size={22} className="text-blue-600" /> Kayıtlı İşletmeler
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {storeAdmins.map(admin => {
                            // Find couriers and orders linked to this admin
                            const bizCouriers = storeCouriers.filter(c => c.businessId === admin.id);
                            const bizOrders = orders.filter(o => o.businessId === admin.id);
                            const bizProducts = products.filter(p => p.businessId === admin.id);

                            return (
                                <div key={admin.id} className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm flex flex-col justify-between hover:border-blue-200 hover:shadow-lg transition-all">
                                    <div>
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-slate-800 font-black text-xl">{admin.name}</h3>
                                                <span className="text-[10px] bg-slate-100 text-slate-500 px-3 py-1 rounded-lg mt-2 inline-block font-mono tracking-widest">
                                                    ID: {admin.id}
                                                </span>
                                            </div>
                                            <span className="text-[10px] font-black text-white bg-blue-600 px-3 py-1.5 rounded-lg uppercase tracking-widest shadow-md shadow-blue-500/20">
                                                İŞLETME
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between border-y border-slate-100 py-4 mb-4">
                                            <div>
                                                <p className="text-[12px] font-bold text-slate-800">
                                                    @{admin.username}
                                                </p>
                                                <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">
                                                    Kullanıcı Adı
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-[11px] font-black flex items-center justify-end gap-1.5 mb-2">
                                                    <CalendarClock size={14} className="text-blue-500" />
                                                    <span className={admin.subscriptionEndsAt && new Date(admin.subscriptionEndsAt).getTime() < Date.now() ? 'text-red-500' : 'text-slate-800'}>
                                                        {admin.subscriptionEndsAt ? new Date(admin.subscriptionEndsAt).toLocaleDateString('tr-TR') : 'Bilinmiyor'}
                                                    </span>
                                                </div>
                                                <button
                                                    onClick={() => handleExtendSubscription(admin.id)}
                                                    className="bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white font-bold text-[9px] px-3 py-1.5 rounded-lg uppercase tracking-widest transition-colors flex items-center gap-1"
                                                >
                                                    + SÜRE UZAT
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-3">
                                        <div className="bg-slate-50 p-4 rounded-2xl text-center border border-slate-100">
                                            <div className="text-lg font-black text-slate-800">{bizCouriers.length}</div>
                                            <div className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mt-1">Kuryeler</div>
                                        </div>
                                        <div className="bg-slate-50 p-4 rounded-2xl text-center border border-slate-100">
                                            <div className="text-lg font-black text-slate-800">{bizOrders.length}</div>
                                            <div className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mt-1">Siparişler</div>
                                        </div>
                                        <div className="bg-slate-50 p-4 rounded-2xl text-center border border-slate-100">
                                            <div className="text-lg font-black text-slate-800">{bizProducts.length}</div>
                                            <div className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mt-1">Ürünler</div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {activeTab === 'licenses' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                    <div className="flex justify-between items-center mb-6 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                        <h2 className="text-lg font-black tracking-widest uppercase text-slate-800 flex items-center gap-2">
                            <Key size={22} className="text-blue-600" /> Aktivasyon Kodları
                        </h2>
                        <div className="flex items-center gap-3">
                            {selectedCodes.length > 0 && (
                                <button
                                    onClick={handleBulkDeleteCodes}
                                    className="bg-red-50 text-red-600 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-red-600 hover:text-white transition-colors flex items-center gap-2 border border-red-100"
                                >
                                    <Trash2 size={16} /> SEÇİLENLERİ SİL ({selectedCodes.length})
                                </button>
                            )}
                            <button
                                onClick={handleGenerateCode}
                                disabled={isGenerating}
                                className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {isGenerating ? (
                                    <><div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> KOD ÜRETİLİYOR...</>
                                ) : (
                                    '+ YENİ KOD ÜRET'
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-max">
                                <thead>
                                    <tr className="border-b border-slate-100 bg-slate-50">
                                        <th className="p-5 w-12">
                                            <input
                                                type="checkbox"
                                                className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                                checked={activationCodes.length > 0 && selectedCodes.length === activationCodes.length}
                                                onChange={handleSelectAllCodes}
                                            />
                                        </th>
                                        <th className="p-5 text-[10px] uppercase font-black tracking-widest text-slate-500">Aktivasyon Kodu</th>
                                        <th className="p-5 text-[10px] uppercase font-black tracking-widest text-slate-500">Durum</th>
                                        <th className="p-5 text-[10px] uppercase font-black tracking-widest text-slate-500">Kullanan İşletme</th>
                                        <th className="p-5 text-[10px] uppercase font-black tracking-widest text-slate-500">Üretim Tarihi</th>
                                        <th className="p-5 text-[10px] uppercase font-black tracking-widest text-slate-500">Kullanım Tarihi</th>
                                        <th className="p-5 text-[10px] uppercase font-black tracking-widest text-slate-500 text-right">İşlem</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {activationCodes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(code => (
                                        <tr key={code.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                                            <td className="p-5">
                                                <input
                                                    type="checkbox"
                                                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                                    checked={selectedCodes.includes(code.id)}
                                                    onChange={() => handleSelectCode(code.id)}
                                                />
                                            </td>
                                            <td className="p-5">
                                                <span className="bg-slate-100 text-slate-800 px-3 py-1.5 rounded-lg text-xs font-mono font-bold tracking-wider relative group">
                                                    {code.code}
                                                </span>
                                            </td>
                                            <td className="p-5">
                                                {code.used ? (
                                                    <span className="bg-red-50 text-red-600 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-sm">KULLANILDI</span>
                                                ) : (
                                                    <span className="bg-green-50 text-green-600 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-sm">KULLANIMA UYGUN</span>
                                                )}
                                            </td>
                                            <td className="p-5 text-xs font-mono text-slate-500 font-bold">{code.usedBy || '---'}</td>
                                            <td className="p-5 text-[11px] font-bold text-slate-400">{new Date(code.createdAt).toLocaleString('tr-TR')}</td>
                                            <td className="p-5 text-[11px] font-bold text-slate-400">{code.usedAt ? new Date(code.usedAt).toLocaleString('tr-TR') : '---'}</td>
                                             <td className="p-5 text-right">
                                                 <button
                                                     onClick={() => handleDeleteCode(code.id)}
                                                     className={`p-2 rounded-xl transition-all ${deleteConfirmId === code.id ? 'bg-red-600 text-white shadow-lg' : 'text-slate-400 hover:text-red-600 hover:bg-red-50'}`}
                                                     title="Lisansı Sil"
                                                 >
                                                     <Trash2 size={16} />
                                                 </button>
                                             </td>
                                        </tr>
                                    ))}
                                    {activationCodes.length === 0 && (
                                        <tr>
                                            <td colSpan="7" className="p-10 text-center text-slate-400 font-bold text-sm">
                                                Henüz üretilmiş aktivasyon kodu bulunmuyor.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'users' && (
                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden animate-in fade-in duration-300">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-max">
                            <thead>
                                <tr className="border-b border-slate-100 bg-slate-50">
                                    <th className="p-5 text-[10px] uppercase font-black tracking-widest text-slate-500">UUID</th>
                                    <th className="p-5 text-[10px] uppercase font-black tracking-widest text-slate-500">Rol</th>
                                    <th className="p-5 text-[10px] uppercase font-black tracking-widest text-slate-500">İsim Soyisim</th>
                                    <th className="p-5 text-[10px] uppercase font-black tracking-widest text-slate-500">Kullanıcı Adı</th>
                                    <th className="p-5 text-[10px] uppercase font-black tracking-widest text-slate-500">Bağlı İşletme</th>
                                    <th className="p-5 text-[10px] uppercase font-black tracking-widest text-slate-500">Kayıt Tarihi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {businesses.map((u) => (
                                    <tr key={u.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                                        <td className="p-5 text-[11px] font-mono font-bold text-slate-400">{u.id}</td>
                                        <td className="p-5">
                                            <span className={`text-[9px] px-3 py-1.5 rounded-lg uppercase tracking-widest font-black shadow-sm
                                                ${u.role === 'admin' ? 'bg-blue-50 text-blue-600' :
                                                    u.role === 'courier' ? 'bg-purple-50 text-purple-600' :
                                                        'bg-green-50 text-green-600'}
                                            `}>
                                                {u.role === 'admin' ? 'İŞLETME' : u.role === 'courier' ? 'KURYE' : 'MÜŞTERİ'}
                                            </span>
                                        </td>
                                        <td className="p-5 text-sm font-black text-slate-800">{u.name}</td>
                                        <td className="p-5 text-sm font-bold text-blue-600">@{u.username}</td>
                                        <td className="p-5 text-[11px] font-mono font-bold text-slate-500">{u.businessId || '---'}</td>
                                        <td className="p-5 text-[11px] font-bold text-slate-400">{new Date(u.timestamp || Date.now()).toLocaleString('tr-TR')}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'data' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in duration-300">
                    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 flex flex-col h-[600px]">
                        <h3 className="text-[10px] uppercase font-black tracking-widest text-slate-800 mb-4 flex items-center gap-2 border-b border-slate-100 pb-4">
                            <Database size={16} className="text-blue-600" /> Siparişler Veritabanı
                        </h3>
                        <pre className="flex-1 overflow-auto text-[11px] text-slate-600 font-bold custom-scrollbar p-6 bg-slate-50 rounded-2xl border border-slate-100">
                            {JSON.stringify(orders, null, 2)}
                        </pre>
                    </div>
                    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 flex flex-col h-[600px]">
                        <h3 className="text-[10px] uppercase font-black tracking-widest text-slate-800 mb-4 flex items-center gap-2 border-b border-slate-100 pb-4">
                            <Database size={16} className="text-blue-600" /> Kullanıcılar Veritabanı
                        </h3>
                        <pre className="flex-1 overflow-auto text-[11px] text-slate-600 font-bold custom-scrollbar p-6 bg-slate-50 rounded-2xl border border-slate-100">
                            {JSON.stringify(businesses, null, 2)}
                        </pre>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeveloperPanel;
