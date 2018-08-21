import React from "react";
import { saveUser,loadUsersCollection } from "../actions/index";
import { connect } from "react-redux";
import { Row, Col } from 'reactstrap';
import GoogleButton from "./GoogleButton.jsx";
import FacebookButton from "./FacebookButton";


class LoginPage extends React.Component {
  
  componentDidMount() {
    this.props.loadUsersCollection()
    console.log('props with db?', this.props);
  }
  onSubmit = async(e) => {
    const user = e.target.loginemail.value;
    this.props.saveUser(user);
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

  getUser =(userInfo) =>{
    if (userInfo !== undefined)
    this.props.saveUser(userInfo);
    this.props.history.push("/home")
  }

  render(){
    console.log(this.props, this.state)
    return(
      <div className="login-page">
        <Row>
          <Col style={this.googleStyle}>
            <GoogleButton className="google-button" getUser={this.getUser}/>
          </Col>
          <Col style={this.facebookStyle}>
            <FacebookButton />
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
