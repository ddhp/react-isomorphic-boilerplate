import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { isFunction as _isFunction } from 'lodash';
import { withRouter } from 'react-router-dom';
import { getMatchedRoute, renderRoutes } from './utils';
import Footer from '../containers/Footer';
import AnotherEntry from '../containers/AnotherEntry';
import FourOFour from '../containers/404';

export const getRoutes = () => ({
  entry: 'another-entry',
  routes: [
    {
      path: '/another-entry',
      key: 'anotherEntry',
      component: AnotherEntry,
    }, {
      key: '404',
      component: FourOFour,
    },
  ],
});

export const AnotherOneRoute = ({ location }) => {
  const routesInfo = getRoutes();
  const currentRoute = getMatchedRoute(location.pathname, routesInfo);

  let { redirect } = currentRoute;

  if (currentRoute.redirect && _isFunction(currentRoute.redirect)) {
    redirect = currentRoute.redirect();
  }

  return (
    <div>
      <Helmet titleTemplate="%s - by ddhp">
        <title>Another One Route</title>
        <meta name="description" content="react isomorphic boilerplate by ddhp" />
        <meta name="og:title" content="Another One Route" />
      </Helmet>
      <h1 style={{
        fontFamily: 'Spectral SC, serif',
        margin: '2rem',
        textAlign: 'center',
      }}
      ><a href="/">Rib.</a>
      </h1>
      {renderRoutes(routesInfo.routes, redirect)}
      <Footer />
    </div>
  );
};

AnotherOneRoute.propTypes = {
  location: PropTypes.objectOf(PropTypes.string),
};

AnotherOneRoute.defaultProps = {
  location: {},
};

export default withRouter(AnotherOneRoute);
