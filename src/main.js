import Vue from 'vue'
import Vuesax from 'vuesax'
import firebase from './firebase/firebase'


import App from './App.vue'

import 'vuesax/dist/vuesax.css' //Vuesax styles
import 'material-icons/iconfont/material-icons.css';
// Vuex Store
import store from './store/store'

// Theme Configurations
import 'prismjs'
import 'prismjs/themes/prism.css'
import VsPrism from './components/prism/VsPrism.vue';
Vue.component(VsPrism.name, VsPrism);

// Vue Router
import router from './router'
Vue.config.productionTip = false
Vue.config.devtools = true
Vue.use(Vuesax)

new Vue({
  firebase,
  store,
  router,
  render: h => h(App),
}).$mount('#app')
import '@/assets/scss/style.scss'