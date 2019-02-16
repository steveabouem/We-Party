import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import man from "../../utils/icons/man.svg";
import woman from "../../utils/icons/woman.svg";
import mix from "../../utils/icons/mix.svg";
import gender from "../../utils/icons/gender.svg";

export default class Gender extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      dropDownValue: ""
    };
  }
  

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }
  
  async selectItem(selection){
    this.setState({dropDownValue: selection })
  }


  render() {
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          Group
        </DropdownToggle>
        <DropdownMenu id="gender-mix">
          <DropdownItem onClick={() => this.selectItem("Boyz Night Out")}>
            Boyz Night Out <img src={man} alt="man" className="menu-icon" />
          </DropdownItem>
          <DropdownItem onClick={() => this.selectItem("Girls Night Out")}>
            Girls Night Out <img src={woman} alt="woman" className="menu-icon" />
          </DropdownItem>
          <DropdownItem onClick={() => this.selectItem("Random")}>
            Anyone:) <img src={mix} alt="mix" className="menu-icon" />
          </DropdownItem>
        </DropdownMenu>
        <p id="gender-selected">{this.state.dropDownValue}</p>
      </Dropdown>
    );
  }
}