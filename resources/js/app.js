require('./bootstrap');
import store from './vue/store'
import router from './vue/routes'
new Vue({
    el: '#root',
    store,
    router
});

