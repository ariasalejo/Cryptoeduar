module.exports = {
  globDirectory: "docs/",
  globPatterns: ["**/*.{html,js,css,png,jpg,json}"],
  swDest: "docs/sw.js",
  swSrc: "docs/custom-sw.js", // Usa un SW sin minificación
  clientsClaim: true,
  skipWaiting: true,
};
