/* eslint-disable no-console */
import Vue from "vue";
import Router from "vue-router";
import store from './store/store.js'

let currentUser =  store.state.isAuth
Vue.use(Router);
let router = new Router({
  routes: [
    {
      path: "/login",
      name: "Login",
      component: () => import("./layout/full/Login.vue"),
    },
    {
      path: "/chat",
      name: "Chat",
      component: () => import("./layout/full/ChatScreen.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "*",
      redirect: "/login",
    },
  ],
});

router.beforeEach((to, from, next) => {
  let requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) {
    next("login");
    // eslint-disable-next-line no-console
    console.log("ok done");
  } else if (!requiresAuth && currentUser) {
    next("chat");
    // eslint-disable-next-line no-console
    console.log("chua login 1");
  } else {
    next();
  }
});

export default router;
