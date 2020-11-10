import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { PageContext } from '../contexts/Page';
import ROUTES from '../pages';

const Navbar = () => {
  const { url } = useContext(PageContext);

  return (
    <div>
      {Object.entries(ROUTES).map(([key, value]) =>
        value.title && <Link class={key === url ? 'active' : null} to={key}>
          {value.title}
        </Link>)}
    </div>
  );
};

export default Navbar;
