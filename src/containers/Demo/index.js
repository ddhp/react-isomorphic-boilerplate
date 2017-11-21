import React from 'react';
import { Component } from 'react';
import stdout from '../../stdout';
const debug = stdout('container/Demo');
import './style.scss';

import logoImg from '../../assets/images/react-logo.png';
debug(logoImg);

export default class Demo extends Component {
  render() {
    return (
      <div className="page--demo">
        <h1 className="demo--font">
          Title in Spectral SC
          A red flair silhouetted the jagged edge of a wing
        </h1>

        <div className="demo--bg"></div>
        <img className="demo--img-src" src={logoImg} />
      </div>
    );
  }
}
