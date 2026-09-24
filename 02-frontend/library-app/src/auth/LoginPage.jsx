import React from 'react';
import { useAuth0 } from "@auth0/auth0-react"

export const LoginPage = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <div className="container mt-5">
            <div className="card p-4 shadow justify-content-center align-items-center">
                <h2>Welcome in Library app</h2>
                <p className='fw-bold'>Sign in to access the books</p>
                <button 
                    className="btn btn-primary"
                    onClick={() => loginWithRedirect()}
                >
                    🔐 Prijavi se
                </button>
            </div>
        </div>
    );

}