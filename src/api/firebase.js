import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBunIq12QrM_jiEHj8IP6QMQLAWI7Qs84U",
  authDomain: "reacrt-firebase-game.firebaseapp.com",
  databaseURL: "https://reacrt-firebase-game.firebaseio.com",
  projectId: "reacrt-firebase-game",
  storageBucket: "",
  messagingSenderId: "789897234016"
};

app.initializeApp(config);

export const fireBaseAuth = app.auth();
export const fireDB = app.database();

export {
  app as firebaseApp
}