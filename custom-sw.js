import { precacheAndRoute } from 'workbox-precaching';

// Inyecta el manifest precacheado
precacheAndRoute(self.__WB_MANIFEST);

// Nombre del caché y archivos que se deben cachear manualmente
const CACHE_NAME = 'cryptoeduar-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js',
  '/images/logo.png',
  // Agrega aquí más archivos que quieras cachear manualmente
];

// Evento de instalación para cachear archivos adicionales
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Archivos cacheados exitosamente');
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento de activación para actualizar el caché
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Evento de fetch para responder con archivos cacheados
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response; // Devuelve el archivo desde el caché
        }
        return fetch(event.request).then(
          (fetchResponse) => {
            if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type !== 'basic') {
              return fetchResponse;
            }
            const responseToCache = fetchResponse.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
            return fetchResponse;
          }
        );
      })
  );
});

// Maneja eventos de push para notificaciones
self.addEventListener('push', (event) => {
  const data = event.data.json();
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: 'images/logo.png'
  });
});

// Maneja eventos de sincronización en segundo plano
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-background') {
    event.waitUntil(
      // Lógica para la sincronización en segundo plano
      fetch('/sync-endpoint').then((response) => response.json()).then((data) => {
        console.log('Sincronización completada', data);
      })
    );
  }
});
