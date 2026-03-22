// ===== SERVICE WORKER PARA PORTAL PWA =====
const CACHE_NAME = 'pwa-portal-v1';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './styles.css',
    './script.js'
];

// ===== INSTALAR SERVICE WORKER =====
self.addEventListener('install', event => {
    console.log('Service Worker del Portal instalándose...');
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(ASSETS_TO_CACHE);
        }).then(() => {
            return self.skipWaiting();
        }).catch(err => {
            console.error('Error durante la instalación:', err);
        })
    );
});

// ===== ACTIVAR SERVICE WORKER =====
self.addEventListener('activate', event => {
    console.log('Service Worker del Portal activándose...');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME && cacheName.includes('pwa-portal')) {
                        console.log('Eliminando caché antigua:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            return self.clients.claim();
        })
    );
});

// ===== FETCH CON ESTRATEGIA CACHE FIRST =====
self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET') {
        return;
    }

    event.respondWith(
        caches.match(event.request).then(response => {
            if (response) {
                return response;
            }

            return fetch(event.request).then(response => {
                if (!response || response.status !== 200 || response.type !== 'basic') {
                    return response;
                }

                const responseToCache = response.clone();
                caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, responseToCache);
                });

                return response;
            }).catch(() => {
                if (event.request.headers.get('accept').includes('text/html')) {
                    return caches.match('./index.html');
                }
                return new Response('Offline - Contenido no disponible', {
                    status: 503,
                    statusText: 'Service Unavailable',
                    headers: new Headers({
                        'Content-Type': 'text/plain'
                    })
                });
            });
        })
    );
});

console.log('Service Worker del Portal registrado');
