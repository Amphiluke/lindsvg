const n="lindsvg",s=`${n}-v1.1.4`;let i=["/lindsvg/","/lindsvg/index.html","/lindsvg/app-icons/apple-touch-icon.png","/lindsvg/app-icons/favicon.svg","/lindsvg/app-icons/icon-192.png","/lindsvg/app-icons/icon-512.png","/lindsvg/app-icons/mask-icon.svg","/lindsvg/app-icons/maskable-icon.png","/lindsvg/dist/main.js","/lindsvg/images/icons.svg"];self.addEventListener("install",(n=>{n.waitUntil(async function(){return(await caches.open(s)).addAll(i)}())})),self.addEventListener("activate",(i=>{i.waitUntil(async function(){let i=(await caches.keys()).filter((i=>i.startsWith(n)&&i!==s));return Promise.all(i.map((n=>caches.delete(n))))}())})),self.addEventListener("fetch",(n=>{n.respondWith(async function(n){let i=await caches.match(n);return i||(i=await fetch(n),i&&200===i.status&&"basic"===i.type?((await caches.open(s)).put(n,i.clone()),i):i)}(n.request))}));
