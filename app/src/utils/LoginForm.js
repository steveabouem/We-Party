import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import loggedIn from "./icons/loggedIn.svg";

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  textField: {
    flexBasis: 45,
  },
});


class LoginForm extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    showPassword: false,
  };

  saveUser = async() => {
    let first = this.state.firstName,
    last = this.state.lastName,
    email = this.state.email,
    userInfo = { name: `${first} ${last}`, email: email, oAuth: "Form", picture: loggedIn, activities: [] }
    await this.props.saveUser(userInfo);
    
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  render() {
    const { classes } = this.props;
    
    return (
      <div className={classes.root}>
         <TextField
          required="true"
          name="firstName"
          className={classNames(classes.margin, classes.textField)}
          variant="outlined"
          label="First Name"
          value={this.state.firstName}
          onChange={this.handleChange('firstName')}
        />

        <TextField
          name="lastName"
          className={classNames(classes.margin, classes.textField)}
          variant="outlined"
          label="Last Name"
          value={this.state.lastName}
          onChange={this.handleChange('lastName')}
        />

        <TextField
          name="email"
          className={classNames(classes.margin, classes.textField)}
          variant="outlined"
          label="Email"
          value={this.state.email}
          onChange={this.handleChange('email')}
          autoComplete="false"
        />
        
        <TextField
          className={classNames(classes.margin, classes.textField)}
          variant="outlined"
          type={this.state.showPassword ? 'text' : 'password'}
          label="Password"
          value={this.state.password}
          onChange={this.handleChange('password')}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" style={{transform:"scale(0.6)"}}>
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={this.handleClickShowPassword}
                >
                  {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <button className="button-primary" onClick={() => this.saveUser()}>
          Submit
        </button>
      </div>
    );
  }
}

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
};



export default withStyles(styles)(LoginForm);

