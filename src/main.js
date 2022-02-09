import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import './assets/tailwind.css'
import Echo from 'laravel-echo';

window.Pusher = require('pusher-js');

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

 
 
window.Echo = new Echo({
  broadcaster: 'pusher',
  key: 'anyKey',
  wsHost: '127.0.0.1',
  wsPort: 6001,
  wssPort: 6001,
  forceTLS: false,
  disableStats: true,
});