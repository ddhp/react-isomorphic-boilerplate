import React from 'react';
import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {  get as _get } from 'lodash';
import { addPost } from '../../../actions';

import './style.scss';

export class FormPost extends Component {
  static propTypes = {
    addPost: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      postText: ''
    };

    this.onPostTextChanged = this.onPostTextChanged.bind(this);
    this.onPostSubmit = this.onPostSubmit.bind(this);
  }

  onPostTextChanged(e) {
    this.setState({postText: e.target.value});
  }

  onPostSubmit(e) {
    e.preventDefault();
    const { postText } = this.state,
          payload = {
            text: postText
          };
    this.props.addPost(payload);
  }

  render() {
    return (
      <form className="form--post" onSubmit={this.onPostSubmit}>
        <label>
        TEXT:
          <input className="input--post-text" type="text" value={this.state.postText} onChange={this.onPostTextChanged} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

function mapStateToProps(state) {
  const entities = _get(state, 'entities'),
        me = _get(entities, 'me');

  return {
    me
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addPost: (post) => {
      return dispatch(addPost(post));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FormPost);
