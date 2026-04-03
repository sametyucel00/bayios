import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Capacitor } from '@capacitor/core';
import useStore from './store/useStore';
import SubscriptionGuard from './components/SubscriptionGuard';
import Login from './pages/Login';
import IncomingCallDrawer from './components/IncomingCallDrawer';
import NotificationToast from './components/NotificationToast';
import Layout from './layouts/Layout';

import { rtdb } from './lib/firebase';
import { ref, onValue, update } from "firebase/database";
import { installTurkishTextFixer } from './utils/turkishTextFixer';
import { safeGetItem, safeRemoveItem, safeSetItem } from './utils/safeStorage';
import { isDemoUser } from './utils/demoData';

const lazyWithPreload = (factory) => {
  let loadedModule;

  const load = () => {
    if (!loadedModule) {
      loadedModule = factory();
    }
    return loadedModule;
  };

  const Component = lazy(load);
  Component.preload = load;
  return Component;
};

const Dashboard = lazyWithPreload(() => import('./pages/Dashboard'));
const Products = lazyWithPreload(() => import('./pages/Products'));
const Accounting = lazyWithPreload(() => import('./pages/Accounting'));
const Couriers = lazyWithPreload(() => import('./pages/Couriers'));
const Reconciliation = lazyWithPreload(() => import('./pages/Reconciliation'));
const Analytics = lazyWithPreload(() => import('./pages/Analytics'));
const CustomerPortal = lazyWithPreload(() => import('./pages/CustomerPortal'));
const Suppliers = lazyWithPreload(() => import('./pages/Suppliers'));
const Subscribers = lazyWithPreload(() => import('./pages/Subscribers'));
const Finance = lazyWithPreload(() => import('./pages/Finance'));
const Calls = lazyWithPreload(() => import('./pages/Calls'));
const Orders = lazyWithPreload(() => import('./pages/Orders'));
const DailyClosingForm = lazyWithPreload(() => import('./components/DailyClosingForm'));
const CourierPortal = lazyWithPreload(() => import('./pages/CourierPortal'));
const Settings = lazyWithPreload(() => import('./pages/Settings'));
const Expenses = lazyWithPreload(() => import('./pages/Expenses'));
const DeveloperPanel = lazyWithPreload(() => import('./pages/DeveloperPanel'));
const Dealers = lazyWithPreload(() => import('./pages/Dealers'));
const shouldAutoInitNativeServices = false;

const isDebugLoggingEnabled = import.meta.env.DEV && import.meta.env.VITE_DEBUG_LOGS === 'true';

function ScreenFallback() {
  return (
    <div className="min-h-screen bg-slate-100/50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="h-7 w-40 rounded-2xl bg-slate-200/80 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="h-28 rounded-[2rem] bg-white shadow-sm border border-slate-200 animate-pulse" />
          <div className="h-28 rounded-[2rem] bg-white shadow-sm border border-slate-200 animate-pulse" />
          <div className="h-28 rounded-[2rem] bg-white shadow-sm border border-slate-200 animate-pulse" />
        </div>
        <div className="h-[50vh] rounded-[2rem] bg-white shadow-sm border border-slate-200 animate-pulse" />
      </div>
    </div>
  );
}

function ContentFallback() {
  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen w-full overflow-hidden">
      <div className="space-y-6 md:space-y-8">
        <div className="flex flex-col gap-3">
          <div className="h-3 w-24 rounded-full bg-slate-200 animate-pulse" />
          <div className="h-9 w-56 rounded-2xl bg-slate-200 animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="h-28 rounded-[2rem] bg-white border border-slate-200 shadow-sm animate-pulse" />
          <div className="h-28 rounded-[2rem] bg-white border border-slate-200 shadow-sm animate-pulse" />
          <div className="h-28 rounded-[2rem] bg-white border border-slate-200 shadow-sm animate-pulse" />
          <div className="h-28 rounded-[2rem] bg-white border border-slate-200 shadow-sm animate-pulse" />
        </div>
        <div className="h-[55vh] rounded-[2rem] bg-white border border-slate-200 shadow-sm animate-pulse" />
      </div>
    </div>
  );
}

function App() {
  const storeUser = useStore(state => state.currentUser);
  const activeCall = useStore(state => state.activeCall);
  const setActiveCall = useStore(state => state.setActiveCall);
  const clearActiveCall = useStore(state => state.clearActiveCall);
  const initFirestoreSync = useStore(state => state.initFirestoreSync);

  const [currentView, setCurrentView] = useState('dashboard');
  const [rememberHydrated, setRememberHydrated] = useState(false);

  useEffect(() => {
    if (rememberHydrated) return;

    const autoLoginEnabled = safeGetItem('bayios-auto-login') === 'true';
    const rememberedUserRaw = safeGetItem('bayios-remembered-user');

    if (!storeUser?.id && autoLoginEnabled && rememberedUserRaw) {
      try {
        const rememberedUser = JSON.parse(rememberedUserRaw);
        if (rememberedUser?.id && rememberedUser?.role) {
          useStore.getState().setUser(rememberedUser);
        }
      } catch (error) {
        console.warn('Remembered session could not be restored.', error);
        safeRemoveItem('bayios-remembered-user');
        safeRemoveItem('bayios-auto-login');
      }
    }

    setRememberHydrated(true);
  }, [rememberHydrated, storeUser?.id]);

  useEffect(() => {
    if (storeUser?.id && storeUser?.role) {
      initFirestoreSync();
    }
  }, [storeUser?.id, storeUser?.role, initFirestoreSync]);

  useEffect(() => {
    const userRole = storeUser?.role?.toLowerCase();
    if (!userRole || typeof window === 'undefined') return undefined;

    const preloadByRole = {
      developer: [DeveloperPanel],
      courier: [CourierPortal, Orders, Calls],
      customer: [CustomerPortal, Settings],
      admin: [
        Dashboard,
        Orders,
        Products,
        Subscribers,
        Dealers,
        Finance,
        Accounting,
        Calls,
        Expenses,
        Suppliers,
        Couriers,
        Reconciliation,
        Analytics,
        Settings,
        DailyClosingForm,
      ],
    };

    const preloadTargets = preloadByRole[userRole] || [];
    const runPreload = () => {
      preloadTargets.forEach((Component) => {
        Component.preload?.().catch?.(() => {});
      });
    };

    if ('requestIdleCallback' in window) {
      const idleId = window.requestIdleCallback(() => runPreload(), { timeout: 1200 });
      return () => window.cancelIdleCallback?.(idleId);
    }

    const timeoutId = window.setTimeout(runPreload, 180);
    return () => window.clearTimeout(timeoutId);
  }, [storeUser?.role]);

  useEffect(() => {
    const preloadByView = {
      dashboard: [Orders, Products, Subscribers],
      orders: [Subscribers, Products, Calls],
      products: [Orders, Suppliers, Subscribers],
      subscribers: [Orders, Dealers, Calls],
      calls: [Orders, Subscribers],
      finance: [Accounting, Expenses, Reconciliation],
    };

    const targets = preloadByView[currentView] || [];
    if (targets.length === 0) return undefined;

    const timeoutId = window.setTimeout(() => {
      targets.forEach((Component) => {
        Component.preload?.().catch?.(() => {});
      });
    }, 80);

    return () => window.clearTimeout(timeoutId);
  }, [currentView]);

  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      return () => {};
    }
    return installTurkishTextFixer(document.body);
  }, []);

  useEffect(() => {
    if (storeUser?.id) {
      if (isDemoUser(storeUser)) {
        return;
      }

      if (Capacitor.isNativePlatform() && !shouldAutoInitNativeServices) {
        console.warn('Native notification auto-init is disabled for stability.');
        return;
      }

      import('./services/notificationService').then(({ requestNotificationPermission, onMessageListener }) => {
        requestNotificationPermission(storeUser.id);
        onMessageListener().then(payload => {
          if (isDebugLoggingEnabled) {
            console.log("Push notification received in foreground:", payload);
          }
          useStore.getState().addNotification(payload.notification.title + ": " + payload.notification.body, "info");
        });
      }).catch((error) => {
        console.warn('Notification service could not be initialized.', error);
      });
    }
  }, [storeUser?.id]);

  useEffect(() => {
    if (!storeUser) return;

    if (isDemoUser(storeUser)) {
      return;
    }

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

      if (data.phone && String(data.phone).trim() !== "") {
        activePhone = data.phone;
        activeDeviceId = 'default';
        isManualCall = data.manual || false;
      } else {
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

        if (currentActiveCall?.number !== phoneStr) {
          if (isDebugLoggingEnabled) {
            console.log("%c[RTDB CALL]%c New call detected:", "background: #10b981; color: white; padding: 2px 5px; border-radius: 3px;", "", payload);
          }
          setActiveCall(payload);

          const store = useStore.getState();
          const recentCall = store.incomingCalls.find(c => c.number === phoneStr);
          const timeDiff = recentCall ? (new Date() - new Date(recentCall.timestamp)) : 999999;

          if (!recentCall || timeDiff > 30000) {
            store.addIncomingCall(payload);
          }
        }
      }
    }, (error) => {
      console.error("RTDB Listener Error (Permissions?):", error);
      useStore.getState().addNotification("Arama dinleme hatasi! Firebase izinlerini kontrol edin.", "warning");
    });

    return () => unsubscribe();
  }, [storeUser, setActiveCall, clearActiveCall]);

  useEffect(() => {
    const autoBackupEnabled = safeGetItem('bayios-auto-backup-enabled');
    if (autoBackupEnabled !== 'false') {
      const todayString = new Date().toISOString().split('T')[0];
      const lastBackupDate = safeGetItem('bayios-last-backup-date');

      if (lastBackupDate !== todayString) {
        const data = safeGetItem('bayios-storage');
        if (data) {
          safeSetItem('bayios-auto-backup', data);
          safeSetItem('bayios-last-backup-date', todayString);
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

    if (isDemoUser(storeUser)) {
      return;
    }

    let watchId;
    let isCancelled = false;
    const userRole = storeUser.role?.toLowerCase();

    if (Capacitor.isNativePlatform() && !shouldAutoInitNativeServices) {
      console.warn('Native location auto-init is disabled for stability.');
      return () => {};
    }

    if (userRole === 'courier' || userRole === 'admin' || userRole === 'customer') {
      import('./services/locationService').then(async ({ startLocationTracking, stopLocationTracking }) => {
        const resolvedWatchId = await startLocationTracking(storeUser.id, userRole);
        if (isCancelled && resolvedWatchId) {
          stopLocationTracking(resolvedWatchId);
          return;
        }
        watchId = resolvedWatchId;
      }).catch((error) => {
        console.warn('Location tracking could not be initialized.', error);
      });
    }

    return () => {
      isCancelled = true;
      if (watchId) {
        import('./services/locationService').then(({ stopLocationTracking }) => {
          stopLocationTracking(watchId);
        }).catch(() => {});
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
    safeRemoveItem('bayios-auto-login');
    safeRemoveItem('bayios-remembered-user');
    setCurrentView('dashboard');
  };

  const closeActiveCallEverywhere = async () => {
    const businessId = storeUser?.role?.toLowerCase() === 'admin' ? storeUser.id : storeUser?.businessId;

    if (activeCall?.deviceId) {
      useStore.getState().sendDeviceCommand(activeCall.deviceId, 'REJECT_CALL');
    }

    if (businessId) {
      const updates = {
        phone: "",
        manual: false
      };

      if (activeCall?.deviceId) {
        updates[`${activeCall.deviceId}/phone`] = "";
        updates[`${activeCall.deviceId}/manual`] = false;
      }

      try {
        await update(ref(rtdb, `active_calls/${businessId}`), updates);
      } catch (error) {
        console.error("Active call close sync failed:", error);
      }
    }

    clearActiveCall();
  };

  const renderContent = () => {
    if (!currentView) return null;

    if (storeUser?.role?.toLowerCase() === 'customer') {
      switch (currentView) {
        case 'market':
        case 'dashboard':
          return <CustomerPortal user={storeUser} initialTab="market" />;
        case 'my-orders':
        case 'orders':
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
              <h2 className="text-2xl font-bold mb-2">Yapim Asamasinda</h2>
              <p>"{currentView}" modulu yakinda eklenecek.</p>
            </div>
          </div>
        );
    }
  };

  if (!rememberHydrated && (!storeUser || !storeUser.id || !storeUser.role)) {
    return <ScreenFallback />;
  }

  if (!storeUser || !storeUser.id || !storeUser.role) {
    return <Login onLogin={handleLogin} />;
  }

  if (storeUser.role?.toLowerCase() === 'developer') {
    return (
      <Suspense fallback={<ScreenFallback />}>
        <DeveloperPanel onLogout={handleLogout} />
      </Suspense>
    );
  }

  if (storeUser?.role?.toLowerCase() === 'courier') {
    return (
      <Suspense fallback={<ScreenFallback />}>
        <CourierPortal user={storeUser} onLogout={handleLogout} />
      </Suspense>
    );
  }

  return (
    <SubscriptionGuard>
      <Layout
        currentView={currentView}
        setCurrentView={setCurrentView}
        onLogout={handleLogout}
        user={storeUser}
      >
        <Suspense fallback={<ContentFallback />}>
          {renderContent()}
        </Suspense>
      </Layout>
      <IncomingCallDrawer
        isOpen={!!activeCall}
        phone={activeCall?.number}
        deviceId={activeCall?.deviceId}
        isManual={activeCall?.manual}
        onClose={closeActiveCallEverywhere}
      />
      <NotificationToast />
    </SubscriptionGuard>
  );
}

export default App;
