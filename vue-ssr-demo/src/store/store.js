import Vue from 'vue';
import Vuex from 'vuex';
import { data } from '../api/index';

Vue.use(Vuex);

export function createStore() {
  return new Vuex.Store({
    state: {
      list: [],
    },
    actions: {
      async fetchList({ commit }) {
        let list = await data.list();
        commit('setList', list.list);
      },
    },
    mutations: {
      setList(state, list) {
        state.list = list;
      },
    },
  });
}
