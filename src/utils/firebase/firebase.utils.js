// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider,signInWithPopup,signInWithRedirect} from "firebase/auth";
import {getFirestore,doc,getDoc,setDoc} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBt9wZ2YxmyCwzFx_Rrz1cA-PrbCi2Nybo",
  authDomain: "a2zecomm.firebaseapp.com",
  projectId: "a2zecomm",
  storageBucket: "a2zecomm.appspot.com",
  messagingSenderId: "1023021426782",
  appId: "1:1023021426782:web:7b5b592b456f06c5a0eccf"
};


// Initialize Firebase and useful for doing CRUD operations
const FrebaseApp = initializeApp(firebaseConfig);
const provider=new GoogleAuthProvider()
provider.setCustomParameters({
    prompt:'select_account'
});

const auth=getAuth();
export const signInWithGooglePopup=()=>signInWithPopup(auth,provider);

export const db=getFirestore();

export const createUserDocumentFromAuth=async (usersAuth)=>{
  const userRefDoc=doc(db,'users',usersAuth.uid);

  console.log(userRefDoc);

  //usersnapshot allows us to acces the data
  const userSnapShot=await getDoc(userRefDoc);
  console.log(userSnapShot);
  console.log(userSnapShot.exists());//check whtehr exists in firestore database
  //user does not exists

  if(!userSnapShot.exists()){
    const {displayName,email}=usersAuth;
    const createdAt=new Date();
    try{
      await setDoc(userRefDoc,{
        displayName,
        email,
        createdAt
      });

    }
    catch(error){
      console.log('error message is being displayed',error);
    }
    
  }
  return userRefDoc
}