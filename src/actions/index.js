import { auth, provider } from "../firebase";
import db from "../firebase";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import {
  SET_USER,
  SET_LOADING_STATUS,
  GET_ARTICLES,
  SET_LIKED_NUMBER_ARRAY,
} from "./actionType";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore"; // addDoc is used to add data to the firestore database
import { Timestamp } from "firebase/firestore";
import { query, orderBy, onSnapshot } from "firebase/firestore";

// payload is the user information that will be sent to the store after dispatch
// action.user
export const setUser = (payload) => ({
  type: SET_USER,
  user: payload,
});

// action.status
export const setLoading = (status) => ({
  type: SET_LOADING_STATUS,
  status: status,
});

export const getArticles = (payload) => ({
  type: GET_ARTICLES,
  payload: payload,
});

export const setLikedNumberArray = (likedNumberArray) => ({
  type: SET_LIKED_NUMBER_ARRAY,
  payload: likedNumberArray,
});

// For signIn
export function signInAPI() {
  return (dispatch) => {
    // signInWithPopUp is provided by firebase authentication that allows users to sign in with a pop-up window from google, facebook etc;
    const authInstance = getAuth(); // getAuth is used to access firebase authentication services
    signInWithPopup(authInstance, provider)
      .then((payload) => {
        // result object contains the user's authentication info if the signIn is successful
        const user = payload.user;
        dispatch(setUser(user)); // storing the user info in the store
        console.log(user);
      })
      .catch((error) => {
        alert(error.message);
      });
  };
}

// For signOut
export function signOutAPI() {
  return (dispatch) => {
    const authInstance = getAuth();
    signOut(authInstance)
      .then(() => {
        dispatch(setUser(null));
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
}

// Share post
// Refer firebase storage documentation for more info
export function postArticleAPI(payload) {
  return (dispatch) => {
    dispatch(setLoading(true));
    // payload is the post info
    // uploading image uploaded by the user to the firabse
    if (payload.image !== "") {
      const storage = getStorage();
      const storageRef = ref(storage, `images/${payload.image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, payload.image); // upload the image

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100; // to show the progress of the image upload
          console.log(`Progress: ${progress}%`);
          if (snapshot.state === "RUNNING") {
            console.log(`Progress: ${progress}%`);
          }
        },
        (error) => console.log(error.code),
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref); // to get the download url of the image

          // adding the user info and the post info to the firestore database
          try {
            // adding articles collection to the new document
            await addDoc(collection(db, "articles"), {
              actor: {
                description: payload.user.email,
                title: payload.user.displayName,
                date: Timestamp.now(),
                image: payload.user.photoURL,
              },
              video: payload.video,
              sharedImg: downloadURL,
              comments: 0,
              likes: 0,
              description: payload.description,
            });
          } catch (error) {
            console.log("Error adding article", error);
          }
          dispatch(setLoading(false)); // after the post is uploaded, loading is set to false
        }
      );
    } else if (payload.video) {
      try {
        // adding articles collection to the new document
        addDoc(collection(db, "articles"), {
          actor: {
            description: payload.user.email,
            title: payload.user.displayName,
            date: Timestamp.now(),
            image: payload.user.photoURL,
          },
          video: payload.video,
          sharedImg: "",
          comments: 0,
          likes: 0,
          description: payload.description,
        });
      } catch (error) {
        console.log("Error adding article", error);
      }
      dispatch(setLoading(false));
    } else {
      try {
        addDoc(collection(db, "articles"), {
          actor: {
            description: payload.user.email,
            title: payload.user.displayName,
            date: Timestamp.now(),
            image: payload.user.photoURL,
          },
          video: "",
          sharedImg: "",
          comments: 0,
          likes: 0,
          description: payload.description,
        });
      } catch (error) {
        console.log("Error adding article", error);
      }
      dispatch(setLoading(false));
    }
  };
}

export function getArticlesAPI() {
  return (dispatch) => {
    let payload;
    // Create a query for the "articles" collection
    const articlesRef = collection(db, "articles");

    // Create a query with orderBy for sorting by "actor.date" in descending order (query for fetching articles in order)
    const sortedQuery = query(articlesRef, orderBy("actor.date", "desc"));

    // setup real-time listener with onSnapshot
    // onSnapshot lets you know whenever the new information is added to the collection (whenever a new post is added)
    onSnapshot(sortedQuery, (snapshot) => {
      payload = snapshot.docs.map((doc) => doc.data()); // fetching the data from the articles collection
      dispatch(getArticles(payload));
    });
  };
}
