import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

export default class Nav extends Component {
  render() {
    return (
      <nav>
        <Link to="/">Rib.</Link>
        <Link to="/about">About</Link>
        <Link to="/demo">Demo</Link>
      </nav>
    );
  }
}
