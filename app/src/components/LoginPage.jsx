import React from "react";
import { saveUser,loadUsersCollection } from "../actions/index";
import { connect } from "react-redux";
import { Row, Col } from 'reactstrap';
import GoogleButton from "./GoogleButton.jsx";
import FacebookButton from "./FacebookButton";


class LoginPage extends React.Component {
  
  googleStyle = {
    position:"absolute",
    top: "40%"
  }
  facebookStyle = {
    position:"absolute",
    top: "52%"
  }
  
  getUser = async (userInfo) =>{
    await this.props.loadUsersCollection()
    this.props.saveUser(userInfo);
    this.props.history.push("/home")
  }

  render(){
    console.log(this.props, this.state)
    return(
      <div className="login-page">
        <Row>
          <span className="instructions-primary" style={{position: "absolute", top: "25%", background: "none"}}>
            <p> 
              This will automatically sign you in with the current google credentials.
              <br/> 
              To use a different email, please log out of google in your browser. 
            </p>
          </span>
          <Col style={this.googleStyle}>
            <span className="buttons-wrapper">
              <GoogleButton className="google-button" getUser={this.getUser} />
              <FacebookButton id="facebook-button" getUser={this.getUser} />
            </span>
          </Col>
        </Row>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  userInfo: state.userInfo
})
export default connect(mapStateToProps, { saveUser, loadUsersCollection })(LoginPage);
