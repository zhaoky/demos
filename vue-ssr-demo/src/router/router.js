import Vue from 'vue';
import Router from 'vue-router';

const Foo = () => import('../components/foo.vue');
const Bar = () => import('../components/bar.vue');
const NoFound = () => import('../components/404.vue');

Vue.use(Router);

export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/foo',
        component: Foo,
      },
      {
        path: '/bar',
        component: Bar,
      },
      {
        path: '*',
        component: NoFound,
      },
    ],
  });
}
