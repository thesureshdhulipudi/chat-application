import { useState } from "react";
import { useSelector } from "react-redux";
import ThirdParty from "../ThirdParty/ThirdParty";
import "./SignUp.css";

const SignUp = (props) => {

    const [signupForm, setSignupForm] = useState({ userId: '', password: '', firstName: '', lastName: '' })

    const signUpData = useSelector(state => state.signUp);
    const handleInputChange = e => {
        setSignupForm({
            ...signupForm,
            [e.target.name]: e.target.value
        })
    }
    const createAccount = () => {
        props.createAccount(signupForm);
    }
    const gotoLogin = () =>{
        console.log("sign up");
        props.gotoLogin();
    }

    return (
        <div className="signup-container">
            {console.log("signUpData",signUpData)}
            <div className="signup-form">
            <div className={!signUpData.isError ? 'c-success':'c-error'}>{signUpData.message}</div>
                <div className="mb-3">
                    <label className="form-label">User Id</label>
                    <input type="email" className="form-control" name="userId" onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" onChange={handleInputChange} />
                </div>
                <div className="mb-3" style={{ display: "table" }}>
                    <div style={{ display: "table-row" }}>
                        <div style={{ display: " table-cell" }}>
                            <label className="form-label">First Name</label>
                            <input type="email" className="form-control" name="firstName" onChange={handleInputChange} />
                        </div>
                        <div style={{ display: " table-cell" }}>
                            <label className="form-label">Last Name</label>
                            <input type="email" className="form-control" name="lastName" onChange={handleInputChange} />
                        </div>
                    </div>
                </div>
                <div></div>
                <div><button type="submit" className="btn btn-success" style={{float:'right'}}  onClick={createAccount}>Create Account</button></div>
                <div><button type="submit" className="btn btn-info" onClick={gotoLogin}>Go to Login!</button></div>
                
            </div>
            {/* <ThirdParty
                submitRequest={signupForm}
            /> */}
        </div>
    )

}
export default SignUp;