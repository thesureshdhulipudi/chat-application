import React from 'react';
import { connect } from 'react-redux';
import Login from '../Componet/Login/Login';
import SignUp from '../Componet/SignUp/SignUp';
import { signInAPI, signUpAPI } from '../Services/APIService';
import ChatContainer from './Chat/ChatContainer';
import './MainContainer.css';

class MainContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSignIn: true,
        }
        this.createAccount = this.createAccount.bind(this);
        this.signIn = this.signIn.bind(this);
        this.gotoLogin = this.gotoLogin.bind(this);
    }

    createAccount(payload) {
        console.log(payload);
        this.props.signUp(payload)
        .then(()=>{
            console.log(this.props.signUpData);
             if(this.props.signUpData && !this.props.signUpData.isError){
                setTimeout(() => this.setState({ isSignIn: true }), 2000);
             }else{
                this.setState({
                    isSignIn: false
                })
             }
            
         })
    }
    signIn(payload) {
        console.log(payload);
        this.props.signIn(payload);
        
    }
    gotoLogin() {
        this.setState({
            isSignIn: true
        })
    }
    handleScroll = (e) => {
        // if (e.target.classList && e.target.classList.contains("on-scrollbar") === false) {
        //     e.target.classList.add("on-scrollbar");
        // }
    }
    render() {
        return (
            <div>
                {console.log("m -loginInfo",this.props.loginInfo)}
                {this.props.loginInfo && !this.props.loginInfo.isLogin ?
                    <div className="main-container">
                        <div className="main-login-container">
                            {/* {window.addEventListener('scroll', this.handleScroll, true)} */}

                            <div className="signin-signup-div">
                                <span>Welcome to Chat Application</span>
                            </div>
                            {(this.state.isSignIn ?
                                <div>
                                    <Login signIn={this.signIn}
                                    loginInfo={this.props.loginInfo} />
                                    <button className="btn-info c-cbtn-sign-up" onClick={e => { this.setState({ isSignIn: false }) }}>Create Account!</button>
                                </div>
                                :
                                <SignUp createAccount={this.createAccount} gotoLogin={this.gotoLogin} />
                            )
                            }

                        </div>
                    </div>
                    : <ChatContainer
                        loginInfo={this.props.loginInfo}
                    />}
            </div>

        )
    }
}
function mapStateToProps(state) {
    return {
        loginInfo: state.loginInfo,
        signUpData: state.signUp
    }
}
function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        signIn: (payload) => dispatch(signInAPI(payload)),
        signUp: (payload) => dispatch(signUpAPI(payload))

    }

}

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(MainContainer);