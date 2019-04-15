import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyCfCAOZaah4Ut8Kh8rpwBmebaCgP4g_8nE",
  authDomain: "boya-c5321.firebaseapp.com",
  databaseURL: "https://boya-c5321.firebaseio.com",
  projectId: "boya-c5321",
  storageBucket: "boya-c5321.appspot.com",
  messagingSenderId: "766752443737"
};

export default (!firebase.apps.length
  ? firebase.initializeApp(config)
  : firebase.app());
