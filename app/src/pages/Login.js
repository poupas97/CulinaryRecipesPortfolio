import { bool, func, string } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Form, { FormInputType } from '../containers/Form';
import { withPage } from '../contexts/Page';
import { loginAction } from '../store/login';

export const LOGIN_ROUTE = '/login';

const Login = ({ loading, error, login }) => {

  // useEffect(() => {
  //   if (saved) console.log('ok');
  // }, [saved, goBack]);

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
};

const mapStateToProps = () => ({
  loading: false,
  error: false,
});

const mapActionsToProps = dispatch => ({
  login: () => loginAction(dispatch),
});

export default compose(
  connect(mapStateToProps, mapActionsToProps),
  withPage(LOGIN_ROUTE)
)(Login);
