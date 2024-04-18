import {  signInWithEmailAndPassword, signOut } from "firebase/auth";
import React, { useContext ,useEffect} from "react";
import { createContext, useState } from "react";
import {auth} from "../config/firebase" 


const AuthContext = createContext();
export function useAuth(){
    return useContext(AuthContext);
}
export function AuthProvider(props){
    const [currentUser ,setCurrentUser] = useState();
    const [loading,setLoading] = useState(true);

    function login(email,password){
        return signInWithEmailAndPassword(auth,email,password);
    }
    function logout(){
        return signOut(auth);
    }
    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged(user =>{
            setCurrentUser(user);
            setLoading(false);  
        })
        return unsubscribe
    },[])
    

    const value={
        currentUser,
        login,
        logout
    }

    return(
        <div>
            <AuthContext.Provider value={value}>
                {!loading && props.children}
            </AuthContext.Provider>
        </div>
    );
}