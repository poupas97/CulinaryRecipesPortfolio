import { func } from 'prop-types';
import React, { useContext, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { PageContext } from '../contexts/Page';
import ROUTES from '../pages/constants';
import { LOGIN_ROUTE } from '../pages/Login';
import { logoutAction } from '../store/login';

import './navbar.scss';

const Navbar = ({ logout }) => {
  const [renderLogin, setRenderLogin] = useState(false);
  const { url } = useContext(PageContext);

  const handleLogout = () => {
    logout();
    setRenderLogin(true);
  };

  if (renderLogin) return <Redirect to={LOGIN_ROUTE} />;

  return (
    <div className='navbar'>
      <div className='routes'>
        {Object.values(ROUTES)
          .filter((it) => !!it.title)
          .map((it) => (
            <Link
              key={it.path}
              className={it.path === url ? 'active' : null}
              to={it.path}
            >
              {it.title}
            </Link>
          ))}
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

Navbar.propTypes = {
  logout: func,
};

const mapActionsToProps = (dispatch) => ({
  logout: () => logoutAction(dispatch),
});

export default compose(connect(null, mapActionsToProps))(Navbar);
