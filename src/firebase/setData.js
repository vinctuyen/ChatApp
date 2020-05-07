/* eslint-disable no-undef */
import moment from "moment";
import store from "../store/store"
var firebaseDatabase = firebase.database();
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
            console.log('')
          }
        }
    )
    firebaseDatabase.ref(`account/${members[0]}/rooms`).push(idRoom);
    firebaseDatabase.ref(`account/${members[1]}/rooms`).push(idRoom);
}

function createGroupChat(idRoom, members, message, name) {
  let user = {}
  members.push(store.state.userId)
  for(let i=0; i<members.length; i++) {
     user[i] = members[i]
     firebaseDatabase.ref(`account/${members[i]}/rooms`).push(idRoom);
  }
  firebaseDatabase.ref("room/" + (idRoom)).set(
      {
        name: name,
        user: user,
        type: 'group',
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
            console.log('')
        }
      }
  )
}

function sendMessageRequest(sender, message, roomID, idMessage) {
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
export default {createRoomChat, sendMessageRequest, createGroupChat}