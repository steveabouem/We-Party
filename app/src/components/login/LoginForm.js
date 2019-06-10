import React from 'react';
import "firebase/database";
import {connect} from "react-redux";
import Modal from "../modals";
import {sendLink, loginUser, saveUser} from "../../actions";
import {loginInfo} from "../modals/content";
import {Loading} from "../Loading";
const firebase = require("firebase");

class LoginForm extends React.Component {
  state = {
    showPassword: false,
    isErrorModalOpened: false,
    isInfoModalOpened: false,
    infoPreview: false,
    loaded: false,
  };

  emailProvider = () => {
    let email = document.getElementsByName("email-link")[0].value;
    return("https://" + email.split("@")[1])
  };

  togglePassView = () => {
    this.setState({
      showPassword: !this.state.showPassword
    });
  }

  openInfoModal = () => {
    this.setState({
      isInfoModalOpened: true,
      infoPreview: !this.state.infoPreview
    });
  }

  closeModal = () => {
    this.setState({
      isErrorModalOpened: false,
      isInfoModalOpened: false,
    });
  }

  passwordLogin = async (e) => {
    e.preventDefault();
    let email = document.getElementsByName("email-login")[0].value,
    password = document.getElementsByName("password")[0].value;

    await this.props.loginUser(email, password);
  }

  sendLink = (e) => {
    e.preventDefault();
    let email = document.getElementsByName("email-link")[0].value;
    let username = document.getElementsByName("username-link")[0].value;
    
    this.props.sendLink(email, username);
    if(!this.props.userInfo.message) {
      this.setState({
        isErrorModalOpened:true,
        modalMessage:
          <span>Link succesfully sent to your email adress: Check it
             &nbsp;<a href={this.emailProvider()} target="_blank">here</a>
          </span>
      });
    }
  }

  componentDidMount() {
    this.setState({
      loaded: true
    });
  }

  componentDidUpdate(prevProps) {
    if(firebase.auth().currentUser) {
      this.props.history.push("/home");
    } else if(this.props.userInfo.ErrorMessage && this.props.userInfo.ErrorMessage !== prevProps.userInfo.ErrorMessage) {
      this.setState({
        isErrorModalOpened: true,
        modalMessage: this.props.userInfo.ErrorMessage.message ? this.props.userInfo.ErrorMessage.message : this.props.userInfo.ErrorMessage
      });
    }
  }

  render() {
    return !this.state.loaded ?
      <Loading size="medium" />
      :
      (
      <div>
        {
          this.state.isErrorModalOpened 
          &&
          <Modal
            callBack={null}
            isOpened={this.state.isErrorModalOpened} 
            hasConfirm={false}
            hasCancel={true}
            message={this.state.modalMessage}
            cancel={this.closeModal}
            top="20%"
            left="33%"
          />
        }
        {
            this.state.isInfoModalOpened && this.state.infoPreview
            &&
            <Modal
              callBack={null}
              isOpened={this.state.isInfoModalOpened} 
              hasConfirm={false}
              hasCancel={true}
              message={loginInfo.summary}
              cancel={this.closeModal}
              top="20%"
              left="33%"
            />
          }
        <form className="login-form">
          <label>
            Email
          </label>
          <input type="email" name="email-login"/>
          <label>
            Password
          </label>
          <input type="password" name="password"/>
          <button className="button-primary" onClick={e => {this.passwordLogin(e)}}>
            BEGIN
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userInfo: state.userInfo
});

export default connect (mapStateToProps, {sendLink, loginUser, saveUser})(LoginForm);

