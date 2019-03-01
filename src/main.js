import Vue from 'vue'
import { store } from './services/store';
import { router } from './services/router';
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
