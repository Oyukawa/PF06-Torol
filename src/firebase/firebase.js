import { initializeApp } from "firebase/app";
import { getFirestore, collection ,query, orderBy} from "firebase/firestore";
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtfFFQY0GhMkrS93tV4B7UWKWbnbbxIOM",
  authDomain: "torol-b74eb.firebaseapp.com",
  projectId: "torol-b74eb",
  storageBucket: "torol-b74eb.appspot.com",
  messagingSenderId: "14132292999",
  appId: "1:14132292999:web:d75e9a80e480e936cfb722",
  measurementId: "G-BT03DCCEW9"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const chatRef = collection(db, 'chats');
export const chatSort = query(chatRef, orderBy("date","desc"));
