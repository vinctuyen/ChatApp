// eslint-disable-next-line no-undef
var firebaseData = firebase.database().ref();
// eslint-disable-next-line no-undef
var firebaseDatabase = firebase.database();
import moment from "moment";

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

var listRoom = {};

firebaseData.child("room").on(
  "value",
  function(snapshot) {
    listRoom = snapshot.val();

    //need set state in store
  },
  function(errorObject) {
    // eslint-disable-next-line no-console
    console.log(errorObject.code);
  }
);

function conversation(roomID) {
  return listRoom[roomID];
}

// function export
/////////////////////////////////////////////////////////////////////

function getContentConversation({ commit }, roomID) {
  commit("getConversation", conversation(roomID));
}

function sendMessage({ commit }, sender, message, roomID, idMessage) {
  firebaseDatabase
    .ref("room")
    .child(`${roomID}/messages/${idMessage}`)
    .set(
      {
        from: sender,
        content: message,
        time: timeNow,
      },
      function(error) {
        if (error) {
          // The write failed...
        } else {
          // Data saved successfully!

          commit("getConversation", conversation(roomID));
        }
      }
    );
}

export default { getContentConversation, sendMessage };
