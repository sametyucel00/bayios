import React from 'react';
import { X, CheckCircle2, AlertCircle, Info, Bell } from 'lucide-react';
import useStore from '../store/useStore';

const NotificationToast = () => {
    const notifications = useStore(state => state.notifications);
    const removeNotification = useStore(state => state.removeNotification);

    if (notifications.length === 0) return null;

    return (
        <div className="fixed top-4 md:top-auto md:bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:right-6 md:translate-x-0 z-[9999] flex flex-col gap-3 w-[calc(100%-2rem)] max-w-sm pointer-events-none">
            {notifications.map((notification) => (
                <div
                    key={notification.id}
                    className={`
                        pointer-events-auto flex items-center gap-4 p-4 rounded-[1.5rem] shadow-2xl border backdrop-blur-2xl animate-in slide-in-from-top-10 md:slide-in-from-right-10 duration-500
                        ${notification.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-900' :
                            notification.type === 'error' ? 'bg-rose-500/10 border-rose-500/20 text-rose-900' :
                                notification.type === 'info' ? 'bg-blue-500/10 border-blue-500/20 text-blue-900' :
                                    'bg-slate-900/90 border-white/10 text-white'}
                    `}
                >
                    <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
                        notification.type === 'success' ? 'bg-emerald-500 text-white' :
                        notification.type === 'error' ? 'bg-rose-500 text-white' :
                        notification.type === 'info' ? 'bg-blue-500 text-white' :
                        'bg-white/20 text-white'
                    }`}>
                        {notification.type === 'success' && <CheckCircle2 size={18} />}
                        {notification.type === 'error' && <AlertCircle size={18} />}
                        {notification.type === 'info' && <Info size={18} />}
                        {notification.type === 'default' && <Bell size={18} />}
                    </div>

                    <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-black leading-tight tracking-tight">{notification.message}</p>
                    </div>

                    <button
                        onClick={() => removeNotification(notification.id)}
                        className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-black/5 transition-colors"
                    >
                        <X size={16} className="opacity-40" />
                    </button>
                </div>
            ))}
        </div>
    );
};

export default NotificationToast;
