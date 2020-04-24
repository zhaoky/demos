import Vue from 'vue';
import Vuex from 'Vuex';

Vue.use(Vuex);

const Counter = {
    template: `<div>
                <div>countNum:{{ countNum }}</div>
                <div>week:{{ week }}</div>
                <div>weekFn:{{ weekFn }}</div>
                <div>moduleAState:{{ moduleAState }}</div>
                <div>moduleAge:{{ moduleAge }}</div>
              </div>`,
    computed: {
        countNum() {
            return this.$store.state.count;
        },
        week() {
            return this.$store.getters.weekDate;
        },
        weekFn() {
            return this.$store.getters.weekDateFn(5);
        },
        moduleAState() {
            return this.$store.state.a.age;
        },
        moduleAge() {
            return this.$store.getters['b/moduleBGetters'];
        },
    },
};
const store = new Vuex.Store({
    state: {
        count: 1,
    },
    strict: true,
    getters: {
        weekDate: (state, getters, rootState, rootGetters) => state.count + 1,
        weekDateFn: (state, getters, rootState, rootGetters) => (params) => state.count + params
    },
    mutations: { //同步函数
        increment(state) {  //亦可大写常量
            state.count++
        }
    },
    actions: { // 支持异步
        increment(context) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    context.commit('increment');
                    resolve('haha');
                }, 3000);
            });
        }
    },
    modules: {
        a: {
            namespaced: true,
            state: {
                age: 11
            },
            mutations: {
                incrementA(state) {
                    state.age++
                }
            },
            actions: {
                incrementA(context) {
                    context.commit('incrementA');
                }
            },
        },
        b: {
            namespaced: true,
            state: {
                age: 22
            },
            getters: {
                moduleBGetters: (state, getters, rootState, rootGetters) => state.age + 1,
            },
            mutations: {
                incrementB(state) {
                    state.age++
                }
            },
            actions: {
                incrementB: {
                    root: true,
                    handler(namespacedContext, payload) {
                        namespacedContext.commit('incrementB');
                    }
                }
            },
        }
    }
})
store.registerModule('c', {
    state: {
        age: 33
    }
})
new Vue({
    el: '#app',
    // 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
    store,
    components: { Counter },
    template: `
      <div class="app">
        <counter></counter>
        <div @click='plus'>加</div>
      </div>
    `,
    methods: {
        plus() {
            // store.state.count++;
            store.dispatch('increment').then((res) => { console.log(123, res); });
            // store.dispatch('a/incrementA').then((res) => { console.log(123, res); });
            // store.dispatch('incrementB').then((res) => { console.log(123, res); });
        }
    }
})