import { Capacitor } from "@capacitor/core";
import { Geolocation } from "@capacitor/geolocation";
import { updateLocationInFirestore } from "./firestoreService";
import useStore from "../store/useStore";

const isDebugLoggingEnabled = import.meta.env.DEV && import.meta.env.VITE_DEBUG_LOGS === "true";
const isNativePlatform = () => Capacitor.isNativePlatform();

let activeWatchId = null;
let activeTrackingKey = null;

const getStore = () => useStore.getState();

const notifyLocationError = (message) => {
    getStore().addNotification(message, "error");
};

const propagateLocation = (userId, userRole, callbacks, latitude, longitude) => {
    if (isDebugLoggingEnabled) {
        console.log(`Location Acquired: ${latitude}, ${longitude}`);
    }

    Promise.resolve(updateLocationInFirestore(userId, latitude, longitude)).catch((error) => {
        console.warn("Location sync failed:", error);
    });

    if (userRole === "courier") {
        const store = getStore();
        const myActiveOrders = (store.orders || []).filter((order) =>
            (order.courierId === userId || String(order.courier || "").includes(store.currentUser?.name || "")) &&
            (order.status === "Yolda" || order.status === "Kurye Yolda")
        );

        myActiveOrders.forEach((order) => {
            store.updateOrder(order.id, { courierLocation: { lat: latitude, lng: longitude } });
        });
    }

    if (callbacks.onUpdate) {
        callbacks.onUpdate({ lat: latitude, lng: longitude });
    }
};

const handleError = (error) => {
    const code = error?.code ?? "unknown";
    const message = error?.message || "Unknown location error";

    console.warn(`Location Error (${code}): ${message}`);

    if (String(code) === "1" || code === "OS-PLUG-GLOC-0003") {
        notifyLocationError("Konum izni reddedildi. Lutfen cihaz ayarlarindan konuma izin verin.");
    }
};

const requestNativeLocationPermission = async () => {
    const permission = await Geolocation.requestPermissions();
    return permission.location === "granted" || permission.coarseLocation === "granted";
};

export const startLocationTracking = async (userId, userRole, callbacks = {}) => {
    const trackingKey = `${userRole || "unknown"}:${userId || "anonymous"}`;

    if (activeWatchId !== null && activeTrackingKey === trackingKey) {
        return activeWatchId;
    }

    if (activeWatchId !== null) {
        await stopLocationTracking(activeWatchId);
        activeWatchId = null;
    }

    activeTrackingKey = trackingKey;

    const options = {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0
    };

    try {
        if (isNativePlatform()) {
            const granted = await requestNativeLocationPermission();
            if (!granted) {
                notifyLocationError("Konum izni reddedildi. Lutfen cihaz ayarlarindan konuma izin verin.");
                return null;
            }

            const initial = await Geolocation.getCurrentPosition(options);
            propagateLocation(userId, userRole, callbacks, initial.coords.latitude, initial.coords.longitude);

            const watchId = await Geolocation.watchPosition(options, (position, error) => {
                if (error) {
                    handleError(error);
                    return;
                }

                if (!position?.coords) {
                    return;
                }

                propagateLocation(
                    userId,
                    userRole,
                    callbacks,
                    position.coords.latitude,
                    position.coords.longitude
                );
            });

            activeWatchId = watchId;
            return watchId;
        }

        if (!navigator.geolocation) {
            notifyLocationError("Cihaziniz konum ozelligini desteklemiyor.");
            return null;
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => propagateLocation(userId, userRole, callbacks, pos.coords.latitude, pos.coords.longitude),
            handleError,
            options
        );

        const watchId = navigator.geolocation.watchPosition(
            (pos) => propagateLocation(userId, userRole, callbacks, pos.coords.latitude, pos.coords.longitude),
            handleError,
            options
        );

        activeWatchId = watchId;
        return watchId;
    } catch (error) {
        handleError(error);
        return null;
    }
};

export const stopLocationTracking = async (watchId) => {
    if (!watchId) {
        return;
    }

    try {
        if (isNativePlatform()) {
            await Geolocation.clearWatch({ id: String(watchId) });
        } else {
            if (typeof navigator !== "undefined" && navigator.geolocation) {
                navigator.geolocation.clearWatch(watchId);
            }
        }
    } catch (error) {
        console.warn("Location watch cleanup failed:", error);
    }

    if (activeWatchId === watchId) {
        activeWatchId = null;
        activeTrackingKey = null;
    }
};
