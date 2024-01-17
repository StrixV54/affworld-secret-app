import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { firebaseAuth, firebaseGoogleAuth, firestoreDB } from "./config";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import toast from "react-hot-toast";
import { printFirebaseError } from "../utils/helper";

export const collectionUser = "users_details";
export const collectionSecret = "users_secret";

export const signUpAPI = ({ first, last, email, password }) => {
  return createUserWithEmailAndPassword(firebaseAuth, email, password)
    .then(async (res) => {
      await setDoc(doc(firestoreDB, collectionUser, res.user.uid), {
        displayName: first?.concat(" ", last),
        email,
        uid: res.user?.uid,
        lastLoginAt: new Date().toLocaleString(),
      });
    })
    .then(() => {
      toast.success("Successfully Created Account");
    })
    .catch((error) => {
      printFirebaseError(error);
    });
};

export const signInAPI = (email, password) => {
  /**
   * SignIn function of Firebase , we update last login time and get the doc info
   * */
  return signInWithEmailAndPassword(firebaseAuth, email, password)
    .then(async (res) => {
      await updateDoc(doc(firestoreDB, collectionUser, res.user.uid), {
        lastLoginAt: new Date().toLocaleString(),
      });
    })
    .then(() => {
      toast.success("Successfully Logged In");
    })
    .catch((error) => {
      printFirebaseError(error);
    });
};

export const signInWithGoogleAPI = () => {
  return signInWithPopup(firebaseAuth, firebaseGoogleAuth)
    .then(async (res) => {
      const user = res.user;

      return await setDoc(doc(firestoreDB, collectionUser, user?.uid), {
        displayName: user.displayName,
        email: res.user.email,
        uid: res.user.uid,
        lastLoginAt: new Date().toLocaleString(),
      });
    })
    .then(() => {
      toast.success("Successfully Logged In via Google");
    })
    .catch((error) => {
      printFirebaseError(error);
    });
};

export const getUserDetailsAPI = async (uid) => {
  const docSnap = await getDoc(doc(firestoreDB, collectionUser, uid));
  // If Document Snapshot exist then return data
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document exists!");
  }
  return undefined;
};

export const addSecretAPI = async (uid, text) => {
  return await setDoc(doc(firestoreDB, collectionSecret, uid), {
    secret: text,
    uid,
    time: new Date().toLocaleString(),
  });
};

export const getSecretsAPI = async () => {
  // creates a reference to the collection
  const userRef = collection(firestoreDB, collectionSecret);

  // passing a single where query to  the query function
  const querySnapshot = await getDocs(userRef);
  let result = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    result.push(doc.data());
  });
  return result;
};
