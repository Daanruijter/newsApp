import Vue from "vue";
import Vuex from "vuex";
import news from "./modules/news";

// Load Vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store({
  modules: { news },
});
