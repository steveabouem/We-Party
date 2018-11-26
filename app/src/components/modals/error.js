import React from "react";
import { connect } from "react-redux";

class ErrorMessage extends React.Component {
  
  render () {
    console.log("Error message props", this.props);
    return (
      
      this.props.error? 
      <div className="error-popup">
        <p>{this.props.error}</p>
      </div>
        :
        null
      
    )
  }
}

const mapStateToProps = state => ({
  error: state.userInfo.error
})

export default connect (mapStateToProps) (ErrorMessage)