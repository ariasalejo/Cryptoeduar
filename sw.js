// Importar Workbox desde CDN
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js');

workbox.setConfig({ debug: false });

workbox.core.skipWaiting(); // Forzar que se active de inmediato
workbox.core.clientsClaim(); // Tomar control de todas las pestañas

// Función para versionar archivos dinámicamente
const getRevisionedAssets = (files) => {
  return files.map((file) => ({
    url: file,
    revision: `${Date.now()}`, // Forzamos que siempre use la última versión
  }));
};

// Precaching de archivos estáticos importantes
const PRECACHE_FILES = getRevisionedAssets([
  // HTML
  '/index.html',
  '/dashboard.html',
  '/cursos.html',
  '/blog.html',
  '/herramientas.html',
  '/mercado.html',
  '/contacto.html',

  // CSS
  '/assets/css/index.css',
  '/assets/css/dashboard.css',
  '/assets/css/cursos.css',
  '/assets/css/mercado.css',
  '/assets/css/blog.css',
  '/assets/css/herramientas.css',
  '/assets/css/contacto.css',

  // JS
  '/assets/js/index.js',
  '/assets/js/dashboard.js',
  '/assets/js/cursos.js',
  '/assets/js/mercado.js',
  '/assets/js/blog.js',
  '/assets/js/herramientas.js',
  '/assets/js/contacto.js',

  // Imágenes
  '/assets/images/logo.png',
]);

workbox.precaching.precacheAndRoute(PRECACHE_FILES);

// Cache dinámico para las APIs de CoinGecko
workbox.routing.registerRoute(
  ({ url }) => url.origin.includes('api.coingecko.com'),
  new workbox.strategies.NetworkFirst({
    cacheName: 'coingecko-api',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 30,
        maxAgeSeconds: 300, // 5 minutos
      }),
    ],
  })
);

// Cache dinámico para NewsAPI
workbox.routing.registerRoute(
  ({ url }) => url.origin.includes('newsapi.org'),
  new workbox.strategies.NetworkFirst({
    cacheName: 'news-api',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 30,
        maxAgeSeconds: 600, // 10 minutos
      }),
    ],
  })
);

// Imágenes: carga rápida
workbox.routing.registerRoute(
  ({ request }) => request.destination === 'image',
  new workbox.strategies.CacheFirst({
    cacheName: 'images',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 604800, // 1 semana
      }),
    ],
  })
);

// Recursos estáticos (CSS, JS, fuentes): respuesta rápida, actualiza en segundo plano
workbox.routing.registerRoute(
  ({ request }) =>
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'font',
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'static-resources',
  })
);

// Limpieza automática de cachés antiguos (opcional pero recomendable)
self.addEventListener('activate', (event) => {
  const currentCaches = ['coingecko-api', 'news-api', 'images', 'static-resources'];
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((cacheName) => !currentCaches.includes(cacheName))
          .map((cacheName) => caches.delete(cacheName))
      )
    )
  );
});
