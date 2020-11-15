import { func, node, object, string } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { compose } from 'redux';

import { getUserAction } from '../store/user';
import { getToken } from '../tools';
import { LOGIN_ROUTE } from './Login';

const Protected = ({ route, component, user, getUser }) => {
  const decodedToken = getToken();

  if (!decodedToken && !user) return <Redirect to={LOGIN_ROUTE} />;
  else if (decodedToken && !user) getUser(decodedToken);

  return <Route key={route} exact={!!route} path={route} component={component} />;
};

Protected.propTypes = {
  route: string,
  component: node,
  user: object,
  getUser: func,
};

const mapStateToProps = state => ({
  user: state.USER.item,
});

const mapActionsToProps = dispatch => ({
  getUser: () => getUserAction(dispatch),
});

export default compose(
  connect(mapStateToProps, mapActionsToProps),
)(Protected);
