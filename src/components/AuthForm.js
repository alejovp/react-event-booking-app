import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      padding: 16
    },
    button: {
      margin: theme.spacing.unit,
    },

});

const initState = {
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    password: undefined,
    formErrors: {
        firstNameError: undefined,
        lastNameError: undefined,
        emailError: undefined,
        passwordError: undefined
    },
};

class AuthForm extends Component {

    constructor(props) {
        super(props);
        this.formEl = React.createRef();
        this.state = initState;
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    formValidation = () => {

        const { firstName, lastName, email, password } = this.state;
        let formErrors = {};
        let formIsValid = true;
  
        if (!firstName) {
          formIsValid = false;
          formErrors['firstNameError'] = 'Please enter your first name.';
        }
  
        if (firstName) {
          if (!firstName.match(/^[A-zÀ-ÿ]*$/)) {
            formIsValid = false;
            formErrors['firstNameError'] = 'Please enter alphabet characters only.';
          }
        }

        if (!lastName) {
          formIsValid = false;
          formErrors['lastNameError'] = 'Please enter your last name.';
        }
  
        if (lastName) {
          if (!lastName.match(/^[A-zÀ-ÿ]*$/)) {
            formIsValid = false;
            formErrors['lastNameError'] = 'Please enter alphabet characters only.';
          }
        }
  
        if (!email) {
          formIsValid = false;
          formErrors['emailError'] = 'Please enter your email address.';
        }
  
        if (email) {
          //regular expression for email validation
          var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
          if (!pattern.test(email)) {
            formIsValid = false;
            formErrors['emailError'] = 'Please enter a valid email address.';
          }
        }
  
        if (!password) {
          formIsValid = false;
          formErrors['passwordError'] = 'Please enter your password.';
        }
  
        // if (password) {
        //   if (!password.match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
        //     formIsValid = false;
        //     formErrors['passwordError'] = 'Please enter a secure and strong password.';
        //   }
        // }
  
        this.setState({ formErrors });

        return formIsValid;
    }
  
    onSubmit = e => {
        e.preventDefault();
        if (this.formValidation()) {
            const { firstName, lastName, email, password } = this.state;
            this.props.onSubmit({
                firstName,
                lastName,
                email,
                password
            });
            this.formEl.current.reset();
        }
    }

    renderExtraFields = () => {
        const { formType } = this.props;
        const { firstNameError, lastNameError } = this.state.formErrors;

        if (formType === 'login') {
            return null;
        }

        return  <React.Fragment>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            error={!!firstNameError}
                            label="First name"
                            type="text"
                            name="firstName"
                            autoComplete="name"
                            onChange={this.handleChange}
                            fullWidth
                            helperText={ firstNameError ? firstNameError : '' }
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            error={!!lastNameError}
                            label="Last name"
                            type="text"
                            name="lastName"
                            autoComplete="last-name"
                            onChange={this.handleChange}
                            fullWidth
                            helperText={ lastNameError ? lastNameError : '' }
                        />
                    </Grid>
                </React.Fragment>;
    };

    renderButtons = () => {
        const { formType, classes } = this.props;

        if (formType === 'login') {
            return  <Button
                        type="submit"
                        variant="contained" 
                        color="primary" 
                        className={classes.button}
                        disabled={this.state.isValid}>
                            Login
                    </Button>;
        }
        return  <Button
                    type="submit"
                    variant="contained" 
                    color="primary" 
                    className={classes.button}
                    disabled={this.state.isValid}>
                        Register
                </Button>;
    };
    
    render() {
        const { classes } = this.props;
        const { emailError, passwordError } = this.state.formErrors;

        return (    
            <form
                ref={this.formEl}
                className={classes.container}
                autoComplete="off"
                onSubmit={this.onSubmit}
                noValidate>
                <Grid container spacing={16}>
                    { this.renderExtraFields() }
                    <Grid item xs={12}>
                        <TextField
                            label="Email"
                            error={!!emailError}
                            className={classes.textField}
                            type="email"
                            name="email"
                            autoComplete="email"
                            onChange={this.handleChange}
                            fullWidth
                            required
                            helperText={ emailError ? emailError : '' }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Password"
                            error={!!passwordError}
                            className={classes.textField}
                            type="password"
                            name="password"
                            autoComplete="current-password"
                            onChange={this.handleChange}
                            fullWidth
                            required
                            helperText={ passwordError ? passwordError : '' }
                        />
                    </Grid>
                    <Grid item 
                            xs={12}
                            container
                            justify="flex-end">
                        { this.renderButtons() }
                    </Grid>
                </Grid>
            </form>
        );
    }
}

AuthForm.propTypes = {
    classes: PropTypes.object,
    formType: PropTypes.string,
    onSubmit: PropTypes.func
};

export default withStyles(styles)(AuthForm);