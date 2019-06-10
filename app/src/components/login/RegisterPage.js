import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {sendLink, registerUser, saveUser} from "../../actions";
import Modal from "../modals";
import SurveyForm from "../survey/SurveyForm";
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
                this.setState({ 
                    currentUser: currentUser,
                    isModalOpen: true,
                    hasConfirm: true,
                    modalMessage: "Welcome to WeParty!.",
                    userSaved: true
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
                hasConfirm: true,
                modalMessage: "Passwords do not match."
            });
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
            this.setState({
                isModalOpen: true,
                hasLink: true,
                hasConfirm: false,
                link: "/home",
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
                    hasCancel={this.state.hasConfirm}
                    hasLink={this.state.hasLink}
                    link={this.state.link}
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