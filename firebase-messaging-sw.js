// firebase-messaging-sw.js の中身

// Firebaseのライブラリを読み込む（ここでも必要！）
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// さっきメモした firebaseConfig をここにも貼り付ける
const firebaseConfig = {
  apiKey: "AIzaSyCKA9NCe62zF2KayRcViNNYKspGIwhDy_8",
  authDomain: "volley-analysis.firebaseapp.com",
  projectId: "volley-analysis",
  storageBucket: "volley-analysis.firebasestorage.app",
  messagingSenderId: "774783412597",
  appId: "1:774783412597:web:5b5f848dc4aa3c165c8b3c",
  measurementId: "G-T68K4VE89Q"
};

firebase.initializeApp(firebaseConfig); // ここでも初期化！
const messaging = firebase.messaging();

// バックグラウンドでプッシュ通知を受け取ったときの処理
messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  // 通知のタイトルや本文などを設定する
  const notificationTitle = payload.notification.title || '新しいお知らせ';
  const notificationOptions = {
    body: payload.notification.body || 'メッセージがあります。',
    icon: payload.notification.icon || '/default-icon.png' // デフォルトのアイコン
    // 他にも色々オプションがあるよ！ (data, actions など)
  };

  // 通知を表示する！
  return self.registration.showNotification(notificationTitle, notificationOptions);
});