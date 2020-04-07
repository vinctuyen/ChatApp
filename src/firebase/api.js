/* eslint-disable no-console */
/* eslint-disable no-undef */

let data = firebase.database().ref("fir-function-ef256");
// eslint-disable-next-line no-console
console.log("data", data);

// function writeUserData(userId, name, email) {
//     firebase.database().ref('user/' + userId).set({
//       username: name,
//       email: email,
//     });
//   }

function signIn({ commit }, email, password, router) {
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
}

// eslint-disable-next-line no-console
// firebase.auth().onAuthStateChanged(function(user) {
//   if (user) {
//     // User is signed in.
//     // eslint-disable-next-line no-console
//     console.log("user", firebase.auth().currentUser);
//   } else {
//     // No user is signed in.
//     // eslint-disable-next-line no-console
//     console.log("No user is signed in.");
//   }
// });

export default signIn;
