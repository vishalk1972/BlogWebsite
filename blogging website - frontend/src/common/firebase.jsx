import { initializeApp } from "firebase/app";
import {GoogleAuthProvider, getAuth, signInWithPopup} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyAu3DrxOSsgD5PUDb0WtwfQq4uAUDwSaME",
  authDomain: "react-js-blog-website-7a163.firebaseapp.com",
  projectId: "react-js-blog-website-7a163",
  storageBucket: "react-js-blog-website-7a163.appspot.com",
  messagingSenderId: "748843280340",
  appId: "1:748843280340:web:6bf05bb8fded409d535841"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


//google auth form
const provider=new GoogleAuthProvider();
const auth=getAuth()

export const authWithGoogle=async()=>{
    let user=null;
    await signInWithPopup(auth,provider)
    .then((result)=>{
        user=result.user;
    })
    .catch((err)=>{
        console.log(err);
    })
    return user;
}