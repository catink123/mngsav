import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import Vuex from 'vuex';
/* import './registerServiceWorker' */
import wb from "./registerServiceWorker";

Vue.prototype.$workbox = wb;

let db;

Vue.use(Vuex);

/* function remakeObjectStores(db) {
  db.deleteObjectStore("sections");
  db.deleteObjectStore("items");
  db.deleteObjectStore("images");
  db.createObjectStore("sections", { keyPath: "key", autoIncrement: true });
  db.createObjectStore("items", { keyPath: "key", autoIncrement: true });
  db.createObjectStore("images", { keyPath: "key", autoIncrement: true });
} */

const store = new Vuex.Store({
  state: {
    cards: [],
    data: [
      {
        id: 0,
        name: "Default",
        cards: []
      }
    ],
    loading: true
  },
  getters: {
    favourited: state => {
      var returnObject = {
        id: -1,
        name: "Favourited",
        cards: []
      };
      for (var i in state.data) {
        returnObject.cards = returnObject.cards.concat(state.data[i].cards.filter((card) => card.favourited));
      }
      return returnObject
    },
    sections: (state/* , getters */) => {
      var returnList = [];
      // returnList = [getters.favourited].concat(state.data);
      returnList = state.data;
      return returnList;
    },
    // A list of sections for the Section select in Add/Edit Card dialog
    sectionSelect: (state) => {
      var returnList = [];
      for (var i = 0; i < state.data.length; i++) {
        returnList.push({
          text: state.data[i].name,
          value: i
        });
      }
      return returnList
    },
    loading: state => {
      return state.loading
    }
  },
  mutations: {
    addCard(state, payload) {
      // Add a card with the new id defined by card Array's length
      state.data[payload.section].cards.push({
        id: state.data[payload.section].cards.length,
        ...payload.data
      })
    },

    editCard(state, payload) {
      // Remove old data and fill the space with new data
      if (payload.changeSection) {
        state.data[payload.section].cards.push({
          ...state.data[payload.currentSection].cards[payload.id],
          id: state.data[payload.section].cards.length,
          ...payload.newData
        });
        state.data[payload.currentSection].cards.splice(payload.id, 1);
      } else {
        state.data[payload.section].cards.splice(payload.id, 1, {
          ...state.data[payload.section].cards[payload.id],
          ...payload.newData
        })
      }

      // Fix IDs
      for (var x in state.data) {
        state.data[x].id = x;
        for (var y in state.data[x].cards) {
          state.data[x].cards[y].id = y;
        }
      }
    },

    removeCard(state, payload) {
      state.data[payload.section].cards.splice(payload.id, 1);

      // Fix IDs of cards
      var i;
      for (i in state.data[payload.section].cards) {
        state.data[payload.section].cards[i].id = i;
      }
    },

    addSection(state, name) {
      // Add a Section with the new id defined by card Array's length
      state.data.push({
        id: state.data.length,
        name: name,
        cards: []
      });
    },

    editSection(state, payload) {
      // Remove old data and fill the space with new data
      state.data.splice(payload.id, 1, {
        ...state.data[payload.id],
        name: payload.newName
      });

      // Fix IDs of sections
      var i;
      for (i in state.data) {
        state.data[i].id = i;
      }
    },

    removeSection(state, id) {
      state.data.splice(id, 1)

      // Fix IDs of sections
      var i;
      for (i in state.data) {
        state.data[i].id = i;
      }
    },

    saveData(state) {
      /* remakeObjectStores(db); */
      // localStorage.setItem("data", JSON.stringify(state.data))
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
            // key: itemStore.count(),
            ...card,
            section: section.name
          }
          delete item.image;
          delete item.id;
          itemStore.put(item);
          imageStore.put({
            // key: imageStore.count(),
            data: card.image
          });
        }
      }
    },

    loadData(state) {
      // Opening a database for app's data
      var req = indexedDB.open("mngsavDB");

      req.onerror = e => console.error(e);

      req.onupgradeneeded = e => {
        db = e.target.result;

        var sectionStore = db.createObjectStore("sections", { keyPath: "key", autoIncrement: true });
        sectionStore.createIndex("name", "name", { unique: true });

        var itemStore = db.createObjectStore("items", { keyPath: "key", autoIncrement: true });

        itemStore.createIndex("section", "section", { unique: false });
        itemStore.createIndex("title", "title", { unique: false });
        itemStore.createIndex("volume", "volume", { unique: false });
        itemStore.createIndex("chapter", "chapter", { unique: false });
        itemStore.createIndex("link", "link", { unique: false });
        itemStore.createIndex("favourited", "favourited", { unique: false })

        var imageStore = db.createObjectStore("images", { keyPath: "key", autoIncrement: true });
        imageStore.createIndex("data", "data", { unique: false });
      };

      req.onsuccess = e => {
        // If there's old data, set state.data to it and clear localStorage, as we are using indexedDB from now on.
        var potentialOldData = JSON.parse(localStorage.getItem("cards"));
        if (potentialOldData !== null) {
          state.data = potentialOldData;
          localStorage.clear();
        } else {
          db = e.target.result;

          var data = [];
          var sectionStore = db.transaction("sections").objectStore("sections");

          // Add sections and add the correct items to them
          sectionStore.openCursor().onsuccess = e => {
            var cursor = e.target.result;
            if (cursor) {
              var cards = [];

              var sectionName = cursor.value.name;

              var itemStore = db.transaction("items").objectStore("items");
              itemStore.index("section").openCursor(sectionName).onsuccess = e => {
                var itemCursor = e.target.result;
                if (itemCursor) {
                  // Get image with item's key
                  var imageStore = db.transaction("images").objectStore("images");
                  imageStore.openCursor(itemCursor.value.key).onsuccess = e => {
                    var imageCursor = e.target.result;
                    if (imageCursor) {
                      // Compose an object with item data and image that we got
                      var card = {
                        id: cards.length,
                        ...itemCursor.value,
                        image: imageCursor.value.data
                      }
                      delete card.key;
                      // delete card.section;
                      cards.push(card);
                    }
                  }
                  itemCursor.continue();
                } else {
                  // Push the new section object to data array
                  data.push({
                    id: parseInt(data.length),
                    name: sectionName,
                    cards: cards
                  });
                  data.sort((a, b) => {
                    // (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
                    if (a.name.toUpperCase() > b.name.toUpperCase()) {
                      return 1
                    } else if (b.name.toUpperCase() > a.name.toUpperCase()) {
                      return -1
                    } else {
                      return 0
                    }
                  });
                }
              }
              cursor.continue();
            } else {
              // We're done! Set state.data to our composed data object
              if (data.length !== 0) {
                /* data.sort((a, b) => {
                  // (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
                  if (a.name.toUpperCase() > b.name.toUpperCase()) {
                    return 1
                  } else if (b.name.toUpperCase() > a.name.toUpperCase()) {
                    return -1
                  } else {
                    return 0
                  }
                }); */
                state.data = data;
                for (var i in state.data) {
                  state.data[i].id = parseInt(i);
                }
              } else {
                state.data = [{
                  id: 0,
                  name: "Default",
                  cards: []
                }]
              }
              state.loading = false;
            }
          }
        }
      };
    },

    loadDataFromObject(state, data) {
      state.data = data;
    },

    fixIDs(state) {
      for (var x in state.data) {
        state.data[x].id = x;
        for (var y in state.data[x].cards) {
          state.data[x].cards[y].id = y;
        }
      }
    }
  }
})

Vue.config.productionTip = false

new Vue({
  vuetify,
  store: store,
  render: h => h(App),
  created() {
    store.commit("loadData");

    window.addEventListener("beforeunload", () => {
      this.$workbox.messageSW({
        type: 'saveDB',
        data: store.state
      });
      db.close();
    });
  }
}).$mount('#app')
