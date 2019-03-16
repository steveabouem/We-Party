import React from 'react';
import "firebase/database";
import {connect} from "react-redux";
import Modal from "../modals";
import {sendLink, loginUser} from "../../actions";
import {loginInfo} from "../modals/content";
const firebase = require("firebase");

class LoginForm extends React.Component {
  state = {
    showPassword: false,
    isErrorModalOpened: false,
    isInfoModalOpened: false
  };

  emailProvider = () => {
    let email = document.getElementsByName("email")[0].value;
    return("https://" + email.split("@")[1])
  };

  togglePassView = () => {
    this.setState({
      showPassword: !this.state.showPassword
    });
  }

  openInfoModal = () => {
    this.setState({
      isInfoModalOpened: true
    });
  }

  closeModal = () => {
    this.setState({
      isErrorModalOpened: false,
      isInfoModalOpened: false
    });
  }

  passwordLogin = async (e) => {
    e.preventDefault();
    let email = document.getElementsByName("email-login")[0].value,
    password = document.getElementsByName("password")[0].value;
    await this.props.loginUser(email, password);
    await firebase.auth().currentUser;
  }

  sendLink = (e) => {
    e.preventDefault();
    let email = document.getElementsByName("email-link")[0].value;
    let username = document.getElementsByName("username")[0].value;
    
    this.props.sendLink(email, username);
    if(!this.props.userInfo.message) {
      this.setState({
        isErrorModalOpened:true,
        modalMessage:
          <span>Link succesfully sent to your email adress: Check it
             &nbsp;<a href={this.emailProvider()} target="_blank">here</a>
          </span>
      });
    } else {
      this.setState({
        isErrorModalOpened:true,
        modalMessage:
          <span>
            Please review your input: {this.props.userInfo.message && this.props.userInfo.message}
          </span>
      });
    }
  }

  componentDidUpdate() {
    if(firebase.auth().currentUser) {
      this.props.history.push("/home");
    }
  }
  render() {
    return (
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
            this.state.isInfoModalOpened 
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
          <input type="email" placeholder="my@email.com" name="email-login"/>
          <label>
            Password
          </label>
          <input type="password" placeholder="@#*(#" name="password"/>
          <button className="button-primary" onClick={e => {this.passwordLogin(e)}}>
            BEGIN
          </button>
          <label>
            Always use verification Link <br/> (no password required)
          </label>
          <input type="email" placeholder="@" name="email-link" isrequired onClick={this.openInfoModal} />
          <button className="button-primary" onClick={e => {this.sendLink(e)}}>
            GET LINK
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userInfo: state.userInfo
});

export default connect (mapStateToProps, {sendLink, loginUser})(LoginForm);

