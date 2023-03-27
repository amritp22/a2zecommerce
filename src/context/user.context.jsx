import { createContext, useState,useEffect } from "react";
import { onAuthStateChangedListener,createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";

//actual value we want to accesss
export const UserContext=createContext({
   currentUser:null,
   setCurrentUser:()=>null,
})
//anything wrapped inside it value will be accessible to any component
export const UserProvider=({children})=>{
  const [currentUser,setCurrentUser]=useState(null);
  const value={currentUser,setCurrentUser};
  //all changes related to sign in/out state is handeld using onAuthStateChangedListener
  //creation of user in database is done using useffect in line 19
  //the benfit of using onAuthStateChangedListener is that we dont have to assign setcurrent 
  //user value in diffenrnt signin/out component is done in line 23
  useEffect(()=>{
    const unsubscribe=onAuthStateChangedListener((user)=>{
     console.log(user);
     if(user){
      createUserDocumentFromAuth(user)
     }
     setCurrentUser(user)
    })
    return unsubscribe;
  },[])

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}