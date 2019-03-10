import React from "react";
import { SlideToggle } from 'react-slide-toggle';
import LoginForm from "./LoginForm";
import GoogleButton from "./GoogleButton.jsx";

export class LoginSection extends React.Component {
  constructor() {
    super();
  }

  render() {
    let {getUser, history} = this.props;

    return (
        <div className="login-actions">
              <div className="choices">
                <GoogleButton saveUser={getUser} getUser={getUser} history={history}/>
                <SlideToggle duration={300} collapsed bestPerformance
                 render ={({onToggle, setCollapsibleElement}) => 
                   (
                  <div>
                    <button className="button-primary" id="choose-email" onClick={onToggle}>
                      EMAIL 
                    </button>
                    <div className="hidden-form" ref={setCollapsibleElement}>
                      <LoginForm saveUser={getUser}/>
                    </div>
                  </div>
                 )}
                 />
              </div>
              <span> Not a member yet? <a>Register</a></span>
            </div>
      );
  }
}