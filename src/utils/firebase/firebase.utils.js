import { initializeApp} from 'firebase/app'
import {onAuthStateChanged,signOut,getAuth,signInWithRedirect,signInWithPopup,GoogleAuthProvider,createUserWithEmailAndPassword,signInWithEmailAndPassword} from 'firebase/auth'
import {getFirestore,doc,getDoc,setDoc,collection,writeBatch,query,getDocs} from 'firebase/firestore'

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
//intiating the type of sign in in firebase authentication and prompt to force user
  provider.setCustomParameters({
    prompt: "select_account"
  })
// intiating the type of auth method
  export const auth =getAuth();
  console.log(auth)

  export const addCollectionAndDocuments= async (collectionKey,objectsToAdd)=>{
    const collectionRef= collection(db,collectionKey)
    const batch=writeBatch(db)

    objectsToAdd.forEach((object) => {
      const docRef=doc(collectionRef,object.title.toLowerCase())
      batch.set(docRef,object)
      
    });
    await batch.commit()
    console.log('done')
  }

  export const getCategoriesAndDocuments=async()=>{
    const collectionRef=collection(db,'categories')
    const q=query(collectionRef)

    const querySnapShot=await getDocs(q)
    const categoryMap= querySnapShot.docs.reduce((acc,docSnapShot)=>{
      const {title,items}=docSnapShot.data()
      acc[title.toLowerCase()]=items;
      return acc;
    },[])
    return categoryMap;
  }

  export const signInWithGooglePopup=()=>signInWithPopup(auth,provider)
  export const signInWithGoogleRedirect=()=>signInWithRedirect(auth,provider)

  export const db= getFirestore()

  //create user reference
  export const createUserDocumentFromAuth=async(userAuth,additionalInformation={})=>{
    if(!userAuth) return;


    const userDocRef =doc(db,'users',userAuth.uid)


     
// to check data exists in database or not
const userSnapshot = await getDoc(userDocRef)
console.log(userDocRef)

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