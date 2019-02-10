import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from "react-router-dom";
import arrow from  "../../utils/icons/arrow.svg";


class MenuButton extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <span>
         <span
          id="menu-button"
          aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
          style={{color: "white"}}
        >
          <img src={arrow} alt="Sort down icon by Dave Gandy" />
        </span>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          >
         {this.props.items.map(item => {
           return (<MenuItem className="menuMap" onClick={this.handleClose} key={item.name}>
            {
            item.ref !== ""? <Link to={item.ref}>{item.name}</Link> 
            :
            <b>{item.name}</b>
            }
           </MenuItem>)
         })} 
        </Menu>
       
    </span>
    );
  }
}

export default MenuButton;
