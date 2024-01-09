import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';

import SignUpForm from '../../component/sign-up-form/sign-up-form.components';
import SignInForm from '../../component/sign-in-form/sign-in-form.component';
import {auth,createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils';
import './authentication.styles.scss';



const Authentication=()=>{

    useEffect(()=>{
        const AsyncFn=async()=>{
            const response= await getRedirectResult(auth)
        if(response){
            const userDocRef=  await createUserDocumentFromAuth(response.user)
            console.log(userDocRef)}
            
        }
        AsyncFn()
    },[])

//call to database always use asynchronous function


    
    

   // const logGoogleRedirectUser =async()=>{
       // const {user}= await signInWithGoogleRedirect()
      //console.log({user})
    //}


    return(
        <div className='authentication-container'>
           
            
            <SignInForm/>
            <SignUpForm/>
        </div>
    )
}
export default Authentication;

/*<button onClick={logGoogleUser}>

sign in with google pop up

</button>
<button onClick={signInWithGoogleRedirect}>

sign in with google redirect

</button>*/