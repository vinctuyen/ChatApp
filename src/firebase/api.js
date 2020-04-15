/* eslint-disable no-console */
/* eslint-disable no-undef */

import moment from "moment";
window.moment = moment;

var data = firebase.database().ref();
let listRoom = {};
let listAccount = {};
let time =
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

// get data
data.child("room").on(
  "value",
  function(snapshot) {
    listRoom = snapshot.val();
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  }
);

console.log("listRoom", listRoom);
data.child("account").on(
  "value",
  function(snapshot) {
    listAccount = snapshot.val();
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  }
);

//handle api

function checkAccount(email) {
  for (let i in listAccount) {
    if (listAccount[i].email == email) {
      return false;
    }
    return true;
  }
}

function checkRoom(nameRoom) {
  console.log(nameRoom);
  for (let i in listRoom) {
    console.log(listRoom[i].name);
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

function conversation(roomID) {
  return listRoom[roomID];
}

export default {
  signIn({ commit }, email, password, router) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        commit("auth", firebase.auth().currentUser.uid);
        router.push({ name: "Chat" });
      })
      .catch((e) => {
        commit("auth", null);
        router.push({ name: "Login" });
        alert(e.message);
      });
  },
  registerUser({ commit }, email, password, router) {
    if (checkAccount(email)) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          commit("auth", firebase.auth().currentUser.uid);
          router.push({ name: "Chat" });
          firebase
            .auth()
            .currentUser.updateProfile({
              displayName: "Jane Q. User",
              photoURL: "https://example.com/jane-q-user/profile.jpg",
            })
            .then(function() {
              // Update successful.
              firebase
                .database()
                .ref("account/" + firebase.auth().currentUser.uid)
                .set(
                  {
                    uid: firebase.auth().currentUser.uid,
                    email: email,
                    name: firebase.auth().currentUser.displayName,
                    anh: firebase.auth().currentUser.photoURL,
                    rooms: { 0: 1 },
                  },
                  function(error) {
                    if (error) {
                      // The write failed...
                    } else {
                      // Data saved successfully!
                    }
                  }
                );
            })
            .catch(function(error) {
              // An error happened.
              console.log(error);
            });
        })
        .catch((e) => {
          commit("auth", null);
          router.push({ name: "Login" });
          alert(e.message);
        });
    } else {
      alert("tài khoản đã được tạo");
    }
  },
  signOut({ commit }, router) {
    firebase
      .auth()
      .signOut()
      .then(function() {
        commit("auth", null);
        router.push({ name: "Login" });
      })
      .catch(function(error) {
        alert(error);
        // An error happened.
      });
  },
  addRoom(idRoom, members, message) {
    let date = new Date();
    console.log(moment(date));

    if (
      checkRoom(members[0] + members[1]) == false ||
      checkRoom(members[1] + members[0]) == false
    ) {
      alert("room da duoc tao");
    } else {
      firebase
        .database()
        .ref("room/" + (idRoom - 1))
        .set(
          {
            name: members[0] + members[1],
            user: { user1: members[0], user2: members[1] },
            messages: {
              0: {
                content: message,
                from: 1,
                time: time,
              },
            },
          },
          function(error) {
            if (error) {
              // The write failed...
            } else {
              // Data saved successfully!
            }
          }
        );

      firebase
        .database()
        .ref(`account/${members[0]}/rooms`)
        .push(idRoom - 1);
      firebase
        .database()
        .ref(`account/${members[1]}/rooms`)
        .push(idRoom - 1);
    }
  },
  search({ commit }, e) {
    data.child("account").on(
      "value",
      function(snapshot) {
        let listUser = snapshot.val();
        for (let i in listUser) {
          if (listUser[i].email == e) {
            commit("addsearchUser", listUser[i]);
          }
        }
      },
      function(errorObject) {
        console.log("The read failed: " + errorObject.code);
      }
    );
  },
  getRoom({ commit }) {
    data.child("room").on(
      "value",
      function(snapshot) {
        let room = snapshot.val();
        commit("getRoom", room);
        // getListContact()
      },
      function(errorObject) {
        console.log("The read failed: " + errorObject.code);
      }
    );
  },
  getListContact({ commit }, userId) {
    commit("getContacts", listContact(userId));
  },
  getContentConversation({ commit }, roomID) {
    commit("getConversation", conversation(roomID));
  },
  sendMessage(sender, message, roomID, idMessage) {
    firebase
      .database()
      .ref("room")
      .child(`${roomID}/messages/${idMessage}`)
      .set(
        {
          from: sender,
          content: message,
          time: time,
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
  },
};
