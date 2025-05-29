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

// --- ここから追加するコード ---

// 通知がクリックされたときの処理
self.addEventListener('notificationclick', function(event) {
  console.log('[firebase-messaging-sw.js] Notification click Received.', event.notification);

 // 通知をクリックしたら、その通知は閉じる
 event.notification.close();

 // 通知データからURLを取得する (onBackgroundMessageで設定したやつ)
 const urlToOpen = event.notification.data.url || '/'; // デフォルトはルートパス

 // クライアント(ブラウザのタブやウィンドウ)を探す
  event.waitUntil(
    clients.matchAll({ // clients はサービスワーカーが制御できるブラウザのタブやウィンドウのこと
      type: "window",
      includeUncontrolled: true // 現在サービスワーカーが直接制御していないクライアントも対象に含める
    }).then(function(clientList) {
      // すでに同じURLが開いているタブがあるかチェック
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i];
        // client.url には末尾に / がつく場合とつかない場合があるので、正規化して比較するとより確実
        // ここでは簡単化のため完全一致で比較
        if (client.url === new URL(urlToOpen, self.location.origin).href && 'focus' in client) {
          return client.focus(); // あったら、そのタブを前面に出す
        }
      }
      // 開いているタブがなかったら、新しいタブで指定のURLを開く
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});

// --- 追加するコードはここまで ---