import { bool, func, object, string } from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';

import Form, { FormInputType } from '../containers/Form';
import { withPage } from '../contexts/Page';
import { loginAction, resetLoginAction } from '../store/login';
import { HOME_ROUTE } from './Home';

export const LOGIN_ROUTE = '/login';

const Login = ({ loading, error, login, reset, user }) => {

  useEffect(() => {
    reset();
  }, [reset]);

  if (user) return <Redirect to={HOME_ROUTE} />;

  const inputs = [
    { text: 'Username', value: 'username', type: FormInputType.TEXT },
    { text: 'Password', value: 'password', type: FormInputType.CHIPPER },
  ];

  return (
    <Form
      inputs={inputs}
      onSubmit={login}
      title="Login"
      loading={loading}
      error={error}
    />
  );
};

Login.propTypes = {
  loading: bool,
  error: string,
  login: func,
  reset: func,
  user: object
};

const mapStateToProps = state => ({
  loading: state.LOGIN.loading,
  error: state.LOGIN.error,
  user: state.LOGIN.saved,
});

const mapActionsToProps = dispatch => ({
  login: user => loginAction(dispatch, user),
  reset: () => resetLoginAction(dispatch),
});

export default compose(
  connect(mapStateToProps, mapActionsToProps),
  withPage(LOGIN_ROUTE)
)(Login);
