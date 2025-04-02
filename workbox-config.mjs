export default {
  globDirectory: "docs/",
  globPatterns: ["**/*.{html,js,css,png,jpg,json}"],
  swDest: "docs/sw.js",
  swSrc: "docs/custom-sw.js",
  clientsClaim: true,
  skipWaiting: true
};
