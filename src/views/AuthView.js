import React, { Component } from 'react';
import AuthForm from '../components/AuthForm';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Link } from '@material-ui/core';


const styles = theme => ({
    root: {
        paddingTop: 10,
        [theme.breakpoints.up('sm')]: {
            width: '60%',
        },
        [theme.breakpoints.up('lg')]: {
            width: '50%',
        },
    },
    link: {
        cursor: 'pointer',
    }
});

class AuthView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            formType: 'register',
        };
    }

    onFormToggle = () => {
        const { formType } = this.state;
        if (formType === 'login') {
            this.setState({ formType: 'register' });
        } else {
            this.setState({ formType: 'login' });
        }
    }

    renderTitle = () => this.state.formType === 'register' ? 'Register' : 'Login';
    
    onSubmitHandler = userInputs => {
        console.log(userInputs);
    }

    render() {
        const { classes } = this.props;
        const { formType } = this.state;

        return (
            <section>
                <Paper classes={{ root: classes.root }}>
                    <Typography 
                        variant="h3" 
                        gutterBottom 
                        marked="center" 
                        align="center">
                            { this.renderTitle() }
                    </Typography>
                    <Typography 
                        variant="body2" 
                        align="center">
                            { formType === 'login' ? 'Not a member yet? ' : 'Already a member? '}
                        <Link 
                            onClick={this.onFormToggle} 
                            align="center" 
                            underline="always"
                            className={classes.link}>
                                { formType === 'login' ? 'Register here.' : 'Login here.'}
                        </Link>
                    </Typography>
                    <AuthForm 
                        formType={formType} 
                        onSubmit={this.onSubmitHandler} />
                </Paper>
            </section>
        );
    }
}

export default withStyles(styles)(AuthView);