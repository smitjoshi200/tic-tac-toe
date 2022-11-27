//Service Worker
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open('v1').then(function (cache) {
            return cache.addAll([
                '/index.html',
                '/app.js',
                '/style.css',
                'assets/icon/tictactoelogo.png'
            ]);
        })
    )
});

self.addEventListener('fetch', () => console.log("fetch"));