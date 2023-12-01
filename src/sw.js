const CACHE_NS = "lindsvg"; // Never change the namespace to be able to clear old versions’ caches
const CACHE_VERSION = __PACKAGE_VERSION__;
const CACHE_NAME = `${CACHE_NS}-v${CACHE_VERSION}`;

let cachedFiles = [
  "/lindsvg/",
  "/lindsvg/branches.svg",
  "/lindsvg/icons.svg",
  "/lindsvg/index.css",
  "/lindsvg/index.html",
  "/lindsvg/index.js",
  "/lindsvg/app-icons/apple-touch-icon.png",
  "/lindsvg/app-icons/doc-icon.png",
  "/lindsvg/app-icons/favicon.svg",
  "/lindsvg/app-icons/icon-192.png",
  "/lindsvg/app-icons/icon-512.png",
  "/lindsvg/app-icons/mask-icon.svg",
  "/lindsvg/app-icons/maskable-icon.png",
];

async function cacheAll() {
  let cache = await caches.open(CACHE_NAME);
  return cache.addAll(cachedFiles);
}

async function cleanup() {
  let cacheKeys = await caches.keys();
  let unusedCacheKeys = cacheKeys.filter((key) => key.startsWith(CACHE_NS) && key !== CACHE_NAME);
  return Promise.all(unusedCacheKeys.map((key) => caches.delete(key)));
}

async function handleRequest(request) {
  let response = await caches.match(request);
  if (response) {
    return response;
  }
  response = await fetch(request);
  if (response?.status !== 200 || response?.type !== "basic") {
    return response;
  }
  let cache = await caches.open(CACHE_NAME);
  cache.put(request, response.clone());
  return response;
}

self.addEventListener("install", (e) => {
  e.waitUntil(cacheAll());
});

self.addEventListener("activate", (e) => {
  e.waitUntil(cleanup());
});

self.addEventListener("fetch", (e) => {
  e.respondWith(handleRequest(e.request));
});

self.addEventListener("message", async ({data, source}) => {
  if (data?.code === "SKIP_WAITING") {
    await self.skipWaiting();
    source.postMessage({code: "SKIP_WAITING_OK"});
  }
});
