import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';

export default class About extends Component {
  render() {
    return (
      <div className="page--about">
        About page
        <Link to="/">Home</Link>
      </div>
    );
  }
}
