import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import AuthView from './containers/AuthView';
import { EventsView } from './containers/EventsView';
import { BookingsView } from './containers/BookingsView';
import AuthContext from './context/auth-context';
import Navbar from './components/Navbar/Navbar';


export class App extends Component {

    state = {
        userId: undefined,
        token: undefined
    }

    login = (userId, token, tokenExpiration) => this.setState({ userId, token });

    logout = () => this.setState({ userId: undefined, token: undefined });

    renderRoutes = () => {
        if (this.state.token) {
            return (
                <Switch>
                    <Redirect from="/" to="/events" exact />
                    <Redirect from="/auth" to="/events" exact />
                    <Route path="/events" component={EventsView} />
                    <Route path="/bookings" component={BookingsView} />
                </Switch>
            );
        }

        return (
            <Switch>
                <Redirect from="/" to="/auth" exact />
                <Redirect from="/bookings" to="/auth" exact />
                <Route path="/auth" component={AuthView} />
                <Route path="/events" component={EventsView} />
            </Switch>
        );
    }

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
                            { this.renderRoutes() }
                        </main>
                    </AuthContext.Provider>
                </React.Fragment>
            </BrowserRouter>
        );
    }
}