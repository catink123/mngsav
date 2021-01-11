import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import Vuex from "vuex";
import wb from "./registerServiceWorker";
import localforage from "localforage";

Vue.prototype.$workbox = wb;

let db;
localforage.config({
  driver: localforage.INDEXEDDB,
  name: "mngsav",
});

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    cards: [],
    data: [
      {
        id: 0,
        name: "Default",
        cards: [],
      },
    ],
    loading: true,
  },
  getters: {
    favourited: (state) => {
      var returnObject = {
        id: -1,
        name: "Favourited",
        cards: [],
      };
      for (var i in state.data) {
        returnObject.cards = returnObject.cards.concat(
          state.data[i].cards.filter((card) => card.favourited)
        );
      }
      return returnObject;
    },
    sections: (state /* , getters */) => {
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
          value: i,
        });
      }
      return returnList;
    },
    loading: (state) => {
      return state.loading;
    },
  },
  mutations: {
    addCard(state, payload) {
      // Add a card with the new id defined by card Array's length
      state.data[payload.section].cards.push({
        id: state.data[payload.section].cards.length,
        ...payload.data,
      });
    },

    editCard(state, payload) {
      // Remove old data and fill the space with new data
      if (payload.changeSection) {
        state.data[payload.section].cards.push({
          ...state.data[payload.currentSection].cards[payload.id],
          id: state.data[payload.section].cards.length,
          ...payload.newData,
        });
        state.data[payload.currentSection].cards.splice(payload.id, 1);
      } else {
        state.data[payload.section].cards.splice(payload.id, 1, {
          ...state.data[payload.section].cards[payload.id],
          ...payload.newData,
        });
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
        cards: [],
      });
    },

    editSection(state, payload) {
      // Remove old data and fill the space with new data
      state.data.splice(payload.id, 1, {
        ...state.data[payload.id],
        name: payload.newName,
      });

      // Fix IDs of sections
      var i;
      for (i in state.data) {
        state.data[i].id = i;
      }
    },

    removeSection(state, id) {
      state.data.splice(id, 1);

      // Fix IDs of sections
      var i;
      for (i in state.data) {
        state.data[i].id = i;
      }
    },

    saveData(state) {
      // Save the data to the indexedDB
      localforage.setItem("data", state.data);
    },

    loadData(state) {
      // Get the data from the indexedDB
      localforage.getItem("data", (err, val) => {
        if (err) console.error(err);
        // If we have a value, we set state.data to it, if not create a boilerplate state.data
        if (val != null) state.data = val;
        else {
          state.data = [
            {
              id: 0,
              name: "Default",
              cards: [],
            },
          ];
        }
        // Disable the progress bar
        state.loading = false;
      });
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
    },
  },
});

Vue.config.productionTip = false;

new Vue({
  vuetify,
  store: store,
  render: (h) => h(App),
  created() {
    store.commit("loadData");

    window.addEventListener("beforeunload", () => {
      this.$workbox.messageSW({
        type: "saveDB",
        data: store.state,
      });
      db.close();
    });
  },
}).$mount("#app");
