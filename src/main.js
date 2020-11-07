import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import Vuex from 'vuex';

let db;

/* function getItems(callback) {
  var items = [], itemStore = db.transaction("items", "readonly").objectStore("items");
  itemStore.openCursor().onsuccess = e => {
    var cursor = e.target.result;
    if (cursor) {
      items.push(cursor.value);
      cursor.continue();
    } else {
      callback(items);
    }
  }
}

function addItem(itemData, imageData) {
  db.transaction("items", "readwrite").objectStore("items").put(itemData);
  db.transaction("images", "readwrite").objectStore("images").put(imageData);
}

function removeItem(itemKey) {
  db.transaction("images", "readwrite").objectStore("items").remove(itemKey);
  db.transaction("images", "readwrite").objectStore("images").remove(itemKey);
} */

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    cards: [],
    data: [
      {
        id: 0,
        name: "Default",
        cards: []
      }
    ]
  },
  getters: {
    sectionList: state => {
      var returnList = [];
      for (var i = 0; i < state.data.length; i++) {
        returnList.push({
          text: state.data[i].name,
          value: i
        });
      }
      return returnList
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

        var imageStore = db.createObjectStore("images", { keyPath: "key", autoIncrement: true });
        imageStore.createIndex("data", "data", { unique: false });
      };

      req.onsuccess = e => {
        db = e.target.result;
        console.log("\n");

        /* var potentialOldData = JSON.parse(localStorage.getItem("cards"));
        // var loadedData = JSON.parse(localStorage.getItem("data"));
        
        if (potentialOldData !== null && loadedData === null) {
          state.data = [
            {
              id: 0,
              name: "Default",
              cards: potentialOldData
            }
          ]
          localStorage.removeItem("cards")
        } 
        // If loadedData is null, then we don't have saved data or this is a first start
        if (loadedData !== null) state.data = loadedData; */
        var data = [];
        var sectionStore = db.transaction("sections").objectStore("sections");
        
        sectionStore.openCursor().onsuccess = e => {
          var cursor = e.target.result;
          if (cursor) {
            data.push({
              id: data.length,
              name: cursor.value.name,
              cards: []
            });
            console.log("Section: ")
            console.log(cursor.value);
            cursor.continue();
          } else {
            // Loop through sections and add the correct items
            for (var i in data) {
              // Get item data for that section by querying with it's name
              var itemStore = db.transaction("items").objectStore("items");
              itemStore.index("section").openCursor(data[i].name).onsuccess = e => {
                var itemCursor = e.target.result;
                console.log(itemCursor);
                if (itemCursor) {
                  // Get image with item's key
                  var imageStore = db.transaction("images").objectStore("images");
                  imageStore.openCursor(itemCursor.value.key).onsuccess = e => {
                    var imageCursor = e.target.result;
                    if (imageCursor) {
                      // Compose an object with item data and image that we got
                      var card = {
                        id: data[i].cards.length,
                        ...itemCursor.value,
                        image: imageCursor.value.data
                      }
                      delete card.key;
                      delete card.section;
                      data[i].cards.push(card);
                      console.log("Card: ")
                      console.log(card);
                    }
                  }
                  itemCursor.continue();
                } else {
                  // We're done! Set state.data to our composed data object
                  state.data = data;
                  console.log("Data to load: \n")
                  console.log(data);
                }
              }
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
      store.commit("saveData");
      db.close();
    });
  }
}).$mount('#app')
