/* eslint-disable no-console */
/* eslint-disable no-undef */

let data = firebase.database().ref("fir-function-ef256");
// eslint-disable-next-line no-console
console.log("data", data);
var time = new Date();
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
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        commit("auth", firebase.auth().currentUser.uid);
        router.push({ name: "Chat" });
        firebase.auth().currentUser.updateProfile({
          displayName: "Jane Q. User",
          photoURL: "https://example.com/jane-q-user/profile.jpg",
        })
          .then(function() {
            // Update successful.
            firebase
              .database()
              .ref("account/" + 1)
              .set(
                {
                  email: email,
                  name: firebase.auth().currentUser.displayName,
                  anh: firebase.auth().currentUser.photoURL,
                  rooms: {0: 1},
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
  addRoom(idRoom, nameRoom, members, message) {
    console.log(idRoom, nameRoom, members, message);
    firebase
      .database()
      .ref("room/" + idRoom)
      .set(
        {
          name: nameRoom,
          user: { user1: members[0], user2: members[1] },
          messages: {
            0: {
              content: message,
              from: 1,
              time: time.getTime(),
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
  },
  
};
