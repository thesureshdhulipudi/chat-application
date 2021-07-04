import { useState } from "react";
import ThirdParty from "../ThirdParty/ThirdParty";

const SignUp = (props) => {

    const [signupForm, setSignupForm] = useState({ userId: '', password: '', firstName: '', lastName: '' })

    const handleInputChange = e => {
        setSignupForm({
            ...signupForm,
            [e.target.name]: e.target.value
        })
    }
    const signUp = () => {
        props.signUp(signupForm);
    }

    return (
        <div className="signup-container">
            <div className="signup-form">
                <div className="mb-3">
                    <label className="form-label">User Id</label>
                    <input type="email" className="form-control" name="userId" onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">First Name</label>
                    <input type="email" className="form-control" name="firstName" onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Last Name</label>
                    <input type="email" className="form-control" name="lastName" onChange={handleInputChange} />
                </div>
                
                <button type="submit" className="btn btn-primary" onClick={signUp}>Sign Up</button>
            </div>
            <ThirdParty
                submitRequest={signupForm}
            />
        </div>
    )

}
export default SignUp;