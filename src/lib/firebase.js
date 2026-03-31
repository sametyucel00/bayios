import { initializeApp } from "firebase/app";
import {
    getFirestore,
    initializeFirestore,
    memoryLocalCache,
    persistentLocalCache,
    persistentSingleTabManager
} from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getMessaging } from "firebase/messaging";
import { Capacitor } from "@capacitor/core";

const firebaseDefaults = {
    apiKey: "AIzaSyDVrufUynAnWdA7dBZ7PZjXYK6WcslU9r8",
    authDomain: "nar-rehberi-pro.firebaseapp.com",
    projectId: "nar-rehberi-pro",
    storageBucket: "nar-rehberi-pro.firebasestorage.app",
    messagingSenderId: "712568563076",
    appId: "1:712568563076:web:627257531f8f6a76fe29d1",
    databaseURL: "https://nar-rehberi-pro-default-rtdb.firebaseio.com/"
};

const getRealtimeDatabaseUrl = () => {
    const explicitUrl = import.meta.env.VITE_FIREBASE_DATABASE_URL || firebaseDefaults.databaseURL;
    if (explicitUrl) {
        return explicitUrl;
    }

    const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID || firebaseDefaults.projectId;
    if (!projectId) {
        return undefined;
    }

    return `https://${projectId}-default-rtdb.firebaseio.com`;
};

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || firebaseDefaults.apiKey,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || firebaseDefaults.authDomain,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || firebaseDefaults.projectId,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || firebaseDefaults.storageBucket,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || firebaseDefaults.messagingSenderId,
    appId: import.meta.env.VITE_FIREBASE_APP_ID || firebaseDefaults.appId,
    databaseURL: getRealtimeDatabaseUrl()
};

const app = initializeApp(firebaseConfig);

const createFirestore = () => {
    if (typeof window === 'undefined') {
        return getFirestore(app);
    }

    if (Capacitor.isNativePlatform()) {
        return initializeFirestore(app, {
            cache: memoryLocalCache()
        });
    }

    try {
        return initializeFirestore(app, {
            cache: persistentLocalCache({
                tabManager: persistentSingleTabManager(undefined)
            })
        });
    } catch (error) {
        console.warn('Firestore persistent cache could not be initialized, falling back to memory cache.', error);
        return initializeFirestore(app, {
            cache: memoryLocalCache()
        });
    }
};

export const db = createFirestore();
export const rtdb = getDatabase(app, firebaseConfig.databaseURL);
export const messaging = (() => {
    if (typeof window === 'undefined' || Capacitor.isNativePlatform()) {
        return null;
    }

    try {
        return getMessaging(app);
    } catch (error) {
        console.warn("Firebase messaging could not be initialized.", error);
        return null;
    }
})();

export default app;
