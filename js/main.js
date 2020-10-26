// REGISTER SERVICE WORKER
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
        navigator.serviceWorker
            .register("/sw.js")
            .then(function() {
                console.log("Service Worker registration is successful");
            })
            .catch(function() {
                console.log("ServiceWorker registration failed");
            });
    });
} else {
    console.log("The browser does not support serviceWorker");
}

// Push Notification

// Periksa fitur Notifikasi API
if ("Notification" in window) {
    requestPermission();
} else {
    console.log("Browser tidak mendukung notifikasi.");
}

// Meminta ijin menggunkan Notifikasi API
function requestPermission() {
    Notification.requestPermission().then(function(result) {
        if (result === "denied") {
            console.log("Fitur Notifikasi tidak dijalankan");
            return;
        } else if (result === "default") {
            console.log("Pengguna menutup kotak dialog notifikation");
            return;
        }

        if ("PushManager" in window) {
            navigator.serviceWorker.getRegistration().then(function(registration) {
                registration.pushManager
                    .subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: urlBase64ToUint8Array(
                            "BKxSEnhNo_jmb_ImsK7qmB3fOX0VXyQDzx7Yeb3LHSVK3KNy44DrTJDeNouGmOSdXyfvBcwSvvly9l517vOYpJM"
                        ),
                    })
                    .then(function(subscribe) {
                        console.log(
                            "Berhasil melakukan subscribe dengan endpoint",
                            subscribe.endpoint
                        );
                        console.log(
                            "Berhasil melakukan subscribe dengan p256dh key: ",
                            btoa(
                                String.fromCharCode.apply(
                                    null,
                                    new Uint8Array(subscribe.getKey("p256dh"))
                                )
                            )
                        );
                        console.log(
                            "Berhasil melakukan subsctibe dengan auth key: ",
                            btoa(
                                String.fromCharCode.apply(
                                    null,
                                    new Uint8Array(subscribe.getKey("auth"))
                                )
                            )
                        );
                    })
                    .catch(function(e) {
                        console.log("Tidak dapat melakukan subscribe");
                    });
            });
        }
    });
}

// generate PublicKey ke Uint8array
function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; i++) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}