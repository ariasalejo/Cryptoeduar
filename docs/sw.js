import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

precacheAndRoute([{"revision":"af8cd287267addbfffa0fd649d4cd418","url":"assets/css/main.css"},{"revision":"dd0f8261e6225c71a193e4c80331c03f","url":"assets/data/courses.json"},{"revision":"0d88795834cd0a35392de294244bd4ce","url":"assets/images/logo.png"},{"revision":"d3fe3e7d2b5ae7ca34963b357cb3d3f0","url":"assets/js/app.js"},{"revision":"de951464658c7407e402104b8a3aff30","url":"assets/js/app/api.js"},{"revision":"067a1ffd1f885ae50dcec7449cc4ccd2","url":"assets/js/app/auth.js"},{"revision":"b16a323e521c964965f35aa9ffa0b48d","url":"assets/js/bundle.js"},{"revision":"a9a69358c9761143f4159b0bf5b78b55","url":"assets/js/charts.js"},{"revision":"5d90d2423c1e03ed7e1aaaa2bddf0e4f","url":"assets/js/main.js"},{"revision":"0575ad8d8e8c0d4a119bd19388cd90b3","url":"assets/js/mermaid.js"},{"revision":"d41d8cd98f00b204e9800998ecf8427e","url":"blog.html"},{"revision":"0dbbeaf04895f767c7e3d04693fc0b76","url":"Cursos.html"},{"revision":"27770f18594fba479322f2c27cf03dca","url":"dashboard.html"},{"revision":"3e833f11a4089d74746a91bf6034b7b4","url":"docs/sw.js"},{"revision":"ce337182115876ba8f392b7fc566046e","url":"docs/workbox-e0f1c7a0.js"},{"revision":"d41d8cd98f00b204e9800998ecf8427e","url":"glosario.html"},{"revision":"fc598924eac3f3a43d23928f8549dcea","url":"index.html"},{"revision":"a10393769a0cb4d559ab68bc77a9cd7b","url":"index.js"},{"revision":"b737c6f155ef23b79496ef657e2e43b3","url":"logo.png"},{"revision":"aa00a5aa76323d3e48a3ff973e989f64","url":"manifest.json"},{"revision":"d4a3656f3cd3f2f40a19793536b66ef4","url":"Mercado.html"},{"revision":"9b1c5d4014901cd3eab6b8f2b8123b06","url":"workbox-c475ee3e.js"}]);

registerRoute(
  ({ url }) => url.pathname.startsWith('/api/'),
  new StaleWhileRevalidate({
    cacheName: 'api-cache',
  })
);
