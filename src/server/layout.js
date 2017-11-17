import React from 'react';
import { Component } from 'react';
import PropTypes from 'prop-types';

const assetsJSON = require('../../webpack-assets.json');

export default class Layout extends Component {
  static propTypes = {
    content: PropTypes.object,
    reduxState: PropTypes.string
  }

  render() {
    const { content, reduxState } = this.props;
    return (
      <html>
        <head>
          <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
          <link href={assetsJSON.client.css} rel="stylesheet" />

          <script type="text/javascript" charSet="utf-8" dangerouslySetInnerHTML={{__html: `
            window.__REDUX_STATE__ = ${reduxState}
            `}} />
        </head>
        <body>
          <div id="app-mount-point">
            {content}
          </div>
          {/* entry script generated by webpack*/}
          <script src={assetsJSON.client.js} type="text/javascript" charSet="utf-8"></script>
        </body>
      </html>
    );
  }
}
