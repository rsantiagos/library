import VueRouter from 'vue-router';

let routes = [
    {
        path: '/',
        component : require('./pages/Default').default,
        children: [
            {
                path: 'newBook',
                name: 'NewBook',
                component: require('./views/NewBook').default
            },
            {
                path: '*',
                name: 'Home',
                component: require('./views/Books').default
            }
        ]
    }
];

const router = new VueRouter({
    // linkActiveClass: 'active',
    mode: 'history',
    routes: routes,
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    }
});

router.beforeEach((to, from, next) => {
    return next();
});

router.afterEach((to, from, next) => {

});

export default router;
