import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {sendLink, registerUser, saveUser} from "../../actions";
import Modal from "../modals";
import GoogleButton from "./GoogleButton";
import { Loading } from "../Loading";
const firebase = require("firebase");


class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            loaded: false,
        };
        firebase.auth().onAuthStateChanged(currentUser => {
            if(currentUser !== null) {
                currentUser.sendEmailVerification()
                .then( () => {
                    this.setState({ 
                        currentUser: currentUser,
                        isModalOpen: true,
                        modalMessage: "Welcome to WeParty!.",
                        userSaved: true
                     });
                })
                .catch( e => {
                    this.setState({ 
                        currentUser: currentUser,
                        isModalOpen: true,
                        modalMessage: "You will shortly receive a confirmation email for your registration.",
                    });
                    
                });
            }
        });
    }

    registerUser = async (e) => {
        e.preventDefault();
        let email = document.getElementsByName("email")[0].value,
        password = document.getElementsByName("password")[0].value,
        confirmPassword = document.getElementsByName("password2")[0].value;
        if(confirmPassword !== password) {
            this.setState({
                isModalOpen: true,
                modalMessage: "Passwords do not match."
            });
        // } else if(username.length < 3 || password.length < 6 || confirmPassword.length < 6) {
        //     this.setState({
        //         isModalOpen: true,
        //         modalMessage: "Username is less than 3 or password less than 6 characters."
        //     });
        } else {
            console.log("processing registration");
            this.props.registerUser(email, password);
        }
    }

    get redirect () {
        return <span>Proceed to <a href="/home">home page</a></span>;
    }
    
    redirectUser = async e => {
        e.preventDefault()
        if(this.state.currentUser){
            await this.props.saveUser(this.state.currentUser);
            this.setState({
                isModalOpen: true,
                modalMessage: this.redirect,
            });
        }
    }
    
    closeModal = () => {
        this.setState({
            isModalOpen: false
        });
    }
    
    componentDidMount() {
        this.setState({
            loaded: true
        });
    }

    render() {
        return (
            <div className="landing-page registration">
             {
                this.state.isModalOpen 
                &&
                <Modal
                    callBack={null}
                    isOpened={this.state.isModalOpened} 
                    hasConfirm={false}
                    hasCancel={true}
                    message={this.state.modalMessage}
                    cancel={
                        this.state.userSaved ? e=>{this.redirectUser(e)} 
                        // : 
                        // this.state.modalAction ? e=>{this.state.modalAction(e)}
                        : 
                        e=>{this.closeModal(e)}
                    }
                    top="20%"
                    left="33%"
                />
                }
                <div className="slider-divs"/>
                <div className="slider-divs"/>
                <div className="slider-divs"/>
                <div className="white-box">
                    { !this.state.loaded ? <Loading size="large" />  :
                    <form className="login-form">
                        <label style={{color: "#FFD951", textAlign: "center"}}>Register using your google account</label>
                        <GoogleButton/>

                        <label>
                            Email
                        </label>
                        <input type="email" placeholder="my@email.com" name="email" required={true}/>

                        <label>
                            Password
                        </label>
                        <input type="password" name="password" required={true}/>

                        <label>
                            Confirm password
                        </label>
                        <input type="password" name="password2" required={true}/>

                        <button type="button" className="button-primary" onClick={e => {this.registerUser(e)}}>
                            REGISTER
                        </button>
                        <span> 
                            Already a member? 
                                <Link 
                                    to={{
                                        pathname: "/",
                                            state: {
                                                fromLogout: true,
                                            }
                                    }}
                                >
                                    Login
                                </Link>
                        </span>
                    </form>
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    userInfo: state.userInfo
});
  

export default connect(mapStateToProps, {registerUser, sendLink, saveUser}) (Registration);