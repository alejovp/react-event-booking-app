import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Link } from '@material-ui/core';
import AuthContext from '../context/auth-context';
import AuthForm from '../components/AuthForm/AuthForm';
import { AuthService } from '../services/AuthService';


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
        this.authService = new AuthService();
        this.state = {
            formType: 'login',
        };
    }
    
    static contextType = AuthContext;

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
        let doRequest;

        if (this.state.formType === 'register') {
            doRequest = this.authService.register(userInputs);
        } else {
            doRequest = this.authService.login(userInputs);
        }

        doRequest
            .then(resData => {
                if (resData.data.login && resData.data.login.token) {
                    const { userId, token, tokenExpiration } = resData.data.login;
                    this.context.login(userId, token, tokenExpiration);
                } else {
                    this.setState({ formType: 'login' });
                }
            })
            .catch(err => {
                console.log(err);
            });
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
                        variant="body1" 
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

AuthView.propTypes = {
    classes: PropTypes.object
};

export default withStyles(styles)(AuthView);