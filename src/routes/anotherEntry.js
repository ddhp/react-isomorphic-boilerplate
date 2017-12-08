import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { isFunction as _isFunction } from 'lodash';
import { withRouter } from 'react-router-dom';
import BaseRoute from './base';
import { getMatchedRoute } from './base';
import Footer from '../containers/Footer';
import AnotherEntry from '../containers/AnotherEntry';
import FourOFour from '../containers/404';

export const getRoutes = () => {
  return {
    entry: 'another-entry',
    routes: [
      {
        path: '/another-entry',
        key: 'anotherEntry',
        component: AnotherEntry
      }, {
        key: '404',
        component: FourOFour
      }
    ]
  };
};

export class AnotherOneRoute extends BaseRoute {
  static propTypes = {
    location: PropTypes.object
  }

  render() {
    const { location } = this.props;
    const routesInfo = getRoutes();
    const currentRoute = getMatchedRoute(location.pathname, routesInfo);
    const redirect = currentRoute.redirect ? _isFunction(currentRoute.redirect) ? currentRoute.redirect() : currentRoute.redirect : false;

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
          textAlign: 'center'
        }}><a href="/">Rib.</a></h1>
        {this.renderRoutes(routesInfo.routes, redirect)}
        <Footer />
      </div>
    );
  }
}

export default withRouter(AnotherOneRoute);
