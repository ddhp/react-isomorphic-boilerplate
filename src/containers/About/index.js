import React from 'react';
import { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

export default class About extends Component {
  render() {
    return (
      <div className="page--about">
        <Helmet>
          <title>About</title>
          <meta name="description" content="about page shows me" />
          <meta name="og:title" content="about page" />
        </Helmet>
      
        About page
        <Link to="/">Home</Link>
      </div>
    );
  }
}
