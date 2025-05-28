importScripts("https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyCKA9NCe62zF2KayRcViNNYKspGIwhDy_8",
  authDomain: "volley-analysis.firebaseapp.com",
  projectId: "volley-analysis",
  storageBucket: "volley-analysis.firebasestorage.app",
  messagingSenderId: "774783412597",
  appId: "1:774783412597:web:5b5f848dc4aa3c165c8b3c",
  measurementId: "G-T68K4VE89Q"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  self.registration.showNotification(
    payload.notification.title,
    { body: payload.notification.body }
  );
});
