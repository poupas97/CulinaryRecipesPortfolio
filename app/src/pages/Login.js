import { bool, func, object, string } from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';

import Form, { FormInputType } from '../containers/Form';
import { loginAction, resetLoginAction } from '../store/login';
import { HOME_ROUTE } from './Home';

export const LOGIN_ROUTE = '/login';

const Login = ({ loading, error, login, reset, token }) => {

  useEffect(() => {
    reset();
  }, [reset]);

  if (token) return <Redirect to={HOME_ROUTE} />;

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
  token: object
};

const mapStateToProps = state => ({
  loading: state.LOGIN.loading,
  error: state.LOGIN.error,
  token: state.LOGIN.saved,
});

const mapActionsToProps = dispatch => ({
  login: user => loginAction(dispatch, user),
  reset: () => resetLoginAction(dispatch),
});

export default compose(
  connect(mapStateToProps, mapActionsToProps),
)(Login);
