import React from 'react';
import FacebookLogin from 'react-facebook-login';

 
class FacebookButton extends React.Component {
  responseFacebook = (response) => {
    console.log(response);
  }
  
  render(){
    return(
    <FacebookLogin
      appId='472475886498825'
      autoLoad={true}
      fields="name,email,picture"
      textButton="Facebook"
      callback={this.responseFacebook} />
    )
  }
}

export default FacebookButton