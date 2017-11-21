import React from 'react';
import { Component } from 'react';
import './style.scss';

export default class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <a href="https://github.com/ddhp/react-isomorphic-boilerplate" target="_blank" rel="noopener noreferrer">react isomorphic boilerplate</a> by ddhp
      </div>
    );
  }
}
