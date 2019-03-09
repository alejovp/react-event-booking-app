import React, { Component } from 'react';
import AuthForm from '../components/AuthForm';


export class AuthView extends Component {
    render() {
        return <AuthForm formType="register" />;
    }
}