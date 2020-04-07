/* eslint-disable no-undef */
let db = firebase.database()
let data = db.ref('fir-function-ef256')
// eslint-disable-next-line no-console
console.log('data', data)


// function writeUserData(userId, name, email) {
//     firebase.database().ref('user/' + userId).set({
//       username: name,
//       email: email,
//     });
//   }
  
  function signIn(email, password){
      firebase.auth().signInWithEmailAndPassword(email,password)
          .then(()=>{
             let userID = firebase.auth().currentUser.uid;
            // eslint-disable-next-line no-console
            console.log('user đã có nha', userID)
            // writeUserData(userID, 'b', 'tbc@gmail.com')
            // this.$router.replace('/hello')
          })
          .catch((e)=>{
              alert(e.message)
          })
  }
  
  // eslint-disable-next-line no-console
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      // eslint-disable-next-line no-console
      console.log('user', user)
    } else {
      // No user is signed in.
      // eslint-disable-next-line no-console
      console.log('No user is signed in.')
    }
  });

export default signIn;

  