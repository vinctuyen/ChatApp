/* eslint-disable no-undef */
var firebaseAuthen = firebase.auth();
var firebaseData = firebase.database().ref();

var listAccount = {};

firebaseData.child("account").on(
  "value",
  function(snapshot) {
    listAccount = snapshot.val();
  },
  function(errorObject) {
    console.log(errorObject.code);
  }
);

function checkAccount(email) {
  for (let i in listAccount) {
    if (listAccount[i].email == email) {
      return false;
    }
    return true;
  }
}

function createAccount(email) {
  firebase
    .database()
    .ref("account/" + firebaseAuthen.currentUser.uid)
    .set(
      {
        uid: firebaseAuthen.currentUser.uid,
        email: email,
        name: firebaseAuthen.currentUser.displayName,
        anh: firebaseAuthen.currentUser.photoURL,
      },
      function(error) {
        if (error) {
          // The write failed...
        } else {
          // Data saved successfully!
        }
      }
    );
}

function updateProfile(email) {
  firebaseAuthen.currentUser
    .updateProfile({
      displayName: "User",
      photoURL: "https://example.com/jane-q-user/profile.jpg",
    })
    .then(function() {
      createAccount(email);
    })
    .catch(function() {});
}

// function export
/////////////////////////////////////////////////////////////////////

function signIn({ commit }, email, password, router) {
  firebaseAuthen
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      commit("auth", firebaseAuthen.currentUser.uid);
      router.push({ name: "Chat" });
    })
    .catch((e) => {
      commit("auth", null);
      router.push({ name: "Login" });
      alert(e.message);
    });
}

function registerUser({ commit }, email, password, router) {
  if (checkAccount(email)) {
    firebaseAuthen
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        // set state
        commit("auth", firebaseAuthen.currentUser.uid);
        //link to main chat
        router.push({ name: "Chat" });
        //update profile
        updateProfile(email);
      })
      .catch((e) => {
        commit("auth", null);
        router.push({ name: "Login" });
        alert(e.message);
      });
  } else {
    alert("tài khoản đã tồn tại");
  }
}

function signOut({ commit }, router) {
  firebaseAuthen
    .signOut()
    .then(function() {
      commit("auth", null);
      commit("getContacts", {})
      commit("getConversation", {})
      router.push({ name: "Login" });
    })
    .catch(function(error) {
      alert(error);
      // An error happened.
    });
}

function search({ commit }, e) {
  firebaseData.child("account").on(
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
      console.log(errorObject.code);
    }
  );
}

function resetPassword(email) {
  firebaseAuthen.sendPasswordResetEmail(email).then(function() {
    alert('reset thành công, vui lòng vào hòm thư để tiếp tục')
  }).catch(function(error) {
    alert(error)
  });
}

export default { signIn, registerUser, signOut, search, resetPassword };
