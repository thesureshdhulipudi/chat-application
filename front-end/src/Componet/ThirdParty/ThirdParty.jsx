import { useState } from "react";
import GoogleLogin from "react-google-login";

const ThirdParty = (props) => {

    const [signupForm, setSignupForm] = useState({ userId: '', firstName: '', lastName: '' })

    const googleLoginSuccess = (googleResponse) => {
        if(googleResponse && googleResponse.profileObj){
            setSignupForm({
                userId: googleResponse.profileObj.email,
                firstName: googleResponse.profileObj.firstName,
                lastName: googleResponse.profileObj.lastName
            });
            props.submitRequest(signupForm);
        }else{
            alert("Google Login Failed")
        }
        
    }
    return (
        <div>
            <GoogleLogin
                clientId="809584238866-q4n3hl8kr9leiv8pj08n7b3q8um0d4h2.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={googleLoginSuccess}
                onFailure={googleLoginSuccess}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    )
}
export default ThirdParty;