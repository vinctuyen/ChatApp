/* eslint-disable no-undef */
/* eslint-disable no-console */
import Vue from "vue";
import Vuex from "vuex";
import signIn from "@/firebase/api.js";

// import router from '@/router.js'
Vue.use(Vuex);

// function setUserId({ commit }) {
//   console.log(firebase.auth().currentUser)
//   if(firebase.auth().currentUser !== null) {
//     commit("auth", firebase.auth().currentUser.uid)
//   }else {
//       commit("auth", null)
//   }
// }

// async function login({ commit }, user) {
//   console.log("da vao api");

//   await signIn(user.email, user.password);
//   console.log("da dang nhap");

//    // eslint-disable-next-line no-undef
//   await setUserId({ commit });
//   console.log("da dset valiue");
//   throw new Error();
// }

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
     updateUser({ commit }, user) {
      signIn({ commit }, user.email, user.password, user.router)
    },
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
