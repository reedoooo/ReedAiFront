// const CACHE_NAME = 'my-cache-v1';
// const URLS_TO_CACHE = ['/', '/index.html']; // Add any other URLs you want to cache by default

// self.addEventListener('install', event => {
//   event.waitUntil(
//     fetch('http://localhost:3001/api/files/list-files')
//       .then(response => response.json())
//       .then(files => {
//         const urlsToCache = files.map(file => file.url);
//         urlsToCache.push(...URLS_TO_CACHE);

//         caches.open(CACHE_NAME).then(cache => {
//           console.log('Opened cache');
//           return cache.addAll(urlsToCache);
//         });
//       })
//       .catch(error => {
//         console.error('Failed to fetch file list:', error);
//       })
//   );
// });

// self.addEventListener('activate', event => {
//   const cacheWhitelist = [CACHE_NAME];
//   event.waitUntil(
//     caches.keys().then(cacheNames => {
//       return Promise.all(
//         cacheNames.map(cacheName => {
//           if (cacheWhitelist.indexOf(cacheName) === -1) {
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   );
// });

// self.addEventListener('fetch', event => {
//   event.respondWith(
//     caches.match(event.request).then(response => {
//       if (response) {
//         return response;
//       }
//       return fetch(event.request).catch(error => {
//         console.error('Fetch failed:', error);
//         return new Response(
//           JSON.stringify({ error: 'Network error occurred' }),
//           { status: 503, headers: { 'Content-Type': 'application/json' } }
//         );
//       });
//     })
//   );
// });
