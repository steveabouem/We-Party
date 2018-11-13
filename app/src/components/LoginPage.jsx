import React from "react";
import { connect } from "react-redux";
import { SlideToggle, callFunction } from 'react-slide-toggle';
import LoginForm from "../utils/LoginForm";
import { saveUser,loadUsersCollection, createAuthUser } from "../actions/index";
import GoogleButton from "./GoogleButton.jsx";
import FacebookButton from "./FacebookButton";


class LoginPage extends React.Component {

  getUser = async (userInfo) =>{
    console.log("getuser", userInfo);
    
    await this.props.loadUsersCollection();
    await this.props.saveUser(userInfo);
    
    this.props.history.push("/home")
  }

  render(){
    console.log(this.props);
    
    return(
      <div className="login-page">
      <div className="curtain">
        <div className="login-actions">
          <span className="instructions-primary">
              Select an account to log in
          </span>
          <div className="choices">
            <GoogleButton  createAuthUser={this.props.createAuthUser} saveUser={this.getUser} getUser={this.getUser} />
            <FacebookButton createAuthUser={this.props.createAuthUser} saveUser={this.getUser} getUser={this.getUser} />
            <SlideToggle duration={300} collapsed bestPerformance
             render={({onToggle, setCollapsibleElement}) => (
              <div>
                <button className="button-primary" id="choose-email" onClick={onToggle}>
                  EMAIL 
                </button>
                <div className="hidden-form" ref={setCollapsibleElement}>
                  <LoginForm createAuthUser={this.props.createAuthUser} saveUser={this.getUser}/>
                </div>
              </div>
             )}
            />
          </div>
        </div>
      </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  userInfo: state.userInfo
})
export default connect(mapStateToProps, { saveUser, loadUsersCollection, createAuthUser })(LoginPage);
