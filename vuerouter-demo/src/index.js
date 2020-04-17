import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
    {
        path: '/foo',
        component: {
            template: '<div>foo</div>',
        }
    },
    {
        path: '/bar',
        component: {
            template: '<div>bar</div>',
            beforeRouteEnter(to, from, next) {
                // 在渲染该组件的对应路由被 confirm 前调用
                // 不！能！获取组件实例 `this`
                // 因为当守卫执行前，组件实例还没被创建
                console.log('beforeRouteEnter', to.fullPath, from.fullPath);
                next((vm) => { console.log(123333, vm) });
            },
            beforeRouteUpdate(to, from, next) {
                // 在当前路由改变，但是该组件被复用时调用
                // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
                // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
                // 可以访问组件实例 `this`
                console.log('beforeRouteUpdate', to.fullPath, from.fullPath);
                next();
            },
            beforeRouteLeave(to, from, next) {
                // 导航离开该组件的对应路由时调用
                // 可以访问组件实例 `this`
                console.log('beforeRouteLeave', to.fullPath, from.fullPath);
                next();
            }
        },
        beforeEnter: (to, from, next) => {
            console.log('路由独享的守卫beforeEnter', to.fullPath, from.fullPath);
            next();
        }
    }
]

const router = new VueRouter({
    routes,
    mode: 'hash'
})

// router 为 this.$router 对象

router.beforeEach((to, from, next) => {
    console.log('全局前置守卫beforeEach', to.fullPath, from.fullPath);
    next();
}); //全局前置守卫
router.beforeResolve((to, from, next) => {
    console.log('全局解析守卫beforeResolve', to.fullPath, from.fullPath);
    next();
}); //全局解析守卫
router.afterEach((to, from) => {
    console.log('全局后置钩子afterEach', to.fullPath, from.fullPath);
}); //全局后置钩子

new Vue({
    el: '#app',
    router,
    mounted() {
        console.log(this.$route, this.$router);
    },
    methods: {
        to() {
            router.push('/bar?name=zky')
            console.log(this.$route, this.$router);
        },
        pop() {
            // history.replaceState({}, '', 'http://localhost:8080/#/bar?name=zz');
            // history.pushState({}, '', 'http://localhost:8080/#/bar?name=zz');
            history.back();
        }
    }
})

window.addEventListener('popstate', function (evt) {
    console.log('popstate', evt);
})

window.addEventListener('hashchange', function (evt) {
    console.log('hashchange', evt);
})