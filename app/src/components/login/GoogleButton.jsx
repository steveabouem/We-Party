import React from "react";
import "firebase/database";
import { connect } from "react-redux";
import { saveUser } from "../../actions";
const firebase = require("firebase");

class GoogleButton extends React.Component {
  constructor(props){
    super(props)
    this.login = this.login.bind(this)
  }
  
  login = async () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .then( res => {
      const userInfo = { name: res.user.displayName, email: res.user.email, oAuth: "google", picture: res.user.photoURL}
      this.props.getUser(userInfo)
    })
    .catch( e => {
      console.log("Google login error", e);
    });
  }
  
  render(){
    return (
      <button
        onClick={this.login}
      >
        GOOGLE
      </button>
      )
    }
  }
  
  const mapStateToProps = state => ({
    userInfo: state.userInfo
  })
  
  export default connect (mapStateToProps, {saveUser}) (GoogleButton)