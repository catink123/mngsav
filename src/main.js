import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    cards: []
  },
  mutations: {
    addCard(state, data) {
      state.cards.push({
        id: state.cards.length,
        ...data
      })
    },

    editCard(state, payload) {
      state.cards.splice(payload.id, 1, {
        ...state.cards[payload.id],
        ...payload.newData
      })
    },

    removeCard(state, id) {
      state.cards.splice(id, 1);

      // Fix ids of cards
      var i;
      for (i in state.cards) {
        state.cards[i].id = i;
      }
    },

    saveData(state) {
      localStorage.setItem("cards", JSON.stringify(state.cards))
    },

    loadData(state) {
      var loadedData = JSON.parse(localStorage.getItem("cards"));
      
      if (loadedData !== null) state.cards = loadedData;
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
