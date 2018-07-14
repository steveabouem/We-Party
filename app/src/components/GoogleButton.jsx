import React from 'react';
import { GoogleLogin } from 'react-google-login';

 
class GoogleButton extends React.Component {
  responseGoogle = (response) => {
    console.log(response);

  }
  
  render(){
    return (
      <GoogleLogin
      clientId={process.env.GOOGLE_ID} not working
      buttonText="Google"
      ux_mode='redirect'
      redirectUri='/home'
      accessType='online'
      onSuccess={this.responseGoogle}
      onFailure={this.responseGoogle}
      />
      )
  }
}

export default GoogleButton