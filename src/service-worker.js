importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

workbox.core.setCacheNameDetails({prefix: "mngsav"});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'saveDB') {
    console.log("Saving to DB...")
    // Opening a database for app's data
    var db;
    var req = indexedDB.open("mngsavDB");

    req.onerror = e => console.error(e);

    req.onsuccess = e => {
      db = e.target.result;
      var state = event.data.data;
      var sectionStore = db.transaction("sections", "readwrite").objectStore("sections");
      var itemStore = db.transaction("items", "readwrite").objectStore("items");
      var imageStore = db.transaction("images", "readwrite").objectStore("images");

      sectionStore.clear();
      itemStore.clear();
      imageStore.clear();

      for (var i in state.data) {
        var section = state.data[i];
        sectionStore.put({
          name: section.name
        });

        for (var x in section.cards) {
          var card = section.cards[x]
          var item = {
            ...card,
            section: section.name
          };
          delete item.image;
          delete item.id;
          itemStore.put(item);
          imageStore.put({
            data: card.image
          });
        }
      }
      db.close();
      console.log("Saved to DB.")
    }
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