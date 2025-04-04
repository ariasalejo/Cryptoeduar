// service-worker.cjs

// Nombre del caché y archivos que se deben cachear
const CACHE_NAME = 'cryptoeduar-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js',
  '/images/logo.png',
  // Agrega aquí más archivos que quieras cachear
];

// Evento de instalación para cachear archivos
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
