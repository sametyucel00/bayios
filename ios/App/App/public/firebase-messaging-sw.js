importScripts('https://www.gstatic.com/firebasejs/10.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.0.0/firebase-messaging-compat.js');

// Config will be replaced or injected during build, 
// for now we use a dynamic way if possible or placeholders.
// Note: In a real app, these should be your actual production keys.
firebase.initializeApp({
  apiKey: "AIzaSyDVrufUynAnWdA7dBZ7PZjXYK6WcslU9r8",
  authDomain: "nar-rehberi-pro.firebaseapp.com",
  projectId: "nar-rehberi-pro",
  storageBucket: "nar-rehberi-pro.firebasestorage.app",
  messagingSenderId: "712568563076",
  appId: "1:712568563076:web:627257531f8f6a76fe29d1"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/vite.svg'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
