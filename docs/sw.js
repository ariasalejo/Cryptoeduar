/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-29daacfd'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();

  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "assets/css/main.css",
    "revision": "26bb72976ecc1417df2cdc50c81a1f1b"
  }, {
    "url": "assets/data/courses.json",
    "revision": "dd0f8261e6225c71a193e4c80331c03f"
  }, {
    "url": "assets/images/logo.png",
    "revision": "0d88795834cd0a35392de294244bd4ce"
  }, {
    "url": "assets/js/app.js",
    "revision": "d3fe3e7d2b5ae7ca34963b357cb3d3f0"
  }, {
    "url": "assets/js/app/api.js",
    "revision": "de951464658c7407e402104b8a3aff30"
  }, {
    "url": "assets/js/app/auth.js",
    "revision": "067a1ffd1f885ae50dcec7449cc4ccd2"
  }, {
    "url": "assets/js/bundle.js",
    "revision": "b16a323e521c964965f35aa9ffa0b48d"
  }, {
    "url": "assets/js/charts.js",
    "revision": "a9a69358c9761143f4159b0bf5b78b55"
  }, {
    "url": "assets/js/main.css",
    "revision": "ca12b2d5e80024bc68be539659454d93"
  }, {
    "url": "assets/js/main.js",
    "revision": "bd292130f2c5f1b6557555b311e16775"
  }, {
    "url": "assets/js/mermaid.js",
    "revision": "0575ad8d8e8c0d4a119bd19388cd90b3"
  }, {
    "url": "blog.html",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  }, {
    "url": "Cursos.html",
    "revision": "e44b54c77783053aaae1f2e17008acac"
  }, {
    "url": "custom-sw.js",
    "revision": "c4f4583273bb4d6cc3d72605a73edaf3"
  }, {
    "url": "dashboard.html",
    "revision": "e1cd1049a1f42fc85a4c1a8c0642c5df"
  }, {
    "url": "glosario.html",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  }, {
    "url": "index.html",
    "revision": "779367c6e59734b33ed3fac27811bb8b"
  }, {
    "url": "index.js",
    "revision": "a10393769a0cb4d559ab68bc77a9cd7b"
  }, {
    "url": "logo.png",
    "revision": "b737c6f155ef23b79496ef657e2e43b3"
  }, {
    "url": "manifest.json",
    "revision": "aa00a5aa76323d3e48a3ff973e989f64"
  }, {
    "url": "manifest.webmanifest",
    "revision": "01a97285506e75e3a45d40c807d92b0a"
  }, {
    "url": "Mercado.html",
    "revision": "d4a3656f3cd3f2f40a19793536b66ef4"
  }], {});
  workbox.registerRoute(/^https:\/\/newsapi\.org\/.*/i, new workbox.NetworkFirst({
    "cacheName": "crypto-news-api",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 50,
      maxAgeSeconds: 3600
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    })]
  }), 'GET');
  workbox.registerRoute(/\.(?:png|jpg|jpeg|svg|webp|gif)$/, new workbox.CacheFirst({
    "cacheName": "images-cache",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 100,
      maxAgeSeconds: 2592000
    })]
  }), 'GET');

}));
//# sourceMappingURL=sw.js.map
