import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCx-RwNbKm0m5qVbdEwljJOwlnwV1fEdQ4",
    authDomain: "exkuisite-bf0a5.firebaseapp.com",
    databaseURL: "https://exkuisite-bf0a5.firebaseio.com",
    projectId: "exkuisite-bf0a5",
    storageBucket: "exkuisite-bf0a5.appspot.com",
    messagingSenderId: "107997171535"
  };
const fire = firebase.initializeApp(config);
export default fire
