import React from 'react';
import { Lock, CreditCard } from 'lucide-react';
 
import { subscriptionStatus } from '../services/dataService';

const SubscriptionGuard = ({ children }) => {
    if (subscriptionStatus.status === 'Suspended') {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Lock className="text-red-600" size={32} />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-800 mb-2">Hizmet Erişimi Kısıtlandı</h1>
                    <p className="text-slate-500 mb-8">
                        Abonelik süreniz dolmuştur. Sistemi kullanmaya devam etmek için lütfen ödeme yapınız veya yönetici ile iletişime geçiniz.
                    </p>

                    <div className="bg-slate-50 p-4 rounded-xl mb-6 text-left border border-slate-100">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-slate-500">Mevcut Plan:</span>
                            <span className="font-bold text-slate-800">{subscriptionStatus.plan}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-slate-500">Son Geçerlilik:</span>
                            <span className="font-bold text-red-500">{subscriptionStatus.expiryDate}</span>
                        </div>
                    </div>

                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
                        <CreditCard size={20} />
                        Aboneliği Yenile
                    </button>
                </div>
            </div>
        );
    }

    return children;
};

export default SubscriptionGuard;
