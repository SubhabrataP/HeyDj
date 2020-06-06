import React from 'react';
import Layout from './components/Home/Layout';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const createRoutes = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={Layout}/>
        </Switch>
    </Router>
);

export default createRoutes;