import { useState } from "react";
//import { createAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
//import { createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import { signInWithGooglePopup } from "../../utils/firebase/firebase.utils";
import { signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import './sign-in-form.styles.scss'
import Button from "../button/button.component";


const defaultFormFields={
    
    email:'',
    password:'',
 

}



const SignInForm=()=>{


const [formFields,setFormFields]=useState(defaultFormFields)
const {email,password}=formFields



const signInWithGoogle =async()=>{
     await signInWithGooglePopup()
    }
    

const handleSubmit=async(event)=>{

    event.preventDefault()  // prevent the default behavioue of form
    try{
        await signInAuthUserWithEmailAndPassword(email,password)
       


    }
    catch(error)
    {switch (error.code){
        case'auth/wrong-password':
          alert ('incorrect password for email');
          break;
        case 'auth/user-not-found':
         alert('no user associated with this email');
          break;
        default:
         console.log(error);
      

    }
}
}



const handleChange=(event)=>{
    const {name,value}=event.target;
    setFormFields({...formFields,[name]:value})

}
    return(
          /* value to be displayed in respective input field*/
        <div className='sign-up-container'>
            <h2>Already have an account?</h2>
            <span> sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
              
              
                
                
                <FormInput label="Email" type='text' required onChange={handleChange} value={email} name='email'/>
                <FormInput label="password" type='text' required onChange={handleChange} value={password} name='password'/>
                
                    <div className="buttons-container">
                <Button type='submit'>sign-in</Button>
                <Button type='button' buttontype='google' onClick={signInWithGoogle}>Google sign-in</Button>
                </div>
            </form>
        </div>

    )
}

export default SignInForm;


/*<FormInput 
label='display name'
inputOptions={{

type:'text',
required:true,
onChange:handleChange,
name:'displayname',
value:displayName,

}}/>*/