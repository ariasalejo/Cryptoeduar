const CACHE_NAME = "criptoeduar-cache-v1";
const urlsToCache = [
    "/index.html",
    "/Cursos.html",
    "/Mercado.html",
    "/assets/css/main.css",
    "/assets/js/main.js",
    "/assets/js/chart.js",
    "/assets/images/logo.png"
];

// Instalación del Service Worker
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

// Activación y limpieza de caché antigua
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Intercepción de solicitudes
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
const CACHE_NAME = "criptoeduar-cache-v1";
const urlsToCache = [
    "/",
    "/index.html",
    "/cursos.html",
    "/blog.html",
    "/mercado.html",
    "/glosario.html",
    "/assets/css/main.css",
    "/assets/js/main.js",
    "/assets/js/chart.js",
    "/assets/images/banner.png"
];

// 📌 Instalación del Service Worker y almacenamiento en caché
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

// 🚀 Intercepta solicitudes y responde con datos en caché o desde la red
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

// 🔄 Eliminación de cachés antiguas cuando se actualiza el SW
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
