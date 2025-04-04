const { injectManifest } = require('workbox-build');

injectManifest({
  swSrc: 'src/sw.js',
  swDest: 'docs/sw.js',
  globDirectory: 'docs',
  globPatterns: ['**/*.{html,js,css,png,jpg,svg}'],
}).then(({ count, size }) => {
  console.log(`Precaché exitoso: ${count} archivos - ${size} bytes`);
}).catch((err) => {
  console.error('Error durante la inyección del manifest:', err);
});
