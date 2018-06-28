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
        <Navbar color="light" light expand="md">
            <NavbarBrand href="/home">WeParty!</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle id="buttontog">
                    <p>...</p>
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                     <a href='/voices'>Activities</a>
                    </DropdownItem>
                    <DropdownItem>
                      <a href='/index'>Groups</a>
                    </DropdownItem>
                    <DropdownItem>
                      <a href='/jobs'>TBD</a>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                      Collapse
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </Collapse>
          </Navbar>
      )
    }
  }
  
  export default Navigation