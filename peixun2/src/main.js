import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Rate } from 'vant'

Vue.use(Rate);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  // template:  `<van-rate></van-rate>`
}).$mount('#app')
