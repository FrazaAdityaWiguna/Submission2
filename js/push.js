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
    endpoint: "https://fcm.googleapis.com/fcm/send/e0K8ZiYaCqU:APA91bH6uPsqw3Z_n16_a5nr8Cjx4MXq_IxPCrsL-1mgZFeigG9piSqFEgNE39l7_M_WgC8N_xHCfmoKNC5Tw9H1ZEsRRc3wbQ_6ZYSNft-pvwujDO4gkAixctGBGuKuqMghgKF1H7hc",
    keys: {
        p256dh: "BJlg/V7SUW/rnJyRYXtomkDXA/mdOAxNd+K0SxlTXz2K+VEd+ly+p6vibRlXVyXub9Czy3bxGbhACrbmco8J8Ns=",
        auth: "RQ7Ta/17Fhf0LzPeFTt6xw==",
    },
};

var payload = "Selamat Aplikasi Anda sudah dapat menerima push notifikasi!";

var options = {
    gcmAPIKey: "215015656581",
    TTL: 60,
};

webPush.sendNotification(pushSubscription, payload, options);