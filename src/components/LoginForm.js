import React, { Component } from 'react';
import { withStyles, TextField, Button, Grid } from '@material-ui/core';


const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      padding: 16
    },
    textField: {
    //   marginLeft: theme.spacing.unit,
    //   marginRight: 16,
    },
    button: {
      margin: theme.spacing.unit,
    },
});

class LoginForm extends Component {
    render() {
        const { classes } = this.props;

        return (
            <form 
                className={classes.container} 
                noValidate 
                autoComplete="off">
                <Grid container spacing={16}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="First name"
                            className={classes.textField}
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
                            className={classes.textField}
                            type="text"
                            name="lastname"
                            autoComplete="last-name"
                            margin="normal"
                            fullWidth
                        />
                    </Grid>
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
                    <Grid item xs={12}>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            className={classes.button}>
                            Login
                        </Button>
                    </Grid>
                </Grid>
            </form>
        );
    }
}

export default withStyles(styles)(LoginForm);