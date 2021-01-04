import get from 'lodash/get';
import { object } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { withPage } from '../contexts/Page';

export const HOME_ROUTE = '/';

const Home = ({ user }) => (
  <h3>
    Hello {get(user, 'username')}
  </h3>
);

Home.propTypes = {
  user: object,
};

const mapStateToProps = state => ({
  user: state.USER.item,
});

export default compose(
  connect(mapStateToProps),
  withPage(HOME_ROUTE)
)(Home);
