import React, { useState } from 'react';
import { AlertTriangle, Map, Users, MapPin, ShoppingCart, AlertCircle, XCircle } from 'lucide-react';
import useStore from '../store/useStore';
import GoogleMapTracker from '../components/GoogleMapTracker';
import { normalizeLocation } from '../utils/location';

const Analytics = () => {
    const { subscribers, orders, currentUser } = useStore();
    const [isRiskDrawerOpen, setIsRiskDrawerOpen] = useState(false);
    const [timeFrame, setTimeFrame] = useState('monthly'); // 'monthly', 'weekly'

    // Calculate Stats
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const getWeekNumber = (d) => {
        d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
        d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
        var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
        return weekNo;
    };

    const currentWeek = getWeekNumber(now);

    const filteredOrdersForMap = orders.filter(o => {
        if (o.status !== 'Tamamlandı' || !o.timestamp) return false;
        const orderDate = new Date(o.timestamp);
        if (timeFrame === 'monthly') {
            return orderDate.getMonth() === currentMonth && orderDate.getFullYear() === currentYear;
        } else {
            return getWeekNumber(orderDate) === currentWeek && orderDate.getFullYear() === currentYear;
        }
    });

    const activeRegions = [...new Set(subscribers.map(s => {
        if (typeof s.address !== 'string') return 'Bilinmeyen';
        const parts = s.address.split(' ');
        return parts.length > 0 ? parts[0] : 'Bilinmeyen';
    }))];
    const activeRegionsCount = activeRegions.length;

    const monthlyOrdersCount = orders.filter(o => {
        if (o.status !== 'Tamamlandı' || !o.timestamp) return false;
        const orderDate = new Date(o.timestamp);
        return orderDate.getMonth() === currentMonth && orderDate.getFullYear() === currentYear;
    }).length;

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // For local data, we also check churnRiskList as a fallback/source
    const calculatedRiskyCustomers = subscribers.filter(s => {
        const lastOrder = orders.filter(o => o.customerId === s.id).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];
        if (!lastOrder) return false; // Ignore those with no orders as they might be fresh
        return new Date(lastOrder.timestamp) < thirtyDaysAgo;
    });

    const displayRiskyCustomers = calculatedRiskyCustomers.map(s => {
        const lastOrder = orders.filter(o => o.customerId === s.id).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];
        const daysSinceOrder = Math.floor((new Date() - new Date(lastOrder.timestamp)) / (1000 * 60 * 60 * 24));
        const riskLevel = daysSinceOrder > 60 ? 'Kritik' : daysSinceOrder > 45 ? 'Yüksek' : 'Orta';

        return {
            id: s.id,
            name: s.name,
            lastOrderDate: new Date(lastOrder.timestamp).toLocaleDateString('tr-TR'),
            riskLevel: riskLevel
        };
    });

    const heatmapData = filteredOrdersForMap
        .map(order => {
            const subscriber = subscribers.find(s => s.id === order.customerId);
            return normalizeLocation(order.customerLocation || subscriber?.location);
        })
        .filter(Boolean);

    const riskyCustomersCount = displayRiskyCustomers.length;

    const statsItems = [
        { label: 'Aktif Bölgeler', value: activeRegionsCount, icon: MapPin, color: 'text-blue-600', bg: 'bg-blue-100' },
        { label: 'Sipariş (Bu Ay)', value: monthlyOrdersCount, icon: ShoppingCart, color: 'text-emerald-600', bg: 'bg-emerald-100' },
        { label: 'Riskli Müşteriler', value: riskyCustomersCount, icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-100' },
    ];

    return (
        <div className="p-4 pb-24 md:p-8 md:pb-8 bg-slate-50 min-h-screen w-full overflow-hidden">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-800">Analiz & Raporlar</h1>
                <p className="text-slate-500 text-sm">Sipariş yoğunluğu ve müşteri analizi</p>
            </div>

            {/* Stats Panel */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
                {statsItems.map((item, idx) => (
                    <div key={idx} className="bg-white p-4 lg:p-5 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden flex flex-col hover:shadow-md transition-shadow">
                        <div className={`absolute -right-4 -top-4 w-16 h-16 rounded-full opacity-[0.05] ${item.bg}`}></div>
                        <div className="flex justify-between items-start mb-3 relative z-10">
                            <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-xl flex items-center justify-center shrink-0 ${item.bg}`}>
                                <item.icon className={item.color} size={18} />
                            </div>
                        </div>
                        <div className="flex-1 flex flex-col justify-end relative z-10">
                            <p className="text-[10px] xl:text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1 break-words">{item.label}</p>
                            <h3 className="text-xl sm:text-2xl lg:text-xl xl:text-2xl font-black text-slate-800 break-words leading-none" style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                                {item.value}
                            </h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Heatmap Placeholder */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                            <Map className="text-blue-500" size={20} />
                            Sipariş Yoğunluk Haritası
                        </h2>
                        <select 
                            className="text-xs font-black uppercase tracking-widest border-slate-200 rounded-lg p-2 outline-none focus:border-blue-500 transition-colors"
                            value={timeFrame}
                            onChange={(e) => setTimeFrame(e.target.value)}
                        >
                            <option value="monthly">Bu Ay ({filteredOrdersForMap.length})</option>
                            <option value="weekly">Bu Hafta ({filteredOrdersForMap.length})</option>
                        </select>
                    </div>
                    <div className="w-full h-80 rounded-xl overflow-hidden shadow-inner border border-slate-200">
                        <GoogleMapTracker 
                            className="min-h-0 rounded-xl"
                            heatmapPoints={heatmapData}
                            businessAddress={currentUser?.address || 'İstanbul'} 
                            businessLocation={currentUser?.location}
                        />
                    </div>
                </div>

                {/* Churn Risk List */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                            <AlertTriangle className="text-red-500" size={20} />
                            Riskli Müşteriler
                        </h2>
                        <span className="text-xs font-semibold px-2 py-1 bg-red-100 text-red-600 rounded-full">
                            {riskyCustomersCount} Riskli
                        </span>
                    </div>

                    <div className="space-y-4">
                        {displayRiskyCustomers.slice(0, 5).map((customer) => (
                            <div key={customer.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-500">
                                        <Users size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-800">{customer.name}</h3>
                                        <p className="text-xs text-slate-500">Son Sipariş: {customer.lastOrderDate}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${customer.riskLevel === 'Kritik' ? 'bg-red-100 text-red-600' :
                                        customer.riskLevel === 'Yüksek' ? 'bg-orange-100 text-orange-600' :
                                            'bg-yellow-100 text-yellow-600'
                                        }`}>
                                        {customer.riskLevel} Risk
                                    </span>
                                </div>
                            </div>
                        ))}
                        {displayRiskyCustomers.length === 0 && (
                            <div className="text-center py-6">
                                <p className="text-slate-500 font-medium text-sm">Şu an 30 günden eski siparişi olan riskli bir müşteri bulunmuyor.</p>
                            </div>
                        )}
                    </div>

                    <button onClick={() => setIsRiskDrawerOpen(true)} className="w-full mt-6 py-2 text-sm text-blue-600 font-medium hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors">
                        Tüm Listeyi Gör
                    </button>
                </div>
            </div>

            {/* Risk Drawer */}
            {isRiskDrawerOpen && (
                <div className="fixed inset-0 z-[150] flex justify-end">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setIsRiskDrawerOpen(false)}></div>
                    <div className="relative w-full sm:max-w-xl h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
                        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white/50">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-red-600 text-white rounded-2xl flex items-center justify-center shadow-lg">
                                    <AlertTriangle size={24} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-slate-900 tracking-tight font-display uppercase">Riskli Müşteriler</h3>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Sipariş verimlilik analizi</p>
                                </div>
                            </div>
                            <button onClick={() => setIsRiskDrawerOpen(false)} className="p-3 bg-white rounded-2xl text-slate-400 hover:text-slate-600 shadow-sm transition-colors border border-slate-100">
                                <XCircle size={28} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-10 scrollbar-hide space-y-4">
                            {displayRiskyCustomers.length > 0 ? displayRiskyCustomers.map((customer) => (
                                <div key={customer.id} className="flex items-center justify-between p-6 bg-slate-50 border border-slate-100 rounded-[2rem] hover:border-red-200 hover:bg-red-50/10 transition-all group">
                                    <div className="flex items-center gap-5">
                                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-slate-400 border border-slate-100 group-hover:scale-110 transition-transform shadow-sm">
                                            <Users size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-black text-slate-900 text-sm">{customer.name}</h3>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Son Sipariş: <span className="text-slate-600">{customer.lastOrderDate || 'Bilinmiyor'}</span></p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className={`text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl transition-all ${customer.riskLevel === 'Kritik' ? 'bg-red-100 text-red-600 border border-red-200' :
                                            customer.riskLevel === 'Yüksek' ? 'bg-orange-100 text-orange-600 border border-orange-200' :
                                                'bg-yellow-100 text-yellow-600 border border-yellow-200'
                                            }`}>
                                            {customer.riskLevel || 'RİSKLİ'}
                                        </span>
                                    </div>
                                </div>
                            )) : (
                                <div className="text-center py-20 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-100">
                                    <p className="text-slate-500 font-black text-xs uppercase tracking-widest">Riskli müşteri bulunmuyor.</p>
                                </div>
                            )}
                        </div>

                        <div className="p-8 border-t border-slate-100 bg-slate-50/30">
                            <button
                                onClick={() => setIsRiskDrawerOpen(false)}
                                className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-brand-primary transition-all shadow-xl active:scale-95"
                            >
                                KAPAT
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Analytics;

