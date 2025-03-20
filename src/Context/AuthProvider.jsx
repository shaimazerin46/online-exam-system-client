import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../Firebase/firebase.config";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext()

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

   useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, currentUser=>{
        setuser(currentUser);
        setLoading(false)
    })
    return ()=>unsubscribe()
   },[])
    
    const authInfo = {
        createUser,user,loading,updateProfileUser
    }
    return <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>
};

export default AuthPrivider;