import { createUserWithEmailAndPassword, FacebookAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../Firebase/firebase.config";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext()
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const AuthPrivider = ({children}) => {
    const [loading,setLoading] = useState(true);
    const [user,setuser] = useState(null);

    const createUser = (email,password)=>{
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const updateProfileUser = (name,photo)=>{
        return updateProfile(auth.currentUser,{
            displayName: name,
            photoURL: photo
        })
        .then(()=>{
            setuser({...auth.currentUser})
        })
    }

    const googleLogin = ()=>{
        return signInWithPopup(auth,googleProvider)
    }

    const facebookLogin = ()=>{
        return signInWithPopup(auth,facebookProvider)
    }
    const login = (email,password)=>{
        return signInWithEmailAndPassword(auth,email,password)
    }
    const logout = ()=>{
        return signOut(auth)
    }

   useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, currentUser=>{
        setuser(currentUser);
        setLoading(false)
    })
    return ()=>unsubscribe()
   },[])
    
    const authInfo = {
        createUser,user,loading,updateProfileUser,logout,googleLogin,facebookLogin,login
    }
    return <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>
};

export default AuthPrivider;