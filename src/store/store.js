/* eslint-disable no-undef */
/* eslint-disable no-console */
import Vue from "vue";
import Vuex from "vuex";
import api from "@/firebase/api.js";
Vue.use(Vuex);

/* eslint-disable */
export default new Vuex.Store({
  state: {
    isSidebarActive: false,
    themeColor: "#2962ff",
    isAuth: false,
    userId: null,
  },
  mutations: {
    //This is for Sidbar trigger in mobile
    IS_SIDEBAR_ACTIVE(state, value) {
      state.isSidebarActive = value;
    },

    auth(state, userId) {
      console.log("da update state");
      state.isAuth = true;
      state.userId = userId;
    },
    noAuth(state) {
      state.isAuth = false;
      state.userId = null;
    },
  },
  actions: {
    UpdateUser({ commit }, user) {
      api.signIn({ commit }, user.email, user.password, user.router);
    },
    RegisterUser({ commit }, user) {
      api.registerUser({ commit }, user.email, user.password, user.router);
    },
    SignOut({ commit }, user) {
      api.signOut({ commit }, user.router);
    },
    createRoom({ commit }, a) {
      api.addRoom(a.idRoom, a.nameRoom, a.members, a.message)
    }
  },
  getters: {
    userId: (state) => state.userId,
    getUserId(state) {
      return (matchNumber) => {
        return state.userId === matchNumber;
      };
    },
  },
});
