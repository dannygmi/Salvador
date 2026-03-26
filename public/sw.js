const CACHE_NAME = 'spinequest-v1'
const PRECACHE_URLS = [
  '/',
  '/workout',
  '/progress',
  '/settings',
  '/manifest.json',
]

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_URLS))
  )
  self.skipWaiting()
})

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  )
  self.clients.claim()
})

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return
  event.respondWith(
    caches.match(event.request).then(cached => {
      const fetchPromise = fetch(event.request)
        .then(response => {
          if (response.ok) {
            const cloned = response.clone()
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, cloned))
          }
          return response
        })
        .catch(() => cached)
      return cached || fetchPromise
    })
  )
})
