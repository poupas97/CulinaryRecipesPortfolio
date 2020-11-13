import { node, object, string } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { compose } from 'redux';

import { LOGIN_ROUTE } from './Login';

const Protected = ({ route, component, user }) => {

  if (!user) return <Redirect to={LOGIN_ROUTE} />;

  return <Route key={route} exact={!!route} path={route} component={component} />;
};

Protected.propTypes = {
  route: string,
  component: node,
  user: object
};

const mapStateToProps = state => ({
  user: state.LOGIN.saved,
});

export default compose(
  connect(mapStateToProps),
)(Protected);
