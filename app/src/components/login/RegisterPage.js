import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {sendLink, registerUser} from "../../actions";
import Modal from "../modals";
import GoogleButton from "./GoogleButton";
import { Loading } from "../Loading";


class Registration extends React.Component {
    constructor() {
        super();
        this.state = {
            isModalOpen: false,
            loaded: false,
        };
    }

    registerUser = e => {
        e.preventDefault();
        let username = document.getElementsByName("username")[0].value,
        email = document.getElementsByName("email")[0].value,
        password = document.getElementsByName("password")[0].value,
        confirmPassword = document.getElementsByName("password2")[0].value;
        if(confirmPassword !== password) {
            this.setState({
                isModalOpen: true,
                modalMessage: "Passwords do not match."
            });
        } else if(username.length < 3 || password.length < 6 || confirmPassword.length < 6) {
            this.setState({
                isModalOpen: true,
                modalMessage: "Username is less than 3 or password less than 6."
            });
        } else {
            this.props.registerUser(username, email, password);
            this.setState({
                isModalOpen: true,
                modalMessage: "Check your email"
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

    // componentDidUpdate(prevProps) {
    //    if(this.props.userInfo.ErrorMessage && this.props.userInfo.ErrorMessage !== prevProps.userInfo.ErrorMessage) {
    //       this.setState({
    //         isModalOpen: true,
    //         modalMessage: this.props.userInfo.ErrorMessage.message ? this.props.userInfo.ErrorMessage.message : this.props.userInfo.ErrorMessage
    //       });
    //     }
    //   }

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
                    cancel={this.closeModal}
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
                        <label style={{color: "#FFD951"}}>Skip registration by using your google account</label>
                        <GoogleButton/>
                        <label>
                            Username
                        </label>
                        <input type="text" placeholder="Jane Dough" name="username" required={true}/>
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
  

export default connect(mapStateToProps, {registerUser, sendLink}) (Registration);