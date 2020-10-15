import axios from "axios";


window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('auth_token');
/**
 * Next we will register the CSRF Token as a common header with Axios so that
 * all outgoing HTTP requests automatically have it attached. This is just
 * a simple convenience so we don't have to attach every token manually.
 */

let token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}


// loading before and after work axios
var loader = null;
window.axios.interceptors.request.use((config) => {
    switch (config.url) { // apis que no se va a aplicar el loading
        case '/api/demo/message':
            break;
        default:
            if (!loader) {
                loader = Vue.$loading.show();
            }
            break;
    }
    return config;
  }, (error) => {
    hideLoader();
    return Promise.reject(error);
  });

window.axios.interceptors.response.use((response) => {
    hideLoader();
    return response;
  }, (error) => {
    hideLoader();
    return Promise.reject(error);
  });

function hideLoader(){
    loader && loader.hide();
    loader = null;
}
