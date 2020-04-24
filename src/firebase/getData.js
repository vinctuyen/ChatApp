/* eslint-disable no-console */
import store from "../store/store";
import {get} from 'lodash'
// eslint-disable-next-line no-undef
var firebaseData = firebase.database().ref();
var listRoom = {};
var listAccount = {};

firebaseData.child("account").on(
  "value",
  function(snapshot) {
    listAccount = snapshot.val();
    let arr = [];
    let name = "";
    let value = "";
    for (let i in listAccount) {
      name = listAccount[i].name;
      value = listAccount[i].uid;
      arr.push({ name: name, value: value });
    }
    store.dispatch("getListUser", arr);
    if (listAccount && store.state.userId) {
      store.dispatch("updateContact", listContact());
    }
  },
  function(errorObject) {
    console.log(errorObject.code);
  }
);

firebaseData.child("room").on(
  "value",
  function(snapshot) {
    listRoom = snapshot.val();
    if (store.state.userId && listRoom) {
      store.dispatch("updateRoom", listRoom);
      store.dispatch("getRoom", listRoom);
      console.log("covao day khong ta", listRoom);
    }
    if (listRoom && store.state.currentRoom) {
      console.log(store.state.currentRoom);
      store.dispatch("updateConversation", listRoom[store.state.currentRoom]);
    }
    //need set state in store
  },
  function(errorObject) {
    console.log(errorObject.code);
  }
);
function getFirstConversation() {
  let listRoom = {};
  let listAccount = {};
  let { userId } = store.state;
  firebaseData.child("room").on(
    "value",
    function(snapshot) {
      listRoom = snapshot.val();
    },
    function(errorObject) {
      console.log(errorObject.code);
    }
  );
  firebaseData.child("account").on(
    "value",
    function(snapshot) {
      listAccount = snapshot.val();
    },
    function(errorObject) {
      console.log(errorObject.code);
    }
  );
  if (listAccount && listRoom) {
    store.dispatch(
      "updateConversation",
      listRoom[listAccount[userId].defaultRoom]
    );
  }
}

function listContact() {
  let userID = store.state.userId;
  let roomFollowID = listAccount[userID].rooms;
  let firstMessage = "";
  let time = "";
  let contactId = null;
  let contactName = "";
  let contactAvatar = "";
  let arrContact = [];
  let roomID = null;
  let  messages = {}
  let lastMessage = null

  if(!roomFollowID) {
    return arrContact
  }

  // eslint-disable-next-line no-debugger
  debugger

  for (let i in roomFollowID) {
    messages = listRoom[roomFollowID[i]].messages;
    console.log(get(listRoom, listRoom[roomFollowID[i]].messages))
    lastMessage = messages[messages.length - 1]
    firstMessage = lastMessage.content;
    time = lastMessage.time;
    roomID = roomFollowID[i];

    if (listRoom[roomFollowID[i]].type == 'group') {
      contactName = listRoom[roomFollowID[i]].name;
      contactId = "";
      contactAvatar = "";
    } else {
      contactId =
        listRoom[roomFollowID[i]].user.user1 == userID
          ? listRoom[roomFollowID[i]].user.user2
          : userID;
      contactName = listAccount[contactId].name;
      contactAvatar = listAccount[contactId].anh;
    }
    console.log({
      firstMessage: firstMessage,
      time: time,
      contactId: contactId,
      contactName: contactName,
      contactAvatar: contactAvatar,
      roomID: roomID,
    })
    arrContact.push({
      firstMessage: firstMessage,
      time: time,
      contactId: contactId,
      contactName: contactName,
      contactAvatar: contactAvatar,
      roomID: roomID,
    });
    
  }
  return arrContact;
}

function getRoom() {
  store.dispatch("getRoom", listRoom);
}

function getConversationCurrent({ commit }) {
  if(listRoom[store.state.currentRoom]) {
    commit("getConversation", listRoom[store.state.currentRoom]);
  }else {
    commit("getConversation", {});
  }
}

export default {
  listContact,
  getRoom,
  getFirstConversation,
  getConversationCurrent,
};
