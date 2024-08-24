// Define the cache name and assets to cache
const CACHE_NAME = 'avengers-cache-v1';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/style.css',
    '/image-asset.jpg',
    '/nwle0hefglcb1.jpg',
    '/Chris_Hemsworth_as_Thor.jpg',
    // Add any other assets that you want to cache here
];

// Install event - caching specified assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('[Service Worker] Pre-caching assets');
                return cache.addAll(ASSETS_TO_CACHE);
            })
    );
});

// Fetch event - serve cached assets if available
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(cachedResponse => {
                if (cachedResponse) {
                    console.log('[Service Worker] Serving from cache:', event.request.url);
                    return cachedResponse;
                }
                console.log('[Service Worker] Fetching from network:', event.request.url);
                return fetch(event.request)
                    .catch(() => caches.match('/index.html')); // Serve index.html if fetch fails
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        console.log('[Service Worker] Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
