import React from "react";
import {Link} from "react-router-dom";

export default class NavDropDown extends React.Component {

    handleClick = e => {
        console.log("click", e.target.className);
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
              <li className="nav-dropdown-item">
                <Link to="/activities">
                  GROUPS
                </Link>
              </li>
              <li className="nav-dropdown-item">
                <Link to="/home">
                    HOME
                </Link>
              </li>
              <li className="nav-dropdown-item">
                {this.props.currentUser ?
                  <Link to="/" onClick={this.props.logout}>
                    LOGOUT
                  </Link>
                  :
                  <Link to="/authenticate">
                    LOGIN
                  </Link>
                }
              </li>
            </ul>
        );
    }
}