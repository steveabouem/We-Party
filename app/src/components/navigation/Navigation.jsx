import React from "react";
import {connect} from "react-redux";
import {logout} from "../../actions";
import NavDropDown from "./NavDropDown";
const firebase = require("firebase");

class Navigation extends React.Component {
  constructor () {
    super();
    this.state = {
      isMenuOpen: false,
      currentUser: firebase.auth().currentUser
    };
  }

  toggleMenu = () => {
    this.setState({
      isMenuOpen: !this.state.isMenuOpen
    });
  };

  logout = async() => {
    await this.props.logout();
  };

 
  render() {
    return (
      <div className="navigation-container">
        <div className="navigation-left">
          <span>
            WeParty!
          </span>
        </div>
        <div className="navigation-right">
          <span className="user-name">
              {firebase.auth().currentUser ? firebase.auth().currentUser.displayName : "Guest"}
          </span>
          <a className="menu-toggle" onClick={this.toggleMenu}>
            <span className="material-icons">
              menu
            </span>
          </a>
          { this.state.isMenuOpen 
            &&
            <NavDropDown 
              toggleMenu={this.toggleMenu} 
              isMenuOpen={this.state.isMenuOpen} 
              logout={this.logout}
              currentUser={this.props.currentUser}
            />
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.userInfo
});

export default connect(mapStateToProps, {logout}) (Navigation) 