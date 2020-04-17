/* eslint-disable no-console */
import store from "../store/store";
// eslint-disable-next-line no-undef
var firebaseData = firebase.database().ref();
var listRoom = {};
var listAccount = {};

firebaseData.child("account").on(
  "value",
  function(snapshot) {
    listAccount = snapshot.val();
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
    }
    if (listRoom && store.state.currentRoom) {
      console.log("covao day khong ta");
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

  for (let i in listAccount[userID].rooms) {
    let { messages } = listRoom[roomFollowID[i]];
    firstMessage = messages[messages.length - 1].content;
    time = messages[messages.length - 1].time;
    contactId =
      listRoom[roomFollowID[i]].user.user1 == userID
        ? listRoom[roomFollowID[i]].user.user2
        : userID;
    contactName = listAccount[contactId].name;
    contactAvatar = listAccount[contactId].anh;
    roomID = listAccount[userID].rooms[i];

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

export default { listContact, getRoom, getFirstConversation };
