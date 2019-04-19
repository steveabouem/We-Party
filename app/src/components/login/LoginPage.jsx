import React from "react";
import LoginForm from "./LoginForm";
import GoogleButton from "./GoogleButton.jsx";

export class LoginSection extends React.Component {

  render() {
    let {getUser, history, userInfo} = this.props;

    return (
        <div className="login-actions">
              <div className="choices">
                <div>
                  <div className="hidden-form">
                    <LoginForm history={this.props.history}/>
                  </div>
                </div>
                <label htmlFor="google-button">
                  Or use your GOOGLE account.
                </label>
                <GoogleButton getUser={getUser} history={history}/>
              <span> Not a member yet? <a href="./register">Register</a></span>
            </div>
          </div>
      );
  }
}