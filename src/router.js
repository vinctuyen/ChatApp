import Vue from "vue";
import Router from "vue-router";
import store from './store/store'

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
  let currentUser = store.state.userId;
  let requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (requiresAuth && !currentUser) {
    next("login");
  } else if (!requiresAuth && currentUser) {
    next("chat");
  } else {
    next();
  }
});

export default router;
