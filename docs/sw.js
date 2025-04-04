import { precacheAndRoute } from 'workbox-precaching';

// Inyecta los archivos generados con injectManifest
precacheAndRoute([{"revision":"03097dd16d72a9d4a6d9c29ac4983db5","url":"assets/css/main.css"},{"revision":"0d88795834cd0a35392de294244bd4ce","url":"assets/images/logo.png"},{"revision":"d3fe3e7d2b5ae7ca34963b357cb3d3f0","url":"assets/js/app.js"},{"revision":"de951464658c7407e402104b8a3aff30","url":"assets/js/app/api.js"},{"revision":"067a1ffd1f885ae50dcec7449cc4ccd2","url":"assets/js/app/auth.js"},{"revision":"b16a323e521c964965f35aa9ffa0b48d","url":"assets/js/bundle.js"},{"revision":"20940601fdcc8a9e30d80530d000ea84","url":"assets/js/charts.js"},{"revision":"c42c909c35b365592deaa36b0beaed67","url":"assets/js/main.js"},{"revision":"0575ad8d8e8c0d4a119bd19388cd90b3","url":"assets/js/mermaid.js"},{"revision":"d41d8cd98f00b204e9800998ecf8427e","url":"blog.html"},{"revision":"0dbbeaf04895f767c7e3d04693fc0b76","url":"Cursos.html"},{"revision":"e87f7b6051309c92c892bb6f2ca678e0","url":"custom-sw.js"},{"revision":"d41d8cd98f00b204e9800998ecf8427e","url":"glosario.html"},{"revision":"53337f443e2440a1cd0aad3bd079eaff","url":"index.html"},{"revision":"d49bb11d175c97d387e1794179acf955","url":"index.js"},{"revision":"b737c6f155ef23b79496ef657e2e43b3","url":"logo.png"},{"revision":"d4a3656f3cd3f2f40a19793536b66ef4","url":"Mercado.html"},{"revision":"e6731b10afa4770318dca37847c33c0b","url":"workbox-config.js"}]);

// Puedes añadir más control si quieres
self.addEventListener('fetch', (event) => {
  console.log('Interceptando:', event.request.url);
});
