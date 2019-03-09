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

class AuthForm extends Component {

    renderExtraFields = () => {
        const { formType } = this.props;

        if (formType === 'login') {
            return null;
        }

        return  <React.Fragment>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="First name"
                            type="text"
                            name="firstname"
                            autoComplete="name"
                            margin="normal"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Last name"
                            type="text"
                            name="lastname"
                            autoComplete="last-name"
                            margin="normal"
                            fullWidth
                        />
                    </Grid>
                </React.Fragment>;
    };

    renderButtons = () => {
        const { formType, classes } = this.props;

        if (formType === 'login') {
            return  <Button 
                        variant="contained" 
                        color="primary" 
                        className={classes.button}>
                        Login
                    </Button>;
        }
        return  <Button 
                    variant="contained" 
                    color="primary" 
                    className={classes.button}>
                    Register
                </Button>;
    };
    
    render() {
        const { formType, classes } = this.props;

        return (
            <form 
                className={classes.container} 
                noValidate 
                autoComplete="off">
                <Grid container spacing={16}>
                    { this.renderExtraFields() }
                    <Grid item xs={12}>
                        <TextField
                            label="Email"
                            className={classes.textField}
                            type="email"
                            name="email"
                            autoComplete="email"
                            margin="normal"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Password"
                            className={classes.textField}
                            type="password"
                            name="password"
                            autoComplete="current-password"
                            margin="normal"
                            fullWidth
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
};

export default withStyles(styles)(AuthForm);