import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { get as _get, isFunction as _isFunction } from 'lodash';
import { Route, Redirect, Switch, matchPath } from 'react-router';
import { withRouter } from 'react-router-dom';
import Home from '../containers/Home';
import About from '../containers/About';
import { fetchPosts } from '../actions';

/**
 * loadData: related action(s) to loadData, possibly given react router match and req query
 * setHead: set head logic
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
      // setHead: (/*match, query*/) => {
      //   // const channelId = query.id
      //   // return setHeadChannel({
      //   //   params: {
      //   //     channelId
      //   //   }
      //   // })
      // },
      redirect: () => {
        return false;
      }
    }, {
      path: '/about',
      key: 'about',
      component: About,
      redirect: false
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
