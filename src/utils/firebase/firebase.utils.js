import { initializeApp} from 'firebase/app'
import {onAuthStateChanged,signOut,getAuth,signInWithRedirect,signInWithPopup,GoogleAuthProvider,createUserWithEmailAndPassword,signInWithEmailAndPassword} from 'firebase/auth'
import {getFirestore,doc,getDoc,setDoc} from 'firebase/firestore'

//methods of auth give the provider to sign in


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDIDQqHGPkbzlh_N2b6dQodkdT9o2Y_59o",
    authDomain: "clothing-1f235.firebaseapp.com",
    projectId: "clothing-1f235",
    storageBucket: "clothing-1f235.appspot.com",
    messagingSenderId: "1078120343401",
    appId: "1:1078120343401:web:4334dc1c567d36084b3ff8"
  };
  
  // Initialize Firebase
  const firebaseapp = initializeApp(firebaseConfig);
  console.log(firebaseapp)

  const provider=new GoogleAuthProvider()
  console.log(provider)
//intiating the type of sign in and prompt to force user
  provider.setCustomParameters({
    prompt: "select_account"
  })
// intiating the type of auth method
  export const auth =getAuth();
  console.log(auth)


  export const signInWithGooglePopup=()=>signInWithPopup(auth,provider)
  export const signInWithGoogleRedirect=()=>signInWithRedirect(auth,provider)

  export const db= getFirestore()

  //create user reference
  export const createUserDocumentFromAuth=async(userAuth,additionalInformation={})=>{
    if(!userAuth) return;
    const userDocRef =doc(db,'users',userAuth.uid)
     console.log(userDocRef)  
// to check data exists in database or not
const userSnapshot = await getDoc(userDocRef)
console.log(userSnapshot.exists())

if(!userSnapshot.exists()){
const {displayName,email}=userAuth
const createdAT= new Date()

try{
await setDoc(userDocRef,{
    displayName,
    email,
    createdAT,
    ...additionalInformation,

})


}
catch(error){
console.log('error creating the user',error.message )
}
}

return userDocRef;
}

export const createAuthUserWithEmailAndPassword=async(email,password)=>{
  if(!email || !password) return;

  return await createUserWithEmailAndPassword(auth,email,password)

}

export const signInAuthUserWithEmailAndPassword=async(email,password)=>{
  if(!email || !password) return;

  return await signInWithEmailAndPassword(auth,email,password)

}

export const signOutUser=()=>{
  signOut(auth)
}

export const onAuthStateChangedListner=(callback)=>
{ 
  const resp=onAuthStateChanged(auth,callback)
  console.log(resp)
}