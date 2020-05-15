import Vue from 'vue';
import { createRouter } from './router/router';
import { createStore } from './store/store';
import { sync } from 'vuex-router-sync';

export function createApp() {
  const router = createRouter();
  const store = createStore();

  sync(store, router);

  const app = new Vue({
    router,
    store,
    template: `
      <div id='app'>
        <div>
          I am the navigation bar
          <router-link to="/foo">Go to foo</router-link>
          <router-link to="/bar">Go to bar</router-link>
        </div>
        <router-view></router-view>
      </div>
      `,
  });
  return { app, router, store };
}
