import React, { Component } from 'react';
import AuthForm from '../components/AuthForm';


export class AuthView extends Component {

    onSubmitHandler = userInputs => {
        console.log(userInputs);
    }

    render() {
        return <AuthForm formType="register" onSubmit={this.onSubmitHandler} />;
    }
}