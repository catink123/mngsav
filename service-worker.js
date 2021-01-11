importScripts("/mngsav/precache-manifest.aeb9063f333e4b493ad6df36aa00a97c.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js", "https://cdnjs.cloudflare.com/ajax/libs/localforage/1.9.0/localforage.min.js");

localforage.config({
  driver: localforage.INDEXEDDB,
  name: "mngsav"
});

workbox.core.setCacheNameDetails({prefix: "mngsav"});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'saveDB') {
    // Save the data to the indexedDB
    localforage.clear((err) => {
      if (err) console.error(err);
      localforage.setItem("data", event.data.appData);
    });
  }
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
