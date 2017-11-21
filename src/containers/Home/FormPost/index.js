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
    name: PropTypes.string
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
          { name, addPost } = this.props,
          payload = {
            text: postText,
            arthur: name
          };
    if (postText.length) {
      addPost(payload)
        .then(() => {
          this.setState({
            postText: ''
          });
        });
    }
  }

  render() {
    return (
      <form className="form--post" onSubmit={this.onPostSubmit}>
        <p className="form-group title">Anything to say?</p>
        <div className="form-row">
          <textarea className="input--post-text" value={this.state.postText} onChange={this.onPostTextChanged} />
          <div className="btn-wrapper">
            <button className="btn--post-submit" type="submit">Submit</button>
          </div>
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  const entities = _get(state, 'entities'),
        name = _get(entities, 'me.name');

  return {
    name
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
