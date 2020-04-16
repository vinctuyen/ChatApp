/* eslint-disable no-console */

import moment from "moment";

// eslint-disable-next-line no-undef
var firebaseDatabase = firebase.database();
// eslint-disable-next-line no-undef
var firebaseData = firebase.database().ref();

var listRoom = {};
var listAccount = {};

var timeNow =
  moment().hour() +
  ":" +
  moment().minute() +
  ":" +
  moment().second() +
  " " +
  moment().date() +
  "-" +
  moment().month() +
  "-" +
  moment().year();

firebaseData.child("account").on(
  "value",
  function(snapshot) {
    listAccount = snapshot.val();
  },
  function(errorObject) {
    console.log(errorObject.code);
  }
);

firebaseData.child("room").on(
  "value",
  function(snapshot) {
    listRoom = snapshot.val();

    //need set state in store
  },
  function(errorObject) {
    console.log(errorObject.code);
  }
);

function createRoom({ commit }, idRoom, members, message) {
  firebaseDatabase.ref("room/" + (idRoom - 1)).set(
    {
      name: members[0] + members[1],
      user: { user1: members[0], user2: members[1] },
      messages: {
        0: {
          content: message,
          from: members[0],
          time: timeNow,
        },
      },
    },
    function(error) {
      if (error) {
        console.log(error);
      } else {
        commit("getContacts", members[0]);
      }
    }
  );
}

function checkRoom(nameRoom) {
  for (let i in listRoom) {
    if (listRoom[i].name == nameRoom) {
      return false;
    }
  }
  return true;
}

function listContact(userID) {
  // let listContact = []
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

// function export
/////////////////////////////////////////////////////////////////////

function getRoom({ commit }) {
  firebaseData.child("room").on(
    "value",
    function(snapshot) {
      let room = snapshot.val();
      commit("getRoom", room);
      // getListContact()
    },
    function(errorObject) {
      console.log(errorObject.code);
    }
  );
}

function getListContact({ commit }, userId) {
  commit("getContacts", listContact(userId));
}

function addRoom({ commit }, idRoom, members, message) {
  if (
    checkRoom(members[0] + members[1]) == false ||
    checkRoom(members[1] + members[0]) == false
  ) {
    alert("room da duoc tao");
  } else {
    // create room in database
    createRoom({ commit }, idRoom, members, message);
    // push id room in data member
    firebaseDatabase.ref(`account/${members[0]}/rooms`).push(idRoom - 1);
    firebaseDatabase.ref(`account/${members[1]}/rooms`).push(idRoom - 1);
  }
}

export default { addRoom, getRoom, getListContact };
