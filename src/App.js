import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import AuthView from './views/AuthView';
import { EventsView } from './views/EventsView';
import { BookingsView } from './views/BookingsView';
import Navbar from './components/Navbar';
import AuthContext from './context/auth-context';


export class App extends Component {

    state = {
        userId: undefined,
        token: undefined
    }

    login = (userId, token, tokenExpiration) => this.setState({ userId, token });

    logout = () => this.setState({ userId: undefined, token: undefined });

    render () {
        const { userId, token } = this.state;

        return (
            <BrowserRouter>
                <React.Fragment>
                    <AuthContext.Provider 
                        value={{ 
                            userId, 
                            token,
                            login: this.login,
                            logout: this.logout
                        }}
                    >
                        <Navbar />
                        <main>
                            <Switch>
                                <Redirect from="/" to="/auth" exact />
                                <Route path="/auth" component={AuthView} />
                                <Route path="/events" component={EventsView} />
                                <Route path="/bookings" component={BookingsView} />
                            </Switch>
                        </main>
                    </AuthContext.Provider>
                </React.Fragment>
            </BrowserRouter>
        );
    }
}