import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { withPage } from '../contexts/Page';

export const HOME_ROUTE = '/';

const Home = () => (
  <h3>
    Hello
  </h3>
);

export default compose(
  connect(),
  withPage(HOME_ROUTE)
)(Home);
