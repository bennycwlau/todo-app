// Firebase config and initialization
import firebase from "firebase/app";

let config = {
    apiKey: "AIzaSyDwBUir_Sm1aooqJh1s9IQLTNjI_yM0MQ8",
    authDomain: "todo-app-a31f7.firebaseapp.com",
    projectId: "todo-app-a31f7",
    storageBucket: "todo-app-a31f7.appspot.com",
    messagingSenderId: "646048104870",
    appId: "1:646048104870:web:b7d48c77638950cb400f67"
};


if (!firebase.length) {
    // Firebase init
    firebase.initializeApp(config);
}

export default firebase;
