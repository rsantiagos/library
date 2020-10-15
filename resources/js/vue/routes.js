import VueRouter from 'vue-router';

let routes = [
    {
        path: '/',
        component : require('./pages/Default').default
    },
    {
        path: '*',
        component : require('./pages/Error').default,
        children: [
            {
                path: '*',
                component: require('./views/404').default
            }
        ]
    }
];

const router = new VueRouter({
    routes,
    // linkActiveClass: 'active',
    mode: 'history',
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