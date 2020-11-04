const CACHE_NAME = "Football_League-v2";
let urlsToCache = [
    "/",
    "/index.html",
    "/nav.html",
    "/info_teams.html",
    "/manifest.json",
    "/pages/home.html",
    "/pages/favorite.html",
    "/pages/league_standings.html",
    "/css/materialize.min.css",
    "/js/materialize.min.js",
    "/js/nav.js",
    "/sw.js",
    "/js/api.js",
    "/js/standings.js",
    "/js/main.js",
    "/js/db.js",
    "/js/indexedDB.js",
    "/js/idb.js",
    "/js/team-detail.js",
    "/js/team-saved.js",
    "/js/push.js",
    "/img/icon_1.png",
    "/img/icon_2.png",
    "/img/icon_3.png",
    "/img/icon_4.png",
    "/img/icon_5.png",
    "/img/icon_6.png",
    "/img/icon_7.png",
    "/img/icon_8.png",
    "https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2",
];

self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", function(event) {
    var base_url = "https://api.football-data.org/v2/";

    if (event.request.url.indexOf(base_url) > -1) {
        event.respondWith(
            caches.open(CACHE_NAME).then(function(cache) {
                return fetch(event.request).then(function(response) {
                    cache.put(event.request.url, response.clone());
                    return response;
                });
            })
        );
    } else {
        event.respondWith(
            caches
            .match(event.request, { ignoreSearch: true })
            .then(function(response) {
                return response || fetch(event.request);
            })
        );
    }
});

self.addEventListener("activate", function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log(`ServiceWorker: cache ${cacheName} dihapus`);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener("push", function(event) {
    var body;

    if (event.data) {
        body = event.data.text();
    } else {
        body = "Push Message no payload";
    }

    var options = {
        body: body,
        icon: "img/icon_8.png",
        vibrate: [100, 50, 100],
        data: {
            dataOfArrival: Date.now(),
            primaryKey: 1,
        },
    };
    event.waitUntil(
        self.registration.showNotification("Push Notifikasi", options)
    );
});