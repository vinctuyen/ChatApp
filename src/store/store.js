/* eslint-disable no-undef */
/* eslint-disable no-console */
import Vue from "vue";
import Vuex from "vuex";
import api from "../api/index"
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
    listUser: {}
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
    },
    getListUser(state, listUser) {
      state.listUser = listUser
    }
  },
  actions: {
    // authen
    UpdateUser({ commit }, user) {
      api.authen.signIn({ commit }, user.email, user.password, user.router);
    },
    RegisterUser({ commit }, user) {
      api.authen.registerUser({ commit }, user.email, user.password, user.router);
    },
    SignOut({ commit }, user) {
      api.authen.signOut({ commit }, user.router);
    },
    search({ commit }, email) {
      api.authen.search({commit},email.email)
    },
    getListUser({commit}, listUser) {
      commit("getListUser", listUser)
    },
    resetPassword({ commit }, email) {
      api.authen.resetPassword(email)
    },
    // room
    createRoom({ commit }, a) {
      api.room.addRoom(a.idRoom, a.members, a.message)
    }, 
    createGroup({commit}, group) {
      api.room.createGroup(group.idRoom, group.members, group.message, group.nameRoom)
    },
    getRoom({ commit }) {
      api.room.getRoom({commit})
    },
    getContacts({commit}) {
      api.room.getListContact({commit})
    },
    updateRoom({commit}, room) {
      commit('getRoom', room)
    },
    updateContact({commit}, contacts) {
      commit('getContacts', contacts)
    },
    
    // conversation
    sendMessage({commit}, request){
      api.conversation.sendMessage(request.sender, request.message, request.roomID, request.idMessage)
    },
    getConversation({commit}, roomId) {
      commit("setCurrentRoom", roomId)
      api.conversation.getContentConversation({commit}, roomId)
    },
    updateConversation ({commit}, conversation) {
      commit("getConversation", conversation)
    },
    getDefaultConversation() {
      api.conversation.getFirstConversation()
    },
    setCurrentRoom({commit}, defaultRoom) {
      commit("setCurrentRoom", defaultRoom)
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
