// ===== SERVICE WORKER PARA PWA =====
const CACHE_NAME = 'password-generator-v2';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './styles.css',
    './script.js',
    './manifest.json'
];

// ===== INSTALAR SERVICE WORKER =====
self.addEventListener('install', event => {
    console.log('Service Worker instalándose...');
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('Cache abierto');
            return cache.addAll(ASSETS_TO_CACHE);
        }).then(() => {
            console.log('Todos los assets están en caché');
            return self.skipWaiting();
        }).catch(err => {
            console.error('Error durante la instalación:', err);
        })
    );
});

// ===== ACTIVAR SERVICE WORKER =====
self.addEventListener('activate', event => {
    console.log('Service Worker activándose...');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
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
    // Solo manejar solicitudes GET
    if (event.request.method !== 'GET') {
        return;
    }

    event.respondWith(
        caches.match(event.request).then(response => {
            // Retornar del caché si existe
            if (response) {
                console.log('Sirviendo desde caché:', event.request.url);
                return response;
            }

            // Si no está en caché, intentar obtenerlo de la red
            return fetch(event.request).then(response => {
                // No cachear respuestas no exitosas
                if (!response || response.status !== 200 || response.type !== 'basic') {
                    return response;
                }

                // Clonar la respuesta
                const responseToCache = response.clone();

                caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, responseToCache);
                });

                return response;
            }).catch(() => {
                // Si falla la red, intentar un fallback general
                console.log('Solicitud de red fallida:', event.request.url);
                
                // Para solicitudes HTML, retornar la página principal
                if (event.request.headers.get('accept').includes('text/html')) {
                    return caches.match('./index.html');
                }

                // Para otros tipos, retornar error
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

// ===== SINCRONIZACIÓN EN BACKGROUND (OPCIONAL) =====
self.addEventListener('sync', event => {
    if (event.tag === 'sync-data') {
        event.waitUntil(
            // Aquí puedes sincronizar datos cuando vuelva la conexión
            Promise.resolve()
        );
    }
});

// ===== NOTIFICACIONES PUSH (OPCIONAL) =====
self.addEventListener('push', event => {
    const options = {
        body: event.data ? event.data.text() : 'Nueva notificación',
        icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><rect fill="%23CFB53B" width="192" height="192"/><text x="50%" y="50%" font-size="120" fill="%231F2937" text-anchor="middle" dominant-baseline="central">🔐</text></svg>',
        badge: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><rect fill="%23CFB53B" width="192" height="192"/><text x="50%" y="50%" font-size="120" fill="%231F2937" text-anchor="middle" dominant-baseline="central">🔐</text></svg>',
        tag: 'password-generator',
        requireInteraction: false
    };

    event.waitUntil(
        self.registration.showNotification('Generador de Contraseñas', options)
    );
});

// ===== CLICK EN NOTIFICACIÓN =====
self.addEventListener('notificationclick', event => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window' }).then(clientList => {
            for (let i = 0; i < clientList.length; i++) {
                const client = clientList[i];
                if (client.url === '/' && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow('/');
            }
        })
    );
});

console.log('Service Worker registrado exitosamente');
