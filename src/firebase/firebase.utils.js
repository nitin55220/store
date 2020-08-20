import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore';



const config =  {
    apiKey: "AIzaSyCdOSZk-2guQN9_yIlA4vS6BuMCGc8G_7g",
    authDomain: "crewn-db.firebaseapp.com",
    databaseURL: "https://crewn-db.firebaseio.com",
    projectId: "crewn-db",
    storageBucket: "crewn-db.appspot.com",
    messagingSenderId: "245562646422",
    appId: "1:245562646422:web:1262317436fb8c9f5b07b7"
  };

  export const createUserProfileDocument = async (userAuth,additionaldata)=>{
    if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`)
  const snapShot = await userRef.get() 
  if(!snapShot.exists){
    const { displayName,email} = userAuth;
    const createdAt= new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionaldata
      })

    } catch(error){
      console.log('érror creating user',error)
    }
  }

  return userRef;
  }


  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider= new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = () =>auth.signInWithPopup(provider);

  export default firebase;

