import * as firebase from "firebase/app";

import "firebase/auth";
import firebaseConfig from "../../firebase.config"
import { useState } from "react";
import React, { createContext } from "react";
import { useContext } from "react";
import { useEffect } from "react";

firebase.initializeApp(firebaseConfig);
const AuthContext = createContext()

export const AuthContextProvider = (props) => {
    const auth = Auth()
    return <AuthContext.Provider value={auth}> {props.children} </AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)

const getUser = user =>{
    const {displayName, email, photoURL} = user
    return {name : displayName, email, photo : photoURL}
}

const Auth = () => {
   const [user, setUser] = useState(null)

    const signInWithGoogle = () => {

        const provider = new firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithPopup(provider)
        .then(res => {
            const signInUser = getUser(res.user)
            setUser(signInUser)
            return res.user
        })
        .catch(err => {
            console.log(err);
            setUser(null)            
            return err.message
        })
    }

    const signOut = () => {
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
            setUser(null)            
            
          }).catch(function(error) {
            // An error happened.
          });
    }
    useEffect(() => {
        firebase.auth().onAuthStateChanged((usr) => {
            if (usr) {
              const crrUser = getUser(usr)
              setUser(crrUser)
            } else {
              // No user is signed in.
            }
          });
    },[])
    return {
        user,
        signInWithGoogle,
        signOut
        
    }
}

export default Auth