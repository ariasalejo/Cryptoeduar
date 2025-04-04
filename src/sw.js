import { precacheAndRoute } from 'workbox-precaching';

// Inyecta los archivos generados con injectManifest
precacheAndRoute(self.__WB_MANIFEST);

// Puedes añadir más control si quieres
self.addEventListener('fetch', (event) => {
  console.log('Interceptando:', event.request.url);
});
