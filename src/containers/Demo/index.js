import React from 'react';
import stdout from '../../stdout';
import './style.scss';
import logoImg from '../../assets/images/react-logo.png';

const debug = stdout('container/Demo');
debug(logoImg);

const Demo = () => (
  <div className="page--demo">
    <h1 className="demo--font">
      Title in Spectral SC
      A red flair silhouetted the jagged edge of a wing
    </h1>

    <div className="demo--bg" />
    <img className="demo--img-src" alt="" src={logoImg} />
  </div>
);

export default Demo;
