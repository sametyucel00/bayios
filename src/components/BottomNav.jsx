import React from 'react';
import { LayoutDashboard, ShoppingCart, Plus, Menu, Users } from 'lucide-react';

const BottomNav = ({ currentView, setCurrentView, toggleSidebar, user, isSidebarOpen }) => {
    if (isSidebarOpen) return null;

    const normalizedRole = (user?.role || '').toLowerCase().trim();
    const isAdmin = normalizedRole === 'admin' || user?.email?.includes('admin');

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-white/10 shadow-2xl z-[100] px-6 pt-4 pb-[calc(16px+env(safe-area-inset-bottom))] flex justify-between items-center text-white/60 print:hidden transition-all duration-300">
            {isAdmin ? (
                <>
                    <button
                        onClick={() => setCurrentView('dashboard')}
                        className={`flex flex-col items-center gap-1.5 transition-all ${currentView === 'dashboard' ? 'text-brand-primary scale-110' : 'hover:text-white'}`}
                    >
                        <LayoutDashboard size={22} className={currentView === 'dashboard' ? 'drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]' : ''} />
                        <span className="text-[9px] font-black uppercase tracking-tighter">Panel</span>
                    </button>

                    <button
                        onClick={() => setCurrentView('orders')}
                        className={`flex flex-col items-center gap-1.5 transition-all ${currentView === 'orders' ? 'text-brand-primary scale-110' : 'hover:text-white'}`}
                    >
                        <ShoppingCart size={22} className={currentView === 'orders' ? 'drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]' : ''} />
                        <span className="text-[9px] font-black uppercase tracking-tighter">Sipariş</span>
                    </button>

                    <button
                        onClick={() => setCurrentView('subscribers')}
                        className={`flex flex-col items-center gap-1.5 transition-all ${currentView === 'subscribers' ? 'text-brand-primary scale-110' : 'hover:text-white'}`}
                    >
                        <Users size={22} className={currentView === 'subscribers' ? 'drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]' : ''} />
                        <span className="text-[9px] font-black uppercase tracking-tighter">Aboneler</span>
                    </button>
                </>
            ) : (
                <>
                    <button
                        onClick={() => setCurrentView('market')}
                        className={`flex flex-col items-center gap-1.5 transition-all ${currentView === 'market' ? 'text-brand-primary scale-110' : 'hover:text-white'}`}
                    >
                        <ShoppingCart size={22} className={currentView === 'market' ? 'drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]' : ''} />
                        <span className="text-[9px] font-black uppercase tracking-tighter">Market</span>
                    </button>

                    <button
                        onClick={() => setCurrentView('my-orders')}
                        className={`flex flex-col items-center gap-1.5 transition-all ${currentView === 'my-orders' ? 'text-brand-primary scale-110' : 'hover:text-white'}`}
                    >
                        <LayoutDashboard size={22} className={currentView === 'my-orders' ? 'drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]' : ''} />
                        <span className="text-[9px] font-black uppercase tracking-tighter">SİPARİŞLERİM</span>
                    </button>
                </>
            )}

            <button
                onClick={toggleSidebar}
                className="flex flex-col items-center gap-1.5 hover:text-white transition-all"
            >
                <Menu size={22} />
                <span className="text-[9px] font-black uppercase tracking-tighter">Menü</span>
            </button>
        </div>
    );
};

export default BottomNav;
