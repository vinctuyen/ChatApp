/* eslint-disable no-console */
import moment from "moment";
import store from "../store/store"
// eslint-disable-next-line no-undef
var firebaseDatabase = firebase.database();

// var firebaseData = firebase.database().ref();
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

function createRoomChat(idRoom, members, message) {
    firebaseDatabase.ref("room/" + (idRoom)).set(
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
              console.log('aaaaaaa')
          }
        }
    )
    firebaseDatabase.ref(`account/${members[0]}/rooms`).push(idRoom);
    firebaseDatabase.ref(`account/${members[1]}/rooms`).push(idRoom);
}

function sendMessageRequest(sender, message, roomID, idMessage) {
    console.log('store', store.state.currentRoom)
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
        }
      }
    );

    firebaseDatabase
    .ref("account")
    .child(`${store.state.userId}/defaultRoom`)
    .set(
      store.state.currentRoom,
      function(error) {
        if (error) {
          // The write failed...
        } else {
          // Data saved successfully!
        }
      }
    );
}
export default {createRoomChat, sendMessageRequest}