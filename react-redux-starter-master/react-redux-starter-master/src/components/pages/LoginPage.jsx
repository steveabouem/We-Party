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

  render(){
    console.log(this.props.userSession)
    return(
      <div className="login-page">
        <Row>
          <Col>
            <GoogleButton className="google-button"/>
          </Col>
          <Col>
            <FacebookButton />
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(null, { userSession })(LoginPage);
