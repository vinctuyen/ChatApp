import setData from "../firebase/setData";
import getData from "../firebase/getData"
import store from "../store/store";
// eslint-disable-next-line no-undef
// var firebaseData = firebase.database().ref();
// eslint-disable-next-line no-undef

// firebaseData.child("room").on(
//   "value",
//   function(snapshot) {
//     listRoom = snapshot.val();
//   },
//   function(errorObject) {
//     // eslint-disable-next-line no-console
//     console.log(errorObject.code);
//   }
// );

// function export
/////////////////////////////////////////////////////////////////////

function getContentConversation({ commit }, roomID) {
  let listRoom = store.state.room;
  commit("getConversation", listRoom[roomID]);
}

function sendMessage(sender, message, roomID, idMessage) {
  setData.sendMessageRequest(sender, message, roomID, idMessage);
}

function getFirstConversation() {
    getData.getFirstConversation()
}

export default { getContentConversation, sendMessage, getFirstConversation };
