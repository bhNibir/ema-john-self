import React from 'react';
import Auth from './useAuth';


const Login = () => {
    const auth = Auth()
    console.log(auth.user);
    
    return (
        <div>
            {
                auth.user ? <button onClick={auth.signOut}>Sign Out</button> :
                 <button onClick={auth.signInWithGoogle}>Login</button> 

            }
        </div>
    );
};

export default Login;