module.exports = {
     globDirectory: 'dist/',
     globPatterns: [
       '**/*.{html,js,css,png,jpg}'
     ],
     swDest: 'dist/sw.js',
     runtimeCaching: [{
       urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
       handler: 'CacheFirst',
       options: {
         cacheName: 'images',
         expiration: {
           maxEntries: 10,
         },
       },
     }],
   };
