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
    searchUid: null,
    searchName: '',
    searchUser: {},
    room: {},
    contacts: {},
    conversation: {},
    currentRoom: '',
  },
  mutations: {
    //This is for Sidbar trigger in mobile
    IS_SIDEBAR_ACTIVE(state, value) {
      state.isSidebarActive = value;
    },

    auth(state, userId) {
      state.isAuth = true;
      state.userId = userId;
    },
    noAuth(state) {
      state.isAuth = false;
      state.userId = null;
    },
    addsearchUser(state, user) {
      state.searchUser = user;
    },
    removesearchUser(state) {
      state.searchUser = null;
    },
    getRoom(state, room) {
      state.room = room
    },
    getContacts(state, contacts) {
      state.contacts = contacts
    },
    getConversation(state, conversation) {
      state.conversation = conversation
    },
    setCurrentRoom(state, currentRoom) {
      state.currentRoom = currentRoom
    }
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
      api.addRoom(a.idRoom, a.members, a.message)
    },
    search({ commit }, email) {
      api.search({commit},email.email)
    },
    getRoom({ commit }) {
      api.getRoom({commit})
    },
    getContacts({commit}, userId) {
      api.getListContact({commit}, userId)
    },
    getConversation({commit}, roomId) {
      api.getContentConversation({commit}, roomId)
      commit("setCurrentRoom", roomId)
    },
    sendMessage({commit}, request){
      api.sendMessage({commit}, request.sender, request.message, request.roomID, request.idMessage)
    }
  },
  getters: {
    userId: (state) => state.userId,
    getUserId(state) {
      return (matchNumber) => {
        return state.userId === matchNumber;
      };
    },
    getSearchUser(state) {
      return (matchNumber) => {
        return state.searchUser === matchNumber;
      };
    },
  },
});
