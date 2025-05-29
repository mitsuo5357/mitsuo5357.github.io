// main.js の中身（例）

// さっきメモした firebaseConfig をここに貼り付ける
const firebaseConfig = {
  apiKey: "AIzaSyCKA9NCe62zF2KayRcViNNYKspGIwhDy_8",
  authDomain: "volley-analysis.firebaseapp.com",
  projectId: "volley-analysis",
  storageBucket: "volley-analysis.firebasestorage.app",
  messagingSenderId: "774783412597",
  appId: "1:774783412597:web:5b5f848dc4aa3c165c8b3c",
  measurementId: "G-T68K4VE89Q" // これはなくてもOKな場合もある
};

// Firebaseを初期化する
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging(); // FCMを使うための準備

// 通知の許可を求める関数
function requestPermission() {
  console.log('通知の許可を求めます...');
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      console.log('通知の許可が得られました！');
      // トークンを取得する
      return messaging.getToken({ vapidKey: "BNhhOQew0GMX2K5O24V3044AiDmJdxUFXfKcU-Q6dpDYBMbk2Wlnektg9Fd7a3sv_m2ezyDJXTD5Og3Ibt_MpFY" }); // ★後で説明するVAPIDキー
    } else {
      console.log('通知は許可されませんでした。');
    }
  }).then((currentToken) => {
    if (currentToken) {
      console.log('これがあなたのトークンです: ', currentToken);
      // ★★★このトークンを自分のサーバーに送る処理を書く★★★
      sendTokenToServer(currentToken);
    } else {
      console.log('トークンが取得できませんでした。');
    }
  }).catch((err) => {
    console.log('トークン取得中にエラーが発生しました: ', err);
  });
}

// サーバーにトークンを送る関数の例（ここは自分で作る必要があるよ）
function sendTokenToServer(token) {
  console.log('サーバーにトークンを送信します:', token);
  // 例: fetch API を使ってPOSTリクエストを送る
  // fetch('/api/save-token', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({ token: token }),
  // });
}

// ページが読み込まれたら、許可を求めるボタンを表示したりする
// (例：ボタンがクリックされたら requestPermission() を呼ぶ)
// const permissionButton = document.getElementById('permission-button');
// permissionButton.addEventListener('click', requestPermission);

// main.js の中身（続き）

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/firebase-messaging-sw.js') // 必ずルートパスで指定
    .then(function(registration) {
      console.log('サービスワーカーの登録成功！ Scope: ', registration.scope);
      // FCM にこのサービスワーカーを教える
      firebase.messaging().useServiceWorker(registration);
    }).catch(function(err) {
      console.log('サービスワーカーの登録失敗: ', err);
    });
}