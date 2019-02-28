import React from "react";
import { Link } from "react-router-dom";
import {LoginSection} from "./login/LoginPage"
import { saveUser,loadUsersCollection, createAuthUser } from "../actions";
import {connect} from "react-redux";


class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      loginForm: false
    }
  }

  toggleForm = () => {
    this.setState({
      loginForm: !this.state.loginForm
    });
  };

  getUser = async (userInfo) =>  {
    await this.props.loadUsersCollection();
    await this.props.saveUser(userInfo);
    this.props.history.push("/home")
  }

  render(){
    return( 
        <div className="landing-page">
        <div className="slider-divs"/>
        <div className="slider-divs"/>
        <div className="slider-divs"/>
        <div className="white-box">
          {
            this.state.loginForm ? 
            <LoginSection createAuthUser={this.props.createAuthUser} saveUser={this.getUser} getUser={this.getUser} history={this.props.history}/>
            :
            <div>
            <h1> We-Party </h1>
              <p className="tagline"> Our goal? Allow people to organise group activities on one single platform.
                  Location? Prices? Suggestions? We got you covered!
              </p>
              <p>
                  Get started <a onClick={this.toggleForm}> here </a>. 
              </p>
            </div>
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.userInfo
});

export default connect(mapStateToProps, { saveUser,loadUsersCollection, createAuthUser }) (HomePage)