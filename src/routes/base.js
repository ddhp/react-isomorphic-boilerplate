import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isFunction as _isFunction } from 'lodash';
import { Route, Redirect, Switch } from 'react-router';

// TODO: handle 404 situation
export default class BaseRoute extends Component {
  static propTypes = {
    routes: PropTypes.array,
    currentRoute: PropTypes.object
  }

  renderRoutes(routes, currentRoute) {
    // if redirect is truthy
    // render <Redirect>
    const redirect = currentRoute.redirect ? _isFunction(currentRoute.redirect) ? currentRoute.redirect() : currentRoute.redirect : false;

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
