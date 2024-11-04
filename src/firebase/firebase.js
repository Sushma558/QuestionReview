import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAIN3C6YxJlYaw5IrkhLCuk87BC8W7Wb3w",
  authDomain: "sconti-e7f3a.firebaseapp.com",
  databaseURL: "https://sconti-e7f3a-default-rtdb.firebaseio.com",
  projectId: "sconti-e7f3a",
  storageBucket: "sconti-e7f3a.appspot.com",
  messagingSenderId: "269755638441",
  appId: "1:269755638441:web:99a053f94865ffcbd5ffb8",
  measurementId: "G-HWK8F47S60",
};
firebase.initializeApp(firebaseConfig);
var auth = firebase.auth();
var provider = new firebase.auth.GoogleAuthProvider();
var storage = firebase.storage();
const db = firebase.firestore();

export { auth, firebase, provider, storage, db };
