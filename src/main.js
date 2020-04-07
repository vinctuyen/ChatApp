import Vue from 'vue'
import Vuesax from 'vuesax'
import firebase from 'firebase'


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
// config firebase
let config = {
  apiKey: "AIzaSyCO6OkWsLuMPtPQmesKhdLk3znS06V_nsw",
  authDomain: "fir-function-ef256.firebaseapp.com",
  databaseURL: "https://fir-function-ef256.firebaseio.com",
  projectId: "fir-function-ef256",
  storageBucket: "fir-function-ef256.appspot.com",
  messagingSenderId: "363532008720",
  appId: "1:363532008720:web:8ee1911736170fc4853995",
  measurementId: "G-K6HFQX4ZP0"
};
// Initialize Firebase
firebase.initializeApp(config)
window.firebase=firebase;
let currentUser = firebase.auth().currentUser;
// eslint-disable-next-line no-console
console.log('currentUser', currentUser)

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
import '@/assets/scss/style.scss'