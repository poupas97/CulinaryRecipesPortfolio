import Home, { HOME_ROUTE } from './Home';
import Login, { LOGIN_ROUTE } from './Login';

const ROUTES = {
  [HOME_ROUTE]: { page: Home },
  [LOGIN_ROUTE]: { page: Login }
};

export default ROUTES;
