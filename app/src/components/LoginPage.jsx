import React from "react";
import { userSession } from "../actions/index";
import { connect } from "react-redux";
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import store from "../store";
import GoogleButton from "./GoogleButton.jsx";
import FacebookButton from "./FacebookButton";


class LoginPage extends React.Component {

  onSubmit = async(e) => {
  const user = e.target.loginemail.value;
    store.getState().userInfo.user.loggedIn = user;
    this.props.userSession(user);
    this.props.history.push('/home');
  }

  labelStyle = {
    color: "white"
  }
  googleStyle = {
    position:"absolute",
    top: "40%"
  }
  facebookStyle = {
    position:"absolute",
    top: "52%"
  }

  render(){
    console.log(this.props.userSession)
    return(
      <div className="login-page">
        <Row>
          <Col style={this.googleStyle}>
            <GoogleButton className="google-button"/>
          </Col>
          <Col style={this.facebookStyle}>
            <FacebookButton />
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(null, { userSession })(LoginPage);
