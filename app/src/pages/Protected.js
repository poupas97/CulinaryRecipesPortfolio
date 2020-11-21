import { func, node, object, string } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { compose } from 'redux';

import { getUserAction } from '../store/user';
import { getDecodedToken } from '../tools';
import { LOGIN_ROUTE } from './Login';

const Protected = ({ route, component, user, getUser }) => {
  const [render, setRender] = useState(false);
  const [renderLogin, setRenderLogin] = useState(false);

  const decodedToken = getDecodedToken();
  console.log(111, decodedToken, user);

  useEffect(() => {
    if (!decodedToken && !user) setRenderLogin(true);
    else if (decodedToken && !user) getUser(decodedToken);
    else setRender(true);
  }, [decodedToken, user]);

  if (render)
    return <Route key={route} exact={!!route} path={route} component={component} />;

  if (renderLogin)
    return <Redirect to={LOGIN_ROUTE} />;

  return null;
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
