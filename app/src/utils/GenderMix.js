import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import man from "./icons/man.svg";
import woman from "./icons/woman.svg";
import mix from "./icons/mix.svg";
import gender from "./icons/gender.svg";

export default class Gender extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      dropDownValue: "Genders"
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
          <img src={gender} alt="gender" className="menu-icon" />
        </DropdownToggle>
        <DropdownMenu id="gender-mix">
          <DropdownItem onClick={() => this.selectItem("Boyz Night Out")}>
            Boyz Night Out <img src={man} alt="man" className="menu-icon" />
          </DropdownItem>
          <DropdownItem onClick={() => this.selectItem("Girls Night Out")}>
            Girls Night Out <img src={woman} alt="woman" className="menu-icon" />
          </DropdownItem>
          <DropdownItem onClick={() => this.selectItem("Random")}>
            Random <img src={mix} alt="mix" className="menu-icon" />
          </DropdownItem>
        </DropdownMenu>
        <p id="gender-selected">{this.state.dropDownValue}</p>
      </Dropdown>
    );
  }
}