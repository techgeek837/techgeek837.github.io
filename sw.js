const staticCacheName = 'site-static-v2';
const assets = [
  '/',
  '/index.html',
  '/js/battery.js',
  '/js/ui.js',
  '/js/covid.js',
  '/js/materialize.min.js',
  '/css/styles.css',
  '/css/covid.css',
  '/css/covid2.css',
  '/css/materialize.min.css',
  '/img/covid.png',
  '/img/battery.png',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  
];

// install event
self.addEventListener('install', evt => {
  // //console.log('service worker installed');
  // evt.waitUntil(
  //   caches.open(staticCacheName).then((cache) => {
  //     console.log('caching shell assets');
  //     cache.addAll(assets);
  //   })
  // );
});

// activate event
self.addEventListener('activate', evt => {
  // //console.log('service worker activated');
  // evt.waitUntil(
  //   caches.keys().then(keys => {
  //     //console.log(keys);
  //     return Promise.all(keys
  //       .filter(key => key !== staticCacheName)
  //       .map(key => caches.delete(key))
  //     );
  //   })
  // );
});

// fetch event
self.addEventListener('fetch', evt => {
  // //console.log('fetch event', evt);
  // evt.respondWith(
  //   caches.match(evt.request).then(cacheRes => {
  //     return cacheRes || fetch(evt.request);
  //   })
  // );
});

