import React, { useState } from 'react';
import ThirdParty from '../ThirdParty/ThirdParty';
import './Login.css';

function Login(props) {

    const [loginForm, setLoginForm] = useState({ password: '', userId: '' });


    const login = () => {
        console.log(loginForm);
        props.signIn(loginForm);
    }

    const handleInputChange = e => {
        setLoginForm({
            ...loginForm,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="login-container">
            <div className="login-form">
                <div className="mb-3">
                    <label className="form-label">User Id</label>
                    <input type="email" className="form-control" name="userId" onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" onChange={handleInputChange} />
                </div>
                <button type="submit" className="btn btn-primary" onClick={login}>Sign In</button>
            </div>

            {/* <ThirdParty
                submitRequest={login}
            /> */}

        </div>
    )

}
export default Login;