import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDISY92SLHMJcrvOHUPN2p-5kSnyKYxNUk",
  authDomain: "linkedin-clone-c1a6e.firebaseapp.com",
  projectId: "linkedin-clone-c1a6e",
  storageBucket: "linkedin-clone-c1a6e.appspot.com",
  messagingSenderId: "187624286102",
  appId: "1:187624286102:web:51cd541d7009b05fa61fb7",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(); // to authenticate user
const provider = new GoogleAuthProvider(); // for google login, firebase.auth.GoogleAuthProvider() class is used to authenticate the user with their google account, it is a part of firebase authentication library which provides authentication methods to sign in users using different providers like google, facebook, twitter, github, etc.
const storage = getStorage(firebaseApp); // to store images

export { auth, provider, storage };
export default db;
