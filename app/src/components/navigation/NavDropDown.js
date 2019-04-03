import React from "react";
import {Link} from "react-router-dom";
const firebase = require("firebase");

export default class NavDropDown extends React.Component {

    handleClick = e => {
        if(e.target.className !== "menu-toggle" 
        && e.target.className !== "nav-dropdown"
        && e.target.className !== "nav-dropdown-item") {
            this.props.toggleMenu();
        }
    };

    componentDidMount() {
        document.addEventListener("click", this.handleClick);
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.handleClick);
    }

    render() {      
        return (
            <ul className="nav-dropdown">
              {window.location.pathname !== "/home" ?
                <li className="nav-dropdown-item">
                  <Link to="/home">HOME</Link>
                </li>
                :
                null
                }
              <li className="nav-dropdown-item">
                <Link to="/activities">
                  GROUPS
                </Link>
              </li>
              <li className="nav-dropdown-item">
                <Link to="/payment">
                    BALANCE
                </Link>
              </li>
              <li className="nav-dropdown-item">
                {firebase.auth().currentUser ?
                  <Link to={{pathname:"/", state: {fromLogout: true }}} onClick={this.props.logout}>
                    LOGOUT
                  </Link>
                  :
                  <Link to="/">
                    LOGIN
                  </Link>
                }
              </li>
            </ul>
        );
    }
}