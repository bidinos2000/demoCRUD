import React, { useState } from 'react';
import routes from './routers';
import { Route, BrowserRouter as Router, Switch} from 'react-router-dom';

const App: React.FC = () => {
    const getUrl = () => {
        var result = null;
        if (routes.length > 0) {
            result = routes.map((route, index) => {
                return (
                    <Route
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        component={route.main}
                    />);
            });
        }
        return <Switch>{result}</Switch>;
    }
    return (
        <React.Fragment>
            <Router>
                {getUrl()}
            </Router>
        </React.Fragment>
    );
}

export default App;
