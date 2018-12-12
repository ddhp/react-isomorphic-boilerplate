import React from 'react';
import './style.scss';
import logoImg from '../../assets/images/react-logo.png';

const debug = require('../../stdout').default('containers/Demo');

debug(logoImg);

const Demo = () => (
  <div styleName="page--demo">
    <h1 styleName="demo--font">
      Title in Spectral SC
      A red flair silhouetted the jagged edge of a wing
    </h1>

    <div styleName="demo--bg" />
    <img styleName="demo--img-src" alt="" src={logoImg} />
  </div>
);

export default Demo;
