module.exports = {
  globDirectory: 'docs/',
  globPatterns: [
    '**/*.{html,js,css,json,webmanifest,png,jpg,svg}'
  ],
  swDest: 'docs/sw.js',
  runtimeCaching: [
    {
      urlPattern: ({ url }) => url.origin === self.location.origin,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'local-cache',
      },
    },
    {
      urlPattern: ({ url }) => url.origin.includes('coingecko') || url.origin.includes('binance'),
      handler: 'NetworkFirst',
      options: {
        cacheName: 'api-cache',
        networkTimeoutSeconds: 3,
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 60 * 5, // 5 minutos
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    }
  ]
};
