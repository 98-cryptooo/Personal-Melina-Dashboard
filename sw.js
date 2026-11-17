// Melina Dashboard: Offline-Unterstützung. Netz zuerst, damit Updates sofort ankommen; ohne Netz aus dem Cache.
// Speichert nur die App-Dateien, niemals Melinas Einträge (die liegen in localStorage).
const CACHE = "melina-v7";
const ASSETS = ["./", "index.html", "app.js", "manifest.webmanifest", "icon-180.png", "icon-192.png", "icon-512.png", "leo.svg", "fonts/manrope.woff2", "fonts/fraunces.woff2"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const r = e.request;
  if (r.method !== "GET" || new URL(r.url).origin !== location.origin) return;
  e.respondWith(
    fetch(r).then(res => {
      if (res && res.ok) { const cp = res.clone(); caches.open(CACHE).then(c => c.put(r, cp)); }
      return res;
    }).catch(() => caches.match(r, { ignoreSearch: true }).then(m => m || (r.mode === "navigate" ? caches.match("index.html") : Response.error())))
  );
});
