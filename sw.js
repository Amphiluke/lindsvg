const CACHE_NAME = "lindsvg-v1.0.1";
let cachedFiles = [
  "/lindsvg/",
  "/lindsvg/index.html",
  "/lindsvg/app-icons/apple-touch-icon.png",
  "/lindsvg/app-icons/favicon.svg",
  "/lindsvg/app-icons/icon-192.png",
  "/lindsvg/app-icons/icon-512.png",
  "/lindsvg/app-icons/mask-icon.svg",
  "/lindsvg/app-icons/maskable-icon.png",
  "/lindsvg/dist/main.js",
  "/lindsvg/images/icons.svg"
];

async function cacheAll() {
  let cache = await caches.open(CACHE_NAME);
  return cache.addAll(cachedFiles);
}

async function cleanup() {
  let cacheKeys = await caches.keys();
  let unusedCacheKeys = cacheKeys.filter(key => key !== CACHE_NAME);
  return Promise.all(unusedCacheKeys.map(key => caches.delete(key)));
}

async function handleRequest(request) {
  let response = await caches.match(request);
  if (response) {
    return response;
  }
  response = await fetch(request);
  let cache = await caches.open(CACHE_NAME);
  cache.put(request, response.clone());
  return response;
}

self.addEventListener("install", e => {
  e.waitUntil(cacheAll());
});

self.addEventListener("activate", e => {
  e.waitUntil(cleanup());
});

self.addEventListener("fetch", e => {
  e.respondWith(handleRequest(e.request));
});
