import React from "react";
import {connect} from "react-redux";
import {sendLink, registerUser} from "../../actions";

class Registration extends React.Component {
    constructor() {
        super();
        
    }

    render() {
        return (
            <div className="landing-page">
          <div className="slider-divs"/>
          <div className="slider-divs"/>
          <div className="slider-divs"/>
          <div className="white-box">
            <form className="login-form">
                <label>
                    Username
                </label>
                <input type="text" placeholder="Jane Dough" name="username"/>
                <label>
                    Password
                </label>
                <input type="password" placeholder="@#*(#" name="password"/>
                <button className="button-primary">
                    REGISTER
                </button>
            </form>
          </div>
        </div>
        );
    }
}

const mapStateToProps = state => ({
  registered: state.registered
});

export default connect(mapStateToProps, {registerUser, sendLink}) (Registration);