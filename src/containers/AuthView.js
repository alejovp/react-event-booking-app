import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Link } from '@material-ui/core';
import AuthContext from '../context/auth-context';
import AuthForm from '../components/AuthForm/AuthForm';


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
        console.log(userInputs);

        let requestBody = {
            query: `
                query {
                    login(email: "${userInputs.email}", password: "${userInputs.password}") {
                        userId
                        token
                        tokenExpiration
                    }
                }  
            `
        };

        if (this.state.formType === 'register') {
            requestBody = {
                query: `
                    mutation {
                        createUser(userInput: {email: "${userInputs.email}",
                                                password: "${userInputs.password}", 
                                                firstName: "${userInputs.firstName}", 
                                                lastName: "${userInputs.lastName}"}) 
                        {
                            _id
                            firstName
                            email
                        }
                    }
                `
            };
        }
        
        fetch('http://localhost:3000/graphql-api', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Request failed!');
            }
            return res.json();
        })
        .then(resData => {
            console.log(resData);
            if (resData.data.login.token) {
                const { userId, token, tokenExpiration } = resData.data.login;
                this.context.login(userId, token, tokenExpiration);
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