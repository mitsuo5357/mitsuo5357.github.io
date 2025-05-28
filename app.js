// Service Worker を登録する
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/firebase-messaging-sw.js')
    .then(function(registration) {
      console.log('Service Worker registered with scope:', registration.scope);
    }).catch(function(err) {
      console.error('Service Worker registration failed:', err);
    });
}

const firebaseConfig = {
  apiKey: "AIzaSyCKA9NCe62zF2KayRcViNNYKspGIwhDy_8",
  authDomain: "volley-analysis.firebaseapp.com",
  projectId: "volley-analysis",
  storageBucket: "volley-analysis.firebasestorage.app",
  messagingSenderId: "774783412597",
  appId: "1:774783412597:web:5b5f848dc4aa3c165c8b3c",
  measurementId: "G-T68K4VE89Q"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

async function subscribeToNotifications() {
  console.log("通知許可ボタンが押されました！");
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const token = await messaging.getToken({
        vapidKey: "BNhhOQew0GMX2K5O24V3044AiDmJdxUFXfKcU-Q6dpDYBMbk2Wlnektg9Fd7a3sv_m2ezyDJXTD5Og3Ibt_MpFY"
      });
      console.log("取得した通知トークン:", token);
      alert("通知登録が完了しました！\n" + token);
    } else {
      alert("通知が許可されませんでした。");
    }
  } catch (err) {
    console.error("通知登録エラー", err);
    alert("エラーが発生しました：" + err.message);
  }
}
