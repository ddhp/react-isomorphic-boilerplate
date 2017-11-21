import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { get as _get, isFunction as _isFunction } from 'lodash';
import { Route, Redirect, Switch, matchPath } from 'react-router';
import { withRouter } from 'react-router-dom';
import Nav from '../containers/Nav';
import Home from '../containers/Home';
import About from '../containers/About';
import Demo from '../containers/Demo';
import Footer from '../containers/Footer';
import { fetchPosts } from '../actions';

/**
 * loadData: related action(s) to loadData, possibly given react router match and req query
 * redirect: redirect logic
 *
 */
export const getRoutes = () => {
  return [
    {
      path: '/',
      key: 'home',
      exact: true,
      component: Home,
      loadData: (/*match, query*/) => {
        // return last action,
        // it would be a promise if it's an aync request
        return fetchPosts();
      },
      redirect: () => {
        return false;
      }
    }, {
      path: '/about',
      key: 'about',
      component: About,
      redirect: false
    }, {
      path: '/demo',
      key: 'demo',
      component: Demo
    }
  ];
};

export const getRoute = (path) => {
  const routes = getRoutes();
  return routes.reduce((prev, cur) => {
    if (matchPath(path, cur)) {
      return cur;
    } else {
      return prev;
    }
  }, {});
};

// TODO: handle 404 situation
export class EntryMainRoute extends Component {
  static propTypes = {
    me: PropTypes.object,
    location: PropTypes.object
  }

  render() {
    const { location/*, me*/ } = this.props,
          routes = getRoutes(),
          currentRoute = getRoute(location.pathname),
          redirect = currentRoute.redirect ? _isFunction(currentRoute.redirect) ? currentRoute.redirect() : currentRoute.redirect : false;

    return (
      <div>
        <Helmet titleTemplate="%s - by ddhp">
          <title>title set in entry-main</title>
          <meta name="description" content="react isomorphic boilerplate by ddhp" />
          <meta name="og:title" content="title set in entry-main" />
        </Helmet>
        <Nav />
        <Switch>
          {redirect ? <Redirect to={redirect} /> : null}
          {routes.map((route) => {
            const { component: Component, key, ...rest } = route;

            return (
              <Route key={key} {...rest} render={props => {
                return (
                  <div>
                    <Component {...props} />
                  </div>
                );
              }} />
            );
          })}
        </Switch>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    me: _get(state, 'entities.me', {})
  };
}

// withRouter exposes history, match, location to props
export default withRouter(connect(mapStateToProps, null)(EntryMainRoute));
