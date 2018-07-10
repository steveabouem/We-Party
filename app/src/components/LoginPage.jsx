import React from "react";
import { userSession } from "../actions/index";
import { connect } from "react-redux";
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import store from "../store";
// import GoogleButton from "./GoogleButton";

class LoginPage extends React.Component {

     onSubmit = async(e) => {
      const user = e.target.loginemail.value;
        store.getState().userInfo.user.loggedIn = user;
        this.props.userSession(user);
        this.props.history.push('/home');
    }

  render(){
    return(
      <div className="login-page">
        <Row>
          <Col>
            <h2> Login </h2>
            <Form inline onSubmit={this.onSubmit}>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="email" className="mr-sm-2">Email</Label>
                <Input type="email" name="loginemail" id="exampleEmail" placeholder="@" />
              </FormGroup>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="examplePassword" className="mr-sm-2">Password</Label>
                <Input type="password" name="login-password" id="examplePassword" />
              </FormGroup>
              <Button id="googleButton">Submit</Button>
              {/* <GoogleButton /> */}
            </Form>
          </Col>
          <Col>
            <h2> Register </h2>
            <Form inline>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="email" className="mr-sm-2">Email</Label>
                <Input type="email" name="email" id="exampleEmail" placeholder="@" />
              </FormGroup>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="examplePassword" className="mr-sm-2">Password</Label>
                <Input type="password" name="password" id="examplePassword" />
              </FormGroup>
              <Button>Submit</Button>
            </Form>
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(null, { userSession })(LoginPage);
