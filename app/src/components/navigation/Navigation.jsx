import React from "react";
import {connect} from "react-redux";
import {logout} from "../../actions";
import NavDropDown from "./NavDropDown";

class Navigation extends React.Component {
  constructor () {
    super();
    this.state = {
      isMenuOpen: false
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
              {this.props.currentUser && this.props.currentUser.displayName}
          </span>
          <a className="menu-toggle" onClick={this.toggleMenu}>
              MENU
          </a>
          { this.state.isMenuOpen 
            &&
            <NavDropDown toggleMenu={this.toggleMenu} isMenuOpen={this.state.isMenuOpen} logout={this.logout} />
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