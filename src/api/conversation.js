import setData from "../firebase/setData";
import getData from "../firebase/getData"
// import store from "../store/store";
// var firebaseData = firebase.database().ref();

// firebaseData.child("room").on(
//   "value",
//   function(snapshot) {
//     listRoom = snapshot.val();
//   },
//   function(errorObject) {
//     console.log(errorObject.code);
//   }
// );

// function export
/////////////////////////////////////////////////////////////////////

function getContentConversation({commit}, roomID) {
  // let listRoom = store.state.room;
  // commit("getConversation", listRoom[roomID]);
  getData.getConversationCurrent({commit}, roomID)
}

function sendMessage(sender, message, roomID, idMessage) {
  setData.sendMessageRequest(sender, message, roomID, idMessage);
}

function getFirstConversation() {
    getData.getFirstConversation()
}

export default { getContentConversation, sendMessage, getFirstConversation };
