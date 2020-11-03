import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import ROUTES from './pages';
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        {Object.entries(ROUTES).map(([route, value]) =>
          <Route key={route} exact path={route} component={value.page} />)}
      </Switch>
    </Router>
  );
}

export default App;
