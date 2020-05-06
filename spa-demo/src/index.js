import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/foo',
    component: {
      template: '<div>foo</div>',
    },
  },
  {
    path: '/bar',
    component: {
      template: '<div><div @click="plus" v-text="a"></div><div>{{b}}</div></div>',
      data() {
        return {
          a: 123,
          b: '',
        };
      },
      methods: {
        plus() {
          console.log(1111111);
        },
      },
      mounted() {
        setTimeout(() => {
          this.b = '456';
        }, 3000);
      },
    },
  },
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

var root = new Vue({
  router,
  mounted() {
    document.dispatchEvent(new Event('render-event'));
  },
});
document.addEventListener('DOMContentLoaded', function () {
  root.$mount('#main');
});
