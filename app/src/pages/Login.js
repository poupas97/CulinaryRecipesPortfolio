import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Form, { FormInputType } from '../containers/Form';
import { withPage } from '../contexts/Page';

export const LOGIN_ROUTE = '/login';

const Login = () => {

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
      onSubmit={() => {}}
      title="Login"
    />
  );
};

export default compose(
  connect(),
  withPage(LOGIN_ROUTE)
)(Login);
