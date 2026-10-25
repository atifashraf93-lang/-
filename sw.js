/* Aashiyana service worker: caches the app so it opens offline. */
var VERSION = 'nanhe-v2';
var SHELL = ['./', 'index.html', 'data.js', 'data2.js', 'data3.js', 'courses.js', 'app.js', 'manifest.webmanifest', 'icon.svg'];
self.addEventListener('install', function (e) { e.waitUntil(caches.open(VERSION).then(function (c) { return c.addAll(SHELL); }).then(function () { return self.skipWaiting(); })); });
self.addEventListener('activate', function (e) { e.waitUntil(caches.keys().then(function (k) { return Promise.all(k.filter(function (x) { return x !== VERSION; }).map(function (x) { return caches.delete(x); })); }).then(function () { return self.clients.claim(); })); });
self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request).then(function (hit) {
    return hit || fetch(e.request).then(function (res) {
      var copy = res.clone(); caches.open(VERSION).then(function (c) { c.put(e.request, copy); }); return res;
    });
  }));
});
