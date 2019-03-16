import React from "react";
import { SlideToggle } from 'react-slide-toggle';
import LoginForm from "./LoginForm";
import GoogleButton from "./GoogleButton.jsx";

export class LoginSection extends React.Component {

  render() {
    let {getUser, history, userInfo} = this.props;

    return (
        <div className="login-actions">
              <div className="choices">
                <GoogleButton getUser={getUser} history={history}/>
                <SlideToggle duration={300} collapsed bestPerformance
                 render ={({onToggle, setCollapsibleElement}) => 
                   (
                  <div>
                    <button className="button-primary" id="choose-email" onClick={onToggle}>
                      EMAIL 
                    </button>
                    <div className="hidden-form" ref={setCollapsibleElement}>
                      <LoginForm history={this.props.history}/>
                    </div>
                  </div>
                 )}
                 />
              </div>
              <span> Not a member yet? <a href="./register">Register</a></span>
            </div>
      );
  }
}