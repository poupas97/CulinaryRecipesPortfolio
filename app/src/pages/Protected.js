import { bool, func, node, object, string } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { compose } from 'redux';

import { getUserAction } from '../store/user';
import { getDecodedToken } from '../tools';
import { LOGIN_ROUTE } from './Login';

const Protected = ({ path, component, user, getUser, exact }) => {
  const [render, setRender] = useState(false);
  const [renderLogin, setRenderLogin] = useState(false);

  const decodedToken = getDecodedToken();

  useEffect(() => {
    if (!decodedToken) setRenderLogin(true);
    else if (!user) getUser(decodedToken);
    else setRender(true);
  }, [decodedToken, user]);

  if (render)
    return <Route key={path} exact={exact} path={path} component={component} />;

  if (renderLogin)
    return <Redirect to={LOGIN_ROUTE} />;

  return null;
};

Protected.propTypes = {
  path: string,
  component: node,
  user: object,
  getUser: func,
  exact: bool,
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
