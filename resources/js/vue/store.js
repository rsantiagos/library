import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
import createPersistedState from 'vuex-persistedstate'

const store = new Vuex.Store({
    state: {
        loading: false,
        page_length: null
    },
    mutations: {
        setPage(state, page){
            state.page_length = page;
        }
    },
    actions: {

    },
    getters: {

    },
    plugins: [
        createPersistedState({ storage: window.sessionStorage })
    ]
});

export default store;
