export default {
  globDirectory: "docs/",
  globPatterns: ["**/*.{html,js,css,png,jpg,json}"],
  swDest: "docs/sw.js", // Add this line to specify the output path for the service worker
  swSrc: "docs/custom-sw.js", // Use a SW without minification
