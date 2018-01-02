import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { get as _get, isFunction as _isFunction } from 'lodash';
import { withRouter } from 'react-router-dom';
import { getMatchedRoute, renderRoutes } from './utils';
import NavComponent from '../containers/Nav';
import HomeComponent from '../containers/Home';
import AboutComponent from '../containers/About';
import DemoComponent from '../containers/Demo';
import FooterComponent from '../containers/Footer';
import FourOFourComponent from '../containers/404';
import action from '../actions';

/**
 * put 404 route to the last
 * since it's the last to match
 *
 * @returns {object} routesInfo - detail of routes
 * @property {string} routesInfo.entry - entry name of routes
 * @property {object[]} routesInfo.routes
 * @property {React Component} routesInfo.routes[].component - component to use
 * @property {string} routesInfo.routes[].path - path to match
 * @property {string} routesInfo.routes[].key - unique key for Route to use
 * @property {boolean} routesInfo.routes[].exact - is exact match
 * @property {boolean} routesInfo.routes[].strict - is strict match
 * @property {function} routesInfo.routes[].loadData -
 * related action(s) to loadData, possibly given react router match and req query
 * @property {(function|boolean|string)} routesInfo.routes[].redirect - redirect logic
 *
 */
export const getRoutes = () => ({
  entry: 'main',
  routes: [
    {
      path: '/',
      key: 'home',
      exact: true,
      component: HomeComponent,
      loadData: (/* match, query */) =>
      // return last action,
      // it would be a promise if it's an aync request
        action.fetchPosts(),
      redirect: () => false,
    }, {
      path: '/about',
      key: 'about',
      component: AboutComponent,
      redirect: false,
    }, {
      path: '/demo',
      key: 'demo',
      component: DemoComponent,
    }, {
      key: '404',
      component: FourOFourComponent,
    },
  ],
});

export class MainRoute extends React.Component {
  static propTypes = {
    me: PropTypes.object,
    location: PropTypes.object,
  }

  render() {
    const { location/* , me */ } = this.props;
    const routesInfo = getRoutes();
    const currentRoute = getMatchedRoute(location.pathname, routesInfo);

    let { redirect } = currentRoute;

    if (currentRoute.redirect && _isFunction(currentRoute.redirect)) {
      redirect = currentRoute.redirect();
    }

    return (
      <div>
        <Helmet titleTemplate="%s - by ddhp">
          <title>title set in entry-main</title>
          <meta name="description" content="react isomorphic boilerplate by ddhp" />
          <meta name="og:title" content="title set in entry-main" />
        </Helmet>
        <NavComponent />
        {renderRoutes(routesInfo.routes, redirect)}
        <FooterComponent />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    me: _get(state, 'entities.me', {}),
  };
}

// withRouter exposes history, match, location to props
// see HOC(higher order component)
// https://reactjs.org/docs/higher-order-components.html
export default withRouter(connect(mapStateToProps, null)(MainRoute));
