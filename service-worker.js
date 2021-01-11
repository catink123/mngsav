importScripts("/mngsav/precache-manifest.233a7e986a184860bf0058fda476b869.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js", "https://cdnjs.cloudflare.com/ajax/libs/localforage/1.9.0/localforage.min.js");

workbox.core.setCacheNameDetails({prefix: "mngsav"});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'saveDB') {
    // Save the data to the indexedDB
    localforage.setItem("data", event.data.data.data);
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
