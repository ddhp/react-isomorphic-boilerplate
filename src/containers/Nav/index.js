import React from 'react';
import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {  get as _get } from 'lodash';
import { Link } from 'react-router-dom';
import './style.scss';

export class Nav extends Component {
  static propTypes = {
    name: PropTypes.string
  }

  render() {
    return (
      <nav>
        <Link to="/">Rib.</Link>
        <Link to="/about">About</Link>
        <Link to="/demo">Demo</Link>

        <div className="user-info">
          your are {this.props.name}
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  const entities = _get(state, 'entities'),
        name = _get(entities, 'me.name');

  return {
    name
  };
}

export default connect(mapStateToProps, null)(Nav);
