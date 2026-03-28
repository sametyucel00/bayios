import React, { useState } from 'react';
import { Phone, UserPlus, ShoppingBag, X } from 'lucide-react';
import useStore from '../store/useStore';

const CallPopup = () => {
    const { subscribers, addOrder, addSubscriber } = useStore();
    const [incomingCall, setIncomingCall] = useState(null);
    const [callerData, setCallerData] = useState(null);
    const [isMinimized, setIsMinimized] = useState(false);

    // Simulation helpers
    const triggerFakeCall = () => {
        // Randomly pick a known subscriber or a new number
        const isKnown = Math.random() > 0.3;
        if (isKnown && subscribers.length > 0) {
            const randomSub = subscribers[Math.floor(Math.random() * subscribers.length)];
            setIncomingCall(randomSub.phone);
            setCallerData(randomSub);
        } else {
            const randomNum = `05${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 90) + 10}`;
            setIncomingCall(randomNum);
            setCallerData(null);
        }
        setIsMinimized(false);
    };



    const handleQuickOrder = () => {
        if (!callerData) return;

        const newOrder = {
            subscriberId: callerData.id,
            subscriberName: callerData.name,
            address: callerData.address,
            items: [
                { name: 'Damacana 19L', quantity: 1, price: 100 } // Default quick order
            ],
            total: 100,
            paymentMethod: 'Nakit',
            status: 'Hazırlanıyor'
        };

        addOrder(newOrder);
        setIncomingCall(null);
        useStore.getState().addNotification(`Sipariş Oluşturuldu: ${callerData.name}`, "success");
    };

    const handleNewSubscriber = () => {
        // Simplified for simulation - usually would open a drawer but here just fake it
        const newSub = {
            id: `B-${Date.now().toString().slice(-4)}`,
            name: "Yeni Müşteri (Hızlı Kayıt)",
            phone: incomingCall,
            address: 'Hızlı Kayıt Adresi',
            status: 'Active',
            plan: 'Basic'
        };
        addSubscriber(newSub);
        setCallerData(newSub);
        useStore.getState().addNotification("Yeni abone kaydedildi!", "success");
    };

    const handleClose = () => {
        setIncomingCall(null);
        setCallerData(null);
    };

    if (!incomingCall) {
        return (
            <button
                onClick={triggerFakeCall}
                className="fixed bottom-4 right-4 bg-slate-800 text-white p-3 rounded-full shadow-lg hover:bg-slate-700 transition-all z-50 flex items-center gap-2"
                title="Simulate Fake Call"
            >
                <Phone size={20} className="animate-pulse" />
                <span className="text-xs font-bold">Fake Call</span>
            </button>
        );
    }

    return (
        <div className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${isMinimized ? 'w-16 h-16' : 'w-80'}`}>
            {isMinimized ? (
                <button
                    onClick={() => setIsMinimized(false)}
                    className="w-full h-full bg-green-500 rounded-full flex items-center justify-center text-white shadow-xl animate-bounce"
                >
                    <Phone size={24} />
                </button>
            ) : (
                <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
                    {/* Header */}
                    <div className="bg-slate-900 p-4 text-white flex justify-between items-start">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                                <Phone size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Gelen Arama</p>
                                <h3 className="font-bold text-lg leading-tight">
                                    {callerData ? callerData.name : incomingCall}
                                </h3>
                                {callerData && <p className="text-xs text-slate-300">{callerData.phone}</p>}
                            </div>
                        </div>
                        <button onClick={() => setIsMinimized(true)} className="text-slate-400 hover:text-white">
                            <span className="text-xl font-bold">-</span>
                        </button>
                    </div>

                    {/* Body */}
                    <div className="p-4 bg-slate-50">
                        {callerData ? (
                            <div className="space-y-3">
                                <div className="text-xs bg-white p-2 rounded border border-slate-200">
                                    <span className="font-bold text-slate-700">Adres:</span> {callerData.address}
                                </div>

                                <button
                                    onClick={handleQuickOrder}
                                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold shadow-lg shadow-green-200 flex items-center justify-center gap-2 transition-transform active:scale-95"
                                >
                                    <ShoppingBag size={18} />
                                    Hızlı Sipariş (1 Damacana)
                                </button>
                                <button className="w-full bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 py-2 rounded-xl font-medium text-sm">
                                    Detaylı Sipariş Oluştur
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                <div className="text-center p-4">
                                    <p className="text-slate-600 mb-2">Bu numara kayıtlı değil.</p>
                                    <button
                                        onClick={handleNewSubscriber}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold w-full flex items-center justify-center gap-2"
                                    >
                                        <UserPlus size={18} />
                                        Yeni Abone Kaydet
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="bg-slate-100 p-2 flex justify-between">
                        <button
                            onClick={handleClose}
                            className="flex-1 text-red-500 hover:bg-red-50 py-2 rounded-lg font-medium text-xs flex items-center justify-center gap-1"
                        >
                            <X size={14} /> Reddet
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CallPopup;
