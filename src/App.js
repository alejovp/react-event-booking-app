import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { AuthView } from './views/auth';


export const App = () => (
    <BrowserRouter>
        <Switch>
            <Redirect from="/" to="/auth" exact />
            <Route path="/auth" component={AuthView} />
            <Route path="/events" component={null} />
            <Route path="/bookings" component={null} />
        </Switch>
    </BrowserRouter>
);