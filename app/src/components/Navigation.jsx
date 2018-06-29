import React from "react";
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render () {
    return (
      <div className="navigation">
        <nav>
          <NavbarBrand> WeParty! </NavbarBrand>
          <NavLink> Tour </NavLink>
          <NavLink> Groups </NavLink>
          <NavLink> Activities </NavLink>
          <NavLink id="login"> Login/Register </NavLink>
        </nav>
      </div>
    )
  }
}

export default Navigation