export default {
  globDirectory: './docs/',
  globPatterns: [
    '**/*.{html,js,css,png,jpg,svg,json}'
  ],
  swSrc: './docs/custom-sw.js',
  swDest: './docs/sw.js',
  maximumFileSizeToCacheInBytes: 5 * 1024 * 1024 // 5MB
};
