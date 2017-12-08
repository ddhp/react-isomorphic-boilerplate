import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router';
import { matchPath } from 'react-router';

/**
 * find the first matching route
 * 404 would match any route by react router's implementation
 * so we take extra isIgnore404 parameter to config
 *
 */
export function getMatchedRoute(path, routesInfo, isIgnore404) {
  let matched = false;

  routesInfo.routes.some((r) => {
    // return false if isIgnore404 and no path defined in route
    if (isIgnore404 && !r.path) {
      return false;
    }
    if (matchPath(path, r)) {
      matched = r;
      return true;
    }
  });

  return matched;
}

export default class BaseRoute extends Component {
  /**
   * render route data from given route data
   * and if redirect is truthy, render <Redirect>
   * @param {array} routes - array of route data
   * @param {(string|boolean)} redirect - redirect target, or false to not redirect
   *
   */
  renderRoutes(routes, redirect) {
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

  render() {
    return (
      <div />
    );
  }
}
