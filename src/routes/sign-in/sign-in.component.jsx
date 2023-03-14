import { async } from "@firebase/util"
import { signInWithGooglePopup,createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils"

const SignIn=()=>{
    const loggoogle=async ()=> {
        const {user}=await signInWithGooglePopup();
        const userRefDoc=await createUserDocumentFromAuth(user);
    }
    return(
        <div>
           <h1>Sign in pages is visible</h1> 
            <button onClick={loggoogle}> login with gogle</button>
        </div>
    )
}

export default SignIn