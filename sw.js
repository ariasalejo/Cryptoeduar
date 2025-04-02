self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("criptoedu-cache").then((cache) => {
      return cache.addAll([
        "/",
        "/index.html",
        "/assets/css/main.css",
        "/assets/js/main.js",
        "/assets/images/logo.png"
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
