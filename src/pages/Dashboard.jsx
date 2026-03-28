import React, { useState } from 'react';
import { ShoppingCart, Truck, Users, Banknote, Phone, Play, X, Plus, TrendingUp, TrendingDown, Clock, Activity, Package, Building2 } from 'lucide-react';
import QuickSaleDrawer from '../components/QuickSaleDrawer';
import useStore from '../store/useStore';


// eslint-disable-next-line no-unused-vars
const InfoCard = ({ title, value, subtext, icon: Icon, color }) => (
    <div className="premium-card group p-4 relative overflow-hidden transition-all duration-300 hover:scale-[1.02] bg-white">
        <div className={`absolute top-0 right-0 w-24 h-24 -mr-6 -mt-6 rounded-full opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-300 ${color}`}></div>
        <div className="flex items-start justify-between relative z-10">
            <div>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2">{title}</p>
                <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight font-display">{value}</h3>
                </div>
                <div className="flex items-center gap-2 mt-3">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{subtext}</span>
                </div>
            </div>
            <div className={`p-3 rounded-2xl shadow-xl shadow-slate-200 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 bg-slate-50 ${color.replace('bg-', 'text-')}`}>
                <Icon size={20} />
            </div>
        </div>
    </div>
);

const ActivityItem = ({ title, time, type, status }) => (
    <div className="flex items-center gap-5 p-4 rounded-3xl hover:bg-slate-50 transition-all group">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg ${type === 'order' ? 'bg-brand-primary shadow-brand-primary/20' :
            type === 'call' ? 'bg-brand-accent shadow-brand-accent/20' : 'bg-slate-800'
            }`}>
            {type === 'order' ? <ShoppingCart size={20} /> : <Phone size={20} />}
        </div>
        <div className="flex-1">
            <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight group-hover:text-brand-primary transition-colors">{title}</h4>
            <div className="flex items-center gap-2 mt-1">
                <Clock size={12} className="text-slate-300" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{time}</span>
            </div>
        </div>
        <div className="text-right">
            <span className={`text-[9px] font-black px-3 py-1.5 rounded-xl border uppercase tracking-widest ${status === 'success' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                status === 'pending' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                    'bg-slate-50 text-slate-500 border-slate-100'
                }`}>
                {status === 'success' ? 'Tamamlandı' : status === 'pending' ? 'Yolda' : 'Hazırlanıyor'}
            </span>
        </div>
    </div>
);

const Dashboard = ({ user, setCurrentView }) => {
    const { orders, subscribers, products, suppliers, expenses } = useStore();
    const [isQuickSaleDrawerOpen, setIsQuickSaleDrawerOpen] = useState(false);

    // Calculate dynamic stats from all pages
    const today = new Date().toDateString();

    // Core Orders Data
    const todaysOrders = orders.filter(o => new Date(o.timestamp || o.date).toDateString() === today);
    const activeOrdersCount = orders.filter(o => o.status === 'Hazırlanıyor' || o.status === 'Yolda' || o.status === 'Kurye Yolda').length;
    const completedOrdersCount = orders.filter(o => o.status === 'Tamamlandı').length;

    // Revenue Data
    const todaysRevenue = todaysOrders.filter(o => o.status === 'Tamamlandı').reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);

    // Stock Data
    const totalItemsInStock = products.reduce((acc, p) => acc + (p.stock || 0), 0);
    const totalStockValue = products.reduce((acc, p) => acc + ((p.stock || 0) * (p.price || 0)), 0);

    // Suppliers & Debt Data
    const activeSuppliers = suppliers.filter(s => s.status === 'Active').length;
    const totalSupplierDebt = suppliers.reduce((acc, curr) => acc + (curr.balance < 0 ? Math.abs(curr.balance) : 0), 0);
    const totalExpensesDebt = expenses.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0); // Varsayılan olarak tüm giderler, ya da sadece ödenmemiş giderler
    const totalDebt = totalSupplierDebt + totalExpensesDebt;

    return (
        <div className="p-4 md:p-8 bg-slate-50 min-h-screen selection:bg-brand-primary/10 w-full overflow-hidden">
            {/* Upper Section */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 gap-8">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-1.5 h-6 bg-brand-primary rounded-full"></div>
                        <p className="text-brand-primary text-[10px] font-black uppercase tracking-[0.3em]">Yönetim Paneli</p>
                    </div>
                    <h1 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight font-display">Merhaba, {user?.name || 'İşletme'} 👋</h1>
                    <p className="text-xs md:text-sm text-slate-400 font-medium mt-1">İşletmenizin bugünkü performansı oldukça stabil görünüyor.</p>
                </div>

                <div className="flex flex-wrap gap-4 w-full lg:w-auto">
                    <button
                        onClick={() => setIsQuickSaleDrawerOpen(true)}
                        className="flex-1 lg:flex-none flex items-center justify-center gap-3 bg-slate-900 hover:bg-brand-primary text-white px-8 py-4 rounded-[1.5rem] transition-all font-black text-xs uppercase tracking-widest shadow-xl shadow-slate-900/10 active:scale-95"
                    >
                        <Plus size={18} /> HIZLI SATIŞ
                    </button>
                </div>
            </div>

            {/* Top Stat Level (Revenues and Orders) */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-8">
                <InfoCard
                    title="Bugünkü Ciro"
                    value={`₺${todaysRevenue.toLocaleString('tr-TR')} `}
                    subtext="Bugün Tamamlananlardan"
                    icon={Banknote}
                    color="bg-brand-primary"
                />
                <InfoCard
                    title="Aktif Siparişler"
                    value={activeOrdersCount}
                    subtext="Bekleyen / Yolda"
                    icon={ShoppingCart}
                    color="bg-brand-accent"
                />
                <InfoCard
                    title="Kayıtlı Aboneler"
                    value={subscribers.length}
                    subtext="Toplam Müşteri Havuzu"
                    icon={Users}
                    color="bg-emerald-500"
                />
                <InfoCard
                    title="Toplam Sipariş (Tüm Zamanlar)"
                    value={completedOrdersCount}
                    subtext="Tamamlanan"
                    icon={Truck}
                    color="bg-amber-500"
                />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
                {/* Visual Analytics Hub */}
                <div className="xl:col-span-2 space-y-8">
                    <div className="premium-card p-10 bg-slate-900 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-12 text-white/5 group-hover:text-brand-primary/10 transition-all duration-300 group-hover:scale-125">
                            <Activity size={180} />
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em] mb-8">Sipariş Başarı Oranı (Bugün)</h3>
                            <div className="flex flex-col md:flex-row items-end gap-12">
                                <div>
                                    <p className="text-6xl font-black text-white font-display tracking-tighter mb-2">
                                        {todaysOrders.length > 0 ? (
                                            `% ${((todaysOrders.filter(o => o.status === 'Tamamlandı').length / todaysOrders.length) * 100 || 0).toFixed(1)} `
                                        ) : '%0'}
                                    </p>
                                    <p className="text-xs font-black text-brand-primary uppercase tracking-widest">Başarı Oranı</p>
                                </div>
                                <div className="flex-1 grid grid-cols-3 gap-6 w-full">
                                    {[
                                        { label: 'Teslim Edilen', value: todaysOrders.filter(o => o.status === 'Tamamlandı').length, color: 'bg-emerald-500' },
                                        { label: 'Hazırlanıyor / Yolda', value: todaysOrders.filter(o => o.status === 'Hazırlanıyor' || o.status === 'Yolda' || o.status === 'Kurye Yolda').length, color: 'bg-amber-500' },
                                        { label: 'İptal Edilen', value: todaysOrders.filter(o => o.status === 'İptal Edildi').length, color: 'bg-rose-500' }
                                    ].map((stat, i) => (
                                        <div key={i} className="flex flex-col gap-3">
                                            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                                <div className={`h-full ${stat.color} transition-all duration-500`} style={{ width: todaysOrders.length > 0 ? `${(stat.value / todaysOrders.length) * 100}%` : '0%' }}></div>
                                            </div>
                                            <p className="text-[9px] font-black text-white/50 uppercase tracking-widest">{stat.label}</p>
                                            <p className="text-lg font-black text-white font-display">{stat.value}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Secondary Stat Level (Inventory, suppliers etc instead of performance graphs) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <InfoCard
                            title="Top. Depo Stok Değeri"
                            value={`₺${totalStockValue.toLocaleString('tr-TR')} `}
                            subtext={`${totalItemsInStock} Adet Ürün`}
                            icon={Package}
                            color="bg-indigo-500"
                        />
                        <InfoCard
                            title="Toplam Borç"
                            value={`₺${totalDebt.toLocaleString('tr-TR')} `}
                            subtext="Tedarikçi + Giderler"
                            icon={Building2}
                            color="bg-rose-500"
                        />
                    </div>
                </div>

                {/* Right Column: Live Feed */}
                <div className="premium-card flex flex-col">
                    <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-800 shadow-sm border border-slate-100">
                                <Activity size={24} className="text-brand-accent" />
                            </div>
                            <div>
                                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Canlı Akış</h3>
                                <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Son 24 Saatlik Hareket</p>
                            </div>
                        </div>
                        <div className="w-2 h-2 bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/50"></div>
                    </div>

                    <div className="p-4 flex-1 space-y-1 overflow-y-auto scrollbar-hide max-h-[500px]">
                        {orders.length > 0 ? (
                            [...orders].sort((a, b) => new Date(b.timestamp || b.date) - new Date(a.timestamp || a.date)).slice(0, 10).map((order) => (
                                <ActivityItem
                                    key={order.id}
                                    title={order.customer}
                                    time={new Date(order.timestamp || order.date).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                                    type="order"
                                    status={order.status === 'Tamamlandı' ? 'success' : order.status === 'İptal Edildi' ? 'error' : (order.status === 'Yolda' || order.status === 'Kurye Yolda') ? 'pending' : 'process'}
                                />
                            ))
                        ) : (
                            <div className="py-20 text-center">
                                <p className="text-xs font-black text-slate-300 uppercase tracking-widest">Henüz Hareket Yok</p>
                            </div>
                        )}
                    </div>

                    <div className="p-6 bg-slate-50/50 border-t border-slate-50">
                        <button 
                            onClick={() => setCurrentView('orders')}
                            className="w-full py-4 text-[10px] font-black text-slate-400 hover:text-brand-primary transition-colors uppercase tracking-widest"
                        >
                            BÜTÜN KAYITLARI GÖRÜNTÜLE
                        </button>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <QuickSaleDrawer isOpen={isQuickSaleDrawerOpen} onClose={() => setIsQuickSaleDrawerOpen(false)} />
        </div>
    );
};

export default Dashboard;
