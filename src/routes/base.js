import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router';

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
