import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Main from './components/body/Main';
import Insert from './components/body/Insert';
import Locate from './components/head/Locate';
import Test from './components/body/StateTest';

class Routes extends React.Component {
    render() {
        return (
            <Router>
                <Locate />

                <Switch>
                    <Route exact path='/' component={Main} />
                    <Route exact path='/add' component={Insert} />
                    <Route exact path='/test' component={Test} />
                </Switch>
            </Router>
        );
    }
}

export default Routes;