// CineStream - Service Worker
// Sube el número cuando cambies archivos para forzar la actualización.
const VERSION = 'cinestream-v1';

// Solo la "cáscara" de la app. Los JSON de datos se cachean al usarlos.
const SHELL = [
  './',
  './index.html',
  './menu.js',
  './manifest.json',
  './sources.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(VERSION).then(c =>
      // allSettled: si falta un archivo, no se rompe toda la instalación
      Promise.allSettled(SHELL.map(u => c.add(u)))
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // Tipografías de Google: caché primero (casi nunca cambian)
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(
      caches.match(req).then(hit => hit || fetch(req).then(res => {
        const copia = res.clone();
        caches.open(VERSION).then(c => c.put(req, copia));
        return res;
      }))
    );
    return;
  }

  // Solo archivos de tu propio sitio. Carátulas y reproductores externos
  // (embed69, fastream, etc.) pasan directo, sin caché.
  if (url.origin !== location.origin) return;

  // Red primero: así siempre ves el catálogo actualizado.
  // Si no hay internet, usa lo guardado.
  e.respondWith(
    fetch(req)
      .then(res => {
        if (res.ok) {
          const copia = res.clone();
          caches.open(VERSION).then(c => c.put(req, copia));
        }
        return res;
      })
      .catch(() =>
        caches.match(req).then(hit => hit || (req.mode === 'navigate' ? caches.match('./index.html') : undefined))
      )
  );
});
