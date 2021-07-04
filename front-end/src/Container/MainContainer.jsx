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
        this.signIn = this.signIn.bind(this);
        this.signUp = this.signUp.bind(this);
    }

    signIn(payload) {
        console.log(payload);
        this.props.signIn(payload).then(() => {

        });
    }
    signUp(payload) {
        console.log(payload);
        this.props.signUp(payload).then(() => {
            this.setState({
                isSignIn: true
            })
        });
    }
    handleScroll = (e) => {
        // if (e.target.classList && e.target.classList.contains("on-scrollbar") === false) {
        //     e.target.classList.add("on-scrollbar");
        // }
    }
    render() {
        return (
            <div className="main-container">
                {/* {window.addEventListener('scroll', this.handleScroll, true)} */}
                {this.props.loginInfo && this.props.loginInfo.data ? null :
                    <div className="signin-signup-div">
                        <button onClick={e => { this.setState({ isSignIn: true }) }}>SignIn</button>
                        <button onClick={e => { this.setState({ isSignIn: false }) }}>SignUp</button>
                    </div>
                }
                {this.props.loginInfo && this.props.loginInfo.data ?
                    <ChatContainer
                        loginInfo={this.props.loginInfo}
                    />
                    : (this.state.isSignIn ?
                        <Login signIn={this.signIn} />
                        :
                        <SignUp signUp={this.signUp} />
                    )
                }
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        loginInfo: state.loginInfo
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