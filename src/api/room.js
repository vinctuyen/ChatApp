/* eslint-disable no-console */
import setData from "../firebase/setData"
import getData from "../firebase/getData"

// eslint-disable-next-line no-undef
var firebaseData = firebase.database().ref();

var listRoom = {};


firebaseData.child("room").on(
  "value",
  function(snapshot) {
    listRoom = snapshot.val();
  },
  function(errorObject) {
    console.log(errorObject.code);
  }
);

function checkRoom(nameRoom) {
  for (let i in listRoom) {
    if (listRoom[i].name == nameRoom) {
      return false;
    }
  }
  return true;
}


// function export
/////////////////////////////////////////////////////////////////////

function getRoom({ commit }) {
    commit("getRoom", listRoom);
}

function getListContact({ commit }) {
  commit("getContacts", getData.listContact());
}

function addRoom( idRoom, members, message) {
  if (
    checkRoom(members[0] + members[1]) == false ||
    checkRoom(members[1] + members[0]) == false
  ) {
    alert("room da duoc tao");
  } else {
    setData.createRoomChat(idRoom, members, message)
  }
}

function createGroup(idRoom, members, message, name) {
  setData.createGroupChat(idRoom, members, message, name)
}

export default { addRoom, getRoom, getListContact, createGroup };
