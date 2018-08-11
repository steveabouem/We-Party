import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
var debounce = require('debounce');

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
});

class TextFields extends React.Component {
  state = {
    name: 'Cat in the Hat',
    amount: '',
    people: ''
  };
  
  handleChange = name => event => {
    
    // if(event.target.target.value > 0) {
    // let amount =event.target.value * 10

    // if(name === 'amount'){
    //   this.setState({
    //     [name]: amount ,
    //   });
    // } else {
      this.setState({
        [name]: event.target.value ,
      });
      console.log("textfield props", this.props);
      
      this.props.recordSearch(event.target.value)
    // }
    
    // } else {
    // alert('Only positive values:)')
    // }
  };
  
  render() {
    const { ...classes } = this.props;
    return (
      <form className={classes.container} noValidate autoComplete="off">
      <TextField
      id="what-todo"
      label="What to do?"
      type="search"
      className={classes.textField}
      margin="normal"
      InputLabelProps={{
        autoFocus: true,
      }}
      onChange={(evt)=>this.props.recordSearch(evt)}
      />
      <TextField
      id="how-many"
      label="How many?"
      value={this.state.people}
      onChange={this.handleChange('people')}
      type="number"
      className={classes.textField}
      InputLabelProps={{
        shrink: true,
      }}
      margin="normal"
      />
      <TextField
      id="budget-dropdown"
      label="Your budget"
      value={this.state.amount}
      onChange={this.handleChange('amount')}
      type="number"
      className={classes.textField}
      InputLabelProps={{
        shrink: true,
      }}
      margin="normal"
      />
      
      {/* <TextField
        id="select-currency-native"
        select
        label="Once we go international"
        className={classes.textField}
        value={this.state.currency}
        onChange={this.handleChange('currency')}
        SelectProps={{
          native: true,
          MenuProps: {
            className: classes.menu,
          },
        }}
        helperText="Please select your currency"
        margin="normal"
        >
        {currencies.map(option => (
          <option key={option.value} value={option.value}>
          {option.label}
          </option>
        ))}
      </TextField> */}
      </form>
    );
  }
}

TextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFields);
