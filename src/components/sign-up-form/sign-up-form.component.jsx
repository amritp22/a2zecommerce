import './sign-up-form.styles.scss'
import { useState } from "react";
import { createAuthUserWithEmailAndPassword,createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from '../button/button.component';

const defaultFormFields={
    displayName:'',
    email:'',
    password:'',
    confirmPassword:''
}
const SignUpForm=()=>{
    const [formFields,setFormFields]=useState(defaultFormFields);
    const {displayName,email,password,confirmPassword}=formFields


    const resetFormFields = () => {
      setFormFields(defaultFormFields);
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      if (password !== confirmPassword) {
        alert('passwords do not match');
        return;
      }
  
      try {
        const { user } = await createAuthUserWithEmailAndPassword(
          email,
          password
        );
  
        await createUserDocumentFromAuth(user, { displayName });
        resetFormFields();
      } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          alert('Cannot create user, email already in use');
        } else {
          console.log('user creation encountered an error', error);
        }
      }
    };
    const handleChange=(event)=>{
        const {name,value}=event.target
        setFormFields({...formFields,[name]:value})//...formFields maintain all other fields to be as it is

    }
    console.log(formFields);
    return(
        <div className="sign-up-container">
          <h2>don't have a account</h2>
          <span>enter your details to signup</span>
          <form onSubmit={handleSubmit}>
            
            <FormInput 
               label={'Display Name'}
               type="text" 
               required 
               onChange={handleChange} 
               value={displayName} 
               name='displayName'
            />
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
            <FormInput 
               label={'Confirm Password'} 
               type='password' 
               required 
               onChange={handleChange} 
               value={confirmPassword} 
               name='confirmPassword'
            />
            <Button type='submit'>Sign Up</Button>
          </form>
        </div>
    );
}

export default SignUpForm;