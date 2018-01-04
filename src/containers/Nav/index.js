import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get as _get } from 'lodash';
import { Link } from 'react-router-dom';
import './style.scss';

const Nav = ({ name }) => (
  <nav>
    <Link to="/">Rib.</Link>
    <Link to="/about">About</Link>
    <Link to="/demo">Demo</Link>
    <a href="another-entry">Another</a>

    <div className="user-info">
      your are {name}
    </div>
  </nav>
);

Nav.propTypes = {
  name: PropTypes.string,
};

Nav.defaultProps = {
  name: '',
};

function mapStateToProps(state) {
  const entities = _get(state, 'entities');
  const name = _get(entities, 'me.name');

  return {
    name,
  };
}

export default connect(mapStateToProps, null)(Nav);
