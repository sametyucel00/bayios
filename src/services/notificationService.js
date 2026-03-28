import { Capacitor } from "@capacitor/core";
import { PushNotifications } from "@capacitor/push-notifications";
import { LocalNotifications } from "@capacitor/local-notifications";
import { db } from "../lib/firebase";
import { doc, setDoc } from "firebase/firestore";

const isNativePlatform = () => Capacitor.isNativePlatform();
let nativePushListenersBound = false;

const saveNotificationToken = async (userId, token, source) => {
    if (!token || !userId) {
        return null;
    }

    try {
        const userRef = doc(db, "users", userId);
        await setDoc(userRef, {
            fcmToken: token,
            notificationsEnabled: true,
            notificationPlatform: source,
        }, { merge: true });
    } catch (err) {
        console.warn("Could not save notification token to Firestore:", err.message);
    }

    return token;
};

const requestNativeNotificationPermission = async (userId) => {
    const pushPermission = await PushNotifications.requestPermissions();
    const localPermission = await LocalNotifications.requestPermissions();

    const pushGranted = pushPermission.receive === "granted";
    const localGranted = localPermission.display === "granted";

    if (!pushGranted) {
        return null;
    }

    if (!nativePushListenersBound) {
        PushNotifications.addListener("registration", async (token) => {
            await saveNotificationToken(userId, token.value, "ios-native");
        });

        PushNotifications.addListener("registrationError", (error) => {
            console.error("Native push registration error:", error);
        });

        nativePushListenersBound = true;
    }

    if (!localGranted) {
        console.warn("Local notifications permission was not granted.");
    }

    await PushNotifications.register();
    return "native-registration-started";
};

const requestWebNotificationPermission = async (userId) => {
    const { messaging } = await import("../lib/firebase");
    const { getToken } = await import("firebase/messaging");
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
        return null;
    }

    const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY
    });

    if (!token) {
        return null;
    }

    return saveNotificationToken(userId, token, "web-fcm");
};

export const requestNotificationPermission = async (userId) => {
    try {
        if (isNativePlatform()) {
            return await requestNativeNotificationPermission(userId);
        }

        return await requestWebNotificationPermission(userId);
    } catch (error) {
        console.error("Notification permission error:", error);
        return null;
    }
};

export const onMessageListener = () =>
    new Promise((resolve) => {
        if (isNativePlatform()) {
            PushNotifications.addListener("pushNotificationReceived", async (notification) => {
                try {
                    await LocalNotifications.schedule({
                        notifications: [
                            {
                                id: Date.now(),
                                title: notification.title || "Yeni bildirim",
                                body: notification.body || "",
                                schedule: { at: new Date(Date.now() + 250) },
                            }
                        ]
                    });
                } catch (error) {
                    console.warn("Local notification schedule failed:", error);
                }

                resolve({
                    notification: {
                        title: notification.title || "Yeni bildirim",
                        body: notification.body || "",
                    },
                    data: notification.data || {},
                });
            });
            return;
        }

        import("firebase/messaging").then(({ onMessage }) => {
            import("../lib/firebase").then(({ messaging }) => {
                onMessage(messaging, (payload) => {
                    resolve(payload);
                });
            });
        });
    });

export const sendPushNotification = async (targetUserId, title, body) => {
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3001";

    try {
        const response = await fetch(`${apiUrl}/api/send-notification`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                targetUserId,
                title,
                body
            })
        });
        return await response.json();
    } catch (error) {
        console.error("Send notification error:", error);
        return { success: false, error: error.message };
    }
};
