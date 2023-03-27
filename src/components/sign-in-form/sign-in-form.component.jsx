import './sign-in-form.styles.scss'
import { useState} from "react";
import { signInWithGooglePopup,signInAuthUserWithEmailAndPassword,createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
// import { UserContext } from '../../context/user.context';
const defaultFormFields={
    email:'',
    password:'',
    
}
const SignInForm=()=>{
    const [formFields,setFormFields]=useState(defaultFormFields);
    const {email,password}=formFields
    // const {setCurrentUser}=useContext(UserContext)

    const loggoogle=async ()=> {
      await signInWithGooglePopup();
      //the below is statement is removed we centralziing 
      //all such things in in one place using observer pattern in user context
      // await createUserDocumentFromAuth(user);
  }


    const resetFormFields = () => {
      setFormFields(defaultFormFields);
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  

  
      try {
        const {user}=await signInAuthUserWithEmailAndPassword(email,password);
        // console.log(response);
        //  setCurrentUser(user)
         resetFormFields();

      } catch (error) {
        switch(error.code){
          case 'auth/wrong-password':
            alert('wrong password entered')
            break;
          case 'auth/user-not-found':
            alert('user not registerd') 
            break;
          default:
            console.log(error); 
        }
        
      }
    };
    const handleChange=(event)=>{
        const {name,value}=event.target
        setFormFields({...formFields,[name]:value})//...formFields maintain all other fields to be as it is

    }
    // console.log(formFields);
    return(
        <div className="sign-up-container">
          <h2>Already have a account</h2>
          <span>enter your details to sign in</span>
          <form onSubmit={handleSubmit}>

            <FormInput 
               label={'Email'}
               required 
               onChange={handleChange} 
               value={email} 
               name='email' 
            />
            <FormInput 
               label={'Password'}
               type="password" 
               required 
               onChange={handleChange} 
               value={password} 
               name='password'
            />
            <div className='buttons-container'>
            <Button type='submit'>Sign In</Button>
            <Button onClick={loggoogle} buttonType='google' type='button'>Google Sign In</Button>

            </div>
            
          </form>
        </div>
    );
}

export default SignInForm;