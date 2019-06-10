import React from "react";
import {LoginSection} from "./login/LoginPage"
import {connect} from "react-redux";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginForm: props.history.location.state
    }
  }

  toggleForm = () => {
    this.setState({
      loginForm: !this.state.loginForm
    });
  };

  getUser = async (userInfo) =>  {
    this.props.history.push("/home");
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
              <LoginSection getUser={this.getUser} history={this.props.history} userInfo={this.props.userInfo}/>
              :
              this.props.history.location.state ? 
              <LoginSection getUser={this.getUser} history={this.props.history} userInfo={this.props.userInfo}/>
              :              
              <div>
              <h1> We-Party </h1>
              <h3> Rediscover people!</h3>
                <p className="tagline"> Our goal? Allow people to create connections with like minded peers by organising group activities on this platform.
                    Location? Prices? Suggestions? We got you covered:)
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

export default connect(mapStateToProps, {}) (HomePage)