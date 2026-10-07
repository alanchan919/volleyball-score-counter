const CACHE = "voly-v1";
const FILES = ["./", "./index.html", "./voly.css", "./voly.js", "./volypg.jpeg", "./volyppg.jpeg"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(FILES)));
});

self.addEventListener("fetch", (e) => {
  e.respondWith(caches.match(e.request).then((cached) => cached || fetch(e.request)));
});