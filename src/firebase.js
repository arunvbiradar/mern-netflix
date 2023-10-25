import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAabuBtvkmeBg-qPTGbrq_jE__Qz8SvcPY",
  authDomain: "netlix-clone-4b87b.firebaseapp.com",
  projectId: "netlix-clone-4b87b",
  storageBucket: "netlix-clone-4b87b.appspot.com",
  messagingSenderId: "756702971352",
  appId: "1:756702971352:web:fbaa3df3b82f066d64dead",
  measurementId: "G-VTN97VCX3L"
};

initializeApp(firebaseConfig);
const storage = getStorage();

export default storage;