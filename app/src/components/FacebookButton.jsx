import React from 'react';
import FacebookLogin from 'react-facebook-login';
import { fbToken } from "../utils/secrets"

 
class FacebookButton extends React.Component {
  responseFacebook = (response) => {
    console.log(response);
  }
  
  render(){
    return(
    <FacebookLogin
      appId={fbToken}
      autoLoad={true}
      fields="name,email,picture"
      textButton="Facebook"
      callback={this.responseFacebook} />
    )
  }
}

export default FacebookButton