importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js');

workbox.setConfig({ debug: false });

workbox.core.skipWaiting();
workbox.core.clientsClaim();

// Archivos precacheados
workbox.precaching.precacheAndRoute([
  // HTMLs
  { url: '/index.html', revision: null },
  { url: '/dashboard.html', revision: null },
  { url: '/cursos.html', revision: null },
  { url: '/blog.html', revision: null },
  { url: '/herramientas.html', revision: null },
  { url: '/mercado.html', revision: null },
  { url: '/contacto.html', revision: null },

  // CSS
  { url: '/assets/css/index.css', revision: null },
  { url: '/assets/css/dashboard.css', revision: null },
  { url: '/assets/css/cursos.css', revision: null },
  { url: '/assets/css/mercado.css', revision: null },
  { url: '/assets/css/blog.css', revision: null },
  { url: '/assets/css/herramientas.css', revision: null },
  { url: '/assets/css/contacto.css', revision: null },

  // JS
  { url: '/assets/js/index.js', revision: null },
  { url: '/assets/js/dashboard.js', revision: null },
  { url: '/assets/js/cursos.js', revision: null },
  { url: '/assets/js/mercado.js', revision: null },
  { url: '/assets/js/blog.js', revision: null },
  { url: '/assets/js/herramientas.js', revision: null },
  { url: '/assets/js/contacto.js', revision: null },

  // Imágenes (puedes agregar más aquí si usas otras)
  { url: '/assets/images/logo.png', revision: null },
]);

// API: CoinGecko
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

// API: NewsAPI
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

// Imágenes
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

// Estilos, fuentes, scripts
workbox.routing.registerRoute(
  ({ request }) =>
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'font',
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'static-resources',
  })
);
