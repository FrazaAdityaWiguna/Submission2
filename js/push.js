var webPush = require("web-push");

const vapidKeys = {
    publicKey: "BKxSEnhNo_jmb_ImsK7qmB3fOX0VXyQDzx7Yeb3LHSVK3KNy44DrTJDeNouGmOSdXyfvBcwSvvly9l517vOYpJM",
    privateKey: "7il7s-GsHRQLa6Jptcg8DuJkMGnxH2j3Lz6zuhERzwk",
};

webPush.setVapidDetails(
    "mailto:adityafraja12@gmail.com",
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

var pushSubscription = {
    endpoint: "https://fcm.googleapis.com/fcm/send/c8-fGPFvlTg:APA91bFDm3X0jfbjbajtHTVn2YkGNcy13WHgur5Xj_0cMtA8pJUy7CriKjuLcFCRtUbwHzGQwaqmxzC73F-3dxLg502E3PtRhigeD4dhOUOsZZuN3DnVG6TaZU-G7jTeceIfXpwri4ye",
    keys: {
        "p256dh": "BH1ol5gk8SC59MWBz1GI3IrKpeLLcNm81kwNrcNUqZEXjMjNfRsKtbsROMpg90tAixZzirzPv2YD2MyaHdjK6e0=",
        "auth": "4NLt08t7szuWqkcCJg+HNA==",
    },
};

var payload = 'Selamat Aplikasi Anda sudah dapat menerima push notifikasi!'

var options = {
    gcmAPIKey = '215015656581',
    TTL: 60
}

webPush.sendNotification(
    pushSubscription,
    payload,
    options
)