import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBF8rZgwIF18k9KrrF95zvnHdM95a-40aU",
    authDomain: "promoking-ab91c.firebaseapp.com",
    databaseURL: "https://promoking-ab91c-default-rtdb.firebaseio.com",
    projectId: "promoking-ab91c",
    storageBucket: "promoking-ab91c.appspot.com",
    messagingSenderId: "3880366601",
    appId: "1:3880366601:web:ccbd90d4079059f7c8fed8",
    measurementId: "G-J9GQ01M78T"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };


// export default db;