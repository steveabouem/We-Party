import React from 'react';
import "firebase/database";
import {connect} from "react-redux";
import Modal from "../modals";
import {sendLink, saveUser} from "../../actions";
import {loginInfo} from "../modals/content";

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

  saveUser = async() => {
    let first = this.state.firstName,
    last = this.state.lastName,
    email = this.state.email,
    password = this.state.password,
    userInfo = { displayName: `${first} ${last}`, email: email, oAuth: "Form", password:password};
    
    await this.props.createAuthUser(userInfo);
    await this.props.saveUser(userInfo);
  }

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

  closeInfoModal = () => {
    this.setState({
      isInfoModalOpened: false
    });
  }

  closeModal = () => {
    this.setState({
      isErrorModalOpened: false,
    });
  }

  sendLink = (e) => {
    e.preventDefault();
    let email = document.getElementsByName("email")[0].value;
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
              cancel={this.closeInfoModal}
              top="20%"
              left="33%"
            />
          }
        <form className="login-form">
          <label>
            Username
          </label>
          <input type="text" placeholder="Jane Dough" name="username"/>
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
          <input type="email" placeholder="@" name="email" isrequired onClick={this.openInfoModal} />
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

export default connect (mapStateToProps, {sendLink})(LoginForm);

