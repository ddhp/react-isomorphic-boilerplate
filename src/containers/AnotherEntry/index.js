/* eslint class-methods-use-this: 0 */
import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

export default class AnotherEntry extends React.Component {
  static propTypes = {}

  render() {
    return (
      <div className="page--another-entry">
        <h2> this is another entry</h2>
        <p>
          <Link to="/">use {'<Link />'}</Link> to home would not work
        </p>
        <div>
          <p>
            you have to use {'<a>'} tag <a href="/">like here</a>
          </p>
          <small>Remember: you would lose benefit of SPA if doing so</small>
        </div>
      </div>
    );
  }
}
