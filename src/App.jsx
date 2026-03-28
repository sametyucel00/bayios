import React, { useState, useEffect } from 'react';
import useStore from './store/useStore';
import Layout from './layouts/Layout';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Accounting from './pages/Accounting';
import Couriers from './pages/Couriers';
import Reconciliation from './pages/Reconciliation';
import Analytics from './pages/Analytics';
import SubscriptionGuard from './components/SubscriptionGuard';
import CustomerPortal from './pages/CustomerPortal';
import Suppliers from './pages/Suppliers';
import Subscribers from './pages/Subscribers';
import Finance from './pages/Finance';
import Calls from './pages/Calls';
import Orders from './pages/Orders';
import DailyClosingForm from './components/DailyClosingForm';
import CourierPortal from './pages/CourierPortal';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Expenses from './pages/Expenses';
import DeveloperPanel from './pages/DeveloperPanel';
import IncomingCallDrawer from './components/IncomingCallDrawer';
import NotificationToast from './components/NotificationToast';
import Dealers from './pages/Dealers';

import { rtdb } from './lib/firebase';
import { ref, onValue, set } from "firebase/database";
import { updateLocationInFirestore } from './services/firestoreService';
import { installTurkishTextFixer } from './utils/turkishTextFixer';

const isDebugLoggingEnabled = import.meta.env.DEV && import.meta.env.VITE_DEBUG_LOGS === 'true';

function App() {
  const storeUser = useStore(state => state.currentUser);
  const activeCall = useStore(state => state.activeCall);
  const setActiveCall = useStore(state => state.setActiveCall);
  const clearActiveCall = useStore(state => state.clearActiveCall);
  const initFirestoreSync = useStore(state => state.initFirestoreSync);

  const [currentView, setCurrentView] = useState('dashboard');

  useEffect(() => {
    if (storeUser?.id && storeUser?.role) {
      initFirestoreSync();
    }
  }, [storeUser?.id, storeUser?.role, initFirestoreSync]);

  useEffect(() => {
    return installTurkishTextFixer(document.body);
  }, []);

  // Request Notification Permission
  useEffect(() => {
    if (storeUser?.id) {
      import('./services/notificationService').then(({ requestNotificationPermission, onMessageListener }) => {
        requestNotificationPermission(storeUser.id);
        onMessageListener().then(payload => {
          if (isDebugLoggingEnabled) {
            console.log("Push notification received in foreground:", payload);
          }
          // Show local notification or toast if needed
          useStore.getState().addNotification(payload.notification.title + ": " + payload.notification.body, "info");
        });
      });
    }
  }, [storeUser?.id]);

  useEffect(() => {
    if (!storeUser) return;

    const userRole = storeUser.role?.toLowerCase();
    const isStaff = userRole === 'admin' || userRole === 'courier';
    const businessId = userRole === 'admin' ? storeUser.id : storeUser.businessId;
    
    if (!isStaff || !businessId) return;

    const callRef = ref(rtdb, `active_calls/${businessId}`);
    const unsubscribe = onValue(callRef, (snapshot) => {
      const data = snapshot.val();
      const currentActiveCall = useStore.getState().activeCall;
      
      if (isDebugLoggingEnabled) {
        console.log("RTDB Sync - Path:", `active_calls/${businessId}`, "Data:", data);
      }

      if (!data) {
        // Only clear if not a manual call initiated by the user
        if (currentActiveCall && !currentActiveCall.manual) {
           if (isDebugLoggingEnabled) {
             console.log("RTDB: No active call data, clearing local active call");
           }
           clearActiveCall();
        }
        return;
      }

      let activePhone = null;
      let activeDeviceId = null;
      let isManualCall = false;

      // 1. Check if the root data itself has a phone property (Legacy/Direct mode)
      if (data.phone && String(data.phone).trim() !== "") {
        activePhone = data.phone;
        activeDeviceId = 'default';
        isManualCall = data.manual || false;
      } 
      // 2. Check nested devices if no direct phone found
      else {
        for (const [id, deviceData] of Object.entries(data)) {
          if (['businessPhone', 'lastLoginAt', 'lastCallAt', 'phone', 'manual'].includes(id)) continue;
          
          if (deviceData && typeof deviceData === 'object' && deviceData.phone && String(deviceData.phone).trim() !== "") {
            activePhone = deviceData.phone;
            activeDeviceId = id;
            isManualCall = deviceData.manual || false;
            break;
          } else if (typeof deviceData === 'string' && id !== 'businessPhone' && id !== 'lastLoginAt') {
             activePhone = deviceData;
             activeDeviceId = id;
             isManualCall = false;
             break;
          }
        }
      }

      if (!activePhone) {
        // Only clear if not a manual call initiated by the user
        if (currentActiveCall && !currentActiveCall.manual) {
            if (isDebugLoggingEnabled) {
              console.log("RTDB: Resolved active phone is empty, clearing local call.");
            }
            clearActiveCall();
        }
        return;
      }

      if (isDebugLoggingEnabled) {
        console.log("RTDB: Active phone detected ->", activePhone, "Device:", activeDeviceId);
      }

      const phoneStr = String(activePhone).trim();
      const digitCount = (phoneStr.match(/\d/g) || []).length;
      
      const isDemoType = phoneStr === "" || phoneStr === "[call_number]" || 
                        phoneStr.toLowerCase().includes("demo") || 
                        phoneStr.toLowerCase().includes("undefined") ||
                        phoneStr.toLowerCase().includes("null");

      if (isDemoType || digitCount < 5) {
        if (currentActiveCall && !currentActiveCall.manual) clearActiveCall();
      } else {
        const payload = {
          number: phoneStr,
          deviceId: activeDeviceId !== 'default' ? activeDeviceId : null,
          manual: isManualCall 
        };
        
        // If it's a new call (different number), update the store
        if (currentActiveCall?.number !== phoneStr) {
            if (isDebugLoggingEnabled) {
              console.log("%c[RTDB CALL]%c New call detected:", "background: #10b981; color: white; padding: 2px 5px; border-radius: 3px;", "", payload);
            }
            setActiveCall(payload);

            const store = useStore.getState();
            const recentCall = store.incomingCalls.find(c => c.number === phoneStr);
            const timeDiff = recentCall ? (new Date() - new Date(recentCall.timestamp)) : 999999;
            
            if(!recentCall || timeDiff > 30000) {
                store.addIncomingCall(payload);
            }
        }
      }
    }, (error) => {
      console.error("RTDB Listener Error (Permissions?):", error);
      useStore.getState().addNotification("Arama dinleme hatası! Firebase izinlerini kontrol edin.", "warning");
    });

    return () => unsubscribe();
  }, [storeUser, setActiveCall, clearActiveCall]);

  useEffect(() => {
    // Auto Backup logic
    const autoBackupEnabled = localStorage.getItem('bayios-auto-backup-enabled');
    if (autoBackupEnabled !== 'false') { // enabled by default or set to true
      const todayString = new Date().toISOString().split('T')[0];
      const lastBackupDate = localStorage.getItem('bayios-last-backup-date');

      if (lastBackupDate !== todayString) {
        const data = localStorage.getItem('bayios-storage');
        if (data) {
          localStorage.setItem('bayios-auto-backup', data);
          localStorage.setItem('bayios-last-backup-date', todayString);
          if (isDebugLoggingEnabled) {
            console.log("Auto backup created for:", todayString);
          }
        }
      }
    }
  }, []);

  useEffect(() => {
    const savedZoom = storeUser?.settings?.zoomLevel || '100';
    document.body.style.zoom = `${savedZoom}%`;
    if (savedZoom === '75') {
      document.body.classList.add('zoom-75');
    } else {
      document.body.classList.remove('zoom-75');
    }
  }, [storeUser?.settings?.zoomLevel]);

  useEffect(() => {
    if (!storeUser) return;

    let watchId;
    let isCancelled = false;
    const userRole = storeUser.role?.toLowerCase();

    if (userRole === 'courier' || userRole === 'admin' || userRole === 'customer') {
      import('./services/locationService').then(async ({ startLocationTracking, stopLocationTracking }) => {
        const resolvedWatchId = await startLocationTracking(storeUser.id, userRole);
        if (isCancelled && resolvedWatchId) {
          stopLocationTracking(resolvedWatchId);
          return;
        }
        watchId = resolvedWatchId;
      });
    }

    return () => {
      isCancelled = true;
      if (watchId) {
        import('./services/locationService').then(({ stopLocationTracking }) => {
          stopLocationTracking(watchId);
        });
      }
    };
  }, [storeUser?.id, storeUser?.role]);


  useEffect(() => {
    if (storeUser?.role?.toLowerCase() === 'customer' && (currentView === 'dashboard' || currentView === 'orders')) {
      setTimeout(() => setCurrentView('market'), 0);
    }
  }, [storeUser?.role, currentView]);

  const handleLogin = (userData) => {
    useStore.getState().setUser(userData);
  };

  const handleLogout = () => {
    useStore.getState().cleanupListeners();
    useStore.getState().setUser(null);
    useStore.getState().clearData();
    localStorage.removeItem('bayios-auto-login'); // Disable auto-login on manual logout
    setCurrentView('dashboard');
  };

  if (!storeUser || !storeUser.id || !storeUser.role) {
    return <Login onLogin={handleLogin} />;
  }

  if (storeUser.role?.toLowerCase() === 'developer') {
    return <DeveloperPanel onLogout={handleLogout} />;
  }

  const renderContent = () => {
    if (!currentView) return null;

    // Special handling for Customer role to prevent admin view crashes
    if (storeUser?.role?.toLowerCase() === 'customer') {
      switch (currentView) {
        case 'market':
        case 'dashboard': // Fallback for redirected state
          return <CustomerPortal user={storeUser} initialTab="market" />;
        case 'my-orders':
        case 'orders': // Fallback for redirected state
          return <CustomerPortal user={storeUser} initialTab="orders" />;
        case 'settings':
          return <Settings user={storeUser} onLogout={handleLogout} />;
        default:
          return <CustomerPortal user={storeUser} initialTab="market" />;
      }
    }

    switch (currentView) {
      case 'dashboard':
        return <Dashboard user={storeUser} setCurrentView={setCurrentView} />;
      case 'products':
        return <Products user={storeUser} />;
      case 'orders':
        return <Orders user={storeUser} />;
      case 'daily-closing':
        return <DailyClosingForm user={storeUser} />;
      case 'cash':
        return <Accounting user={storeUser} />;
      case 'couriers':
        return <Couriers user={storeUser} />;
      case 'reconciliation':
        return <Reconciliation user={storeUser} />;
      case 'finance':
        return <Finance user={storeUser} />;
      case 'analytics':
        return <Analytics user={storeUser} />;
      case 'subscribers':
        return <Subscribers user={storeUser} />;
      case 'calls':
        return <Calls user={storeUser} />;
      case 'suppliers':
        return <Suppliers user={storeUser} />;
      case 'dealers':
        return <Dealers user={storeUser} />;
      case 'expenses':
        return <Expenses user={storeUser} />;
      case 'settings':
        return <Settings user={storeUser} onLogout={handleLogout} />;
      default:
        return (
          <div className="p-8 flex items-center justify-center h-full">
            <div className="text-center text-slate-400">
              <h2 className="text-2xl font-bold mb-2">Yapım Aşamasında</h2>
              <p>"{currentView}" modülü yakında eklenecek.</p>
            </div>
          </div>
        );
    }
  };

  if (storeUser?.role?.toLowerCase() === 'courier') {
    return <CourierPortal user={storeUser} onLogout={handleLogout} />;
  }

  return (
    <SubscriptionGuard>
      <Layout
        currentView={currentView}
        setCurrentView={setCurrentView}
        onLogout={handleLogout}
        user={storeUser}
      >
        {renderContent()}
      </Layout>
      <IncomingCallDrawer
        isOpen={!!activeCall}
        phone={activeCall?.number}
        deviceId={activeCall?.deviceId}
        isManual={activeCall?.manual}
        onClose={() => {
          const businessId = storeUser?.role?.toLowerCase() === 'admin' ? storeUser.id : storeUser?.businessId;
          if (businessId) {
            // Sadece aktif aramayı temizle, tüm şubeyi değil!
            if (activeCall?.deviceId) {
               set(ref(rtdb, `active_calls/${businessId}/${activeCall.deviceId}`), { phone: "" });
            } else {
               set(ref(rtdb, `active_calls/${businessId}`), { phone: "" });
            }
          }
          clearActiveCall();
        }}
      />
      <NotificationToast />
    </SubscriptionGuard>
  );
}

export default App;
