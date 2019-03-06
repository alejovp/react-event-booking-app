import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { AuthView } from './views/auth';
import { EventsView } from './views/events';
import { BookingsView } from './views/bookings';
import Navbar from './components/Navbar';


export const App = () => (
    <BrowserRouter>
        <React.Fragment>
            <Navbar />
            <main>
                <Switch>
                    <Redirect from="/" to="/auth" exact />
                    <Route path="/auth" component={AuthView} />
                    <Route path="/events" component={EventsView} />
                    <Route path="/bookings" component={BookingsView} />
                </Switch>
            </main>
        </React.Fragment>
    </BrowserRouter>
);