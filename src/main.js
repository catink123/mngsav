import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import Vuex from 'vuex';

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
      localStorage.setItem("data", JSON.stringify(state.data))
    },

    loadData(state) {
      var potentialOldData = JSON.parse(localStorage.getItem("cards"));
      var loadedData = JSON.parse(localStorage.getItem("data"));
      
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
      if (loadedData !== null) state.data = loadedData;
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
    })
  }
}).$mount('#app')
