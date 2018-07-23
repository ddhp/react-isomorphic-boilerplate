import React from 'react';
import { Helmet } from 'react-helmet';

export default function About() {
  return (
    <div className="page--about">
      <Helmet>
        <title>
          About
        </title>
        <meta name="description" content="about page shows me" />
        <meta name="og:title" content="about page" />
      </Helmet>

        About page
    </div>
  );
}
