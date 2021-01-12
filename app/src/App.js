import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import ROUTES from './pages/constants';
import Login, { LOGIN_ROUTE } from './pages/Login';
import NotFound from './pages/NotFound';
import Protected from './pages/Protected';

function App() {
  return (
    <Router>
      <Switch>
        <Route key={LOGIN_ROUTE} exact path={LOGIN_ROUTE} component={Login} />
        {Object.values(ROUTES).map(it =>
          <Protected key={it.route} exact path={it.path} component={it.component} />)}
        <Protected key='/not-found' component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
