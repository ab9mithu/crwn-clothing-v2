import { useState } from "react";
import { createAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import { createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-up-form.scss'
import Button from "../button/button.component";


const defaultFormFields={
    displayName:'',
    email:'',
    password:'',
    confirmPassword:'',

}



const SignUpForm=()=>{
const [formFields,setFormFields]=useState(defaultFormFields)
const {displayName,email,password,confirmPassword}=formFields

console.log(formFields)

const resetFormFields=()=>{
    setFormFields(defaultFormFields)
}

const handleSubmit=async(event)=>{

    event.preventDefault()  // prevent the default behavioue of form
    
    if(password!==confirmPassword){
    alert("password does not match")
     return}

try{
const {user}=await createAuthUserWithEmailAndPassword(email,password)


await createUserDocumentFromAuth(user,{displayName})
resetFormFields()
}
catch(error){
   
    if(error.Code === "auth/email-already-in-use"){
        alert("Email already in use")
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
            <h2>dont have an account?</h2>
            <span> sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
              
              
                
                <FormInput label="display Name" type='text' required onChange={handleChange} value={displayName} name='displayName'/>
                <FormInput label="Email" type='text' required onChange={handleChange} value={email} name='email'/>
                <FormInput label="password" type='text' required onChange={handleChange} value={password} name='password'/>
                <FormInput label="confirm Password" type='text' required onChange={handleChange} value={confirmPassword} name='confirmPassword'/>

                <Button type='submit'>sign-up</Button>

            </form>
        </div>

    )
}

export default SignUpForm;


/*<FormInput 
label='display name'
inputOptions={{

type:'text',
required:true,
onChange:handleChange,
name:'displayname',
value:displayName,

}}/>*/