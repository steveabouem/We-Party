import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { connect } from "react-redux";
import IconButton from '@material-ui/core/IconButton';
import MenuButton from "./Menu.jsx";
import { logout } from "../actions/index";
import { Link } from "react-router-dom";
import Error from "./modals/Error";

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function Navigation(props) {
  
  const { classes } = props;
  return (
    <div className={classes.root} id="navigation-class-converter">
      <Error />
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" >

            <MenuButton 
              items={[{ref: "/activities", name:"My Activities"},
              {ref: "/tour", name:"Tour"},
              {ref: "/home", name:"Home page"}]} 
              button={"WeParty"}
            />

            <Link to="/home" style={{textDecoration: "none",
            color: "white", margin: "0"}} id="logo">
              WeParty!
            </Link>

          </IconButton>
          <span style={{position: "absolute", right: "1%"}}>
            <span className="display-name" id="span-id">
             {(props.userInfo.userInfo.userInfo? "Guest" : props.userInfo.userInfo.name)}
            </span>
            {(props.userInfo.userInfo.name? 
            <Link to="/authenticate" className="link-primary" style={{padding: "0.5em"}}>
              Logout 
            </Link>
            :
            <Link to="/authenticate" className="link-primary" style={{padding: "0.5em"}}
            onClick={props.logout}>
              Login
            </Link>)}
          </span>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  userInfo: state.userInfo
})
export default connect(mapStateToProps, { logout }) (withStyles(styles)(Navigation));
