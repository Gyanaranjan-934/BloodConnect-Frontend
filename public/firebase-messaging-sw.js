/* eslint-disable no-undef */
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);
const firebaseConfig = {
  apiKey: "AIzaSyDwTywZq2hev2S1Btoz6HuxKCDfy2Rt5ho",
  authDomain: "bloodconnect-f84bc.firebaseapp.com",
  projectId: "bloodconnect-f84bc",
  storageBucket: "bloodconnect-f84bc.appspot.com",
  messagingSenderId: "706010935390",
  appId: "1:706010935390:web:e3765c5289f7f9cd0f04cf",
  measurementId: "G-H9CDB822F3",
};
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
