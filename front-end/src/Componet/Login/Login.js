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
                    <input type="email" className="form-control c-sign-in-user-id" name="userId" onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control c-sign-in-psw" name="password" onChange={handleInputChange} />
                </div>
                <div style={{paddingBottom: '10px',color:'red'}} ><span>{props.loginInfo.message}</span></div>
                
                <button type="submit" className="btn btn-primary c-btn-sign-in" onClick={login}>Login</button>
            </div>

            {/* <ThirdParty
                submitRequest={login}
            /> */}

        </div>
    )

}
export default Login;