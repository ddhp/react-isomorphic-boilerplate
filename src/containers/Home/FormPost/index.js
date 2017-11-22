import React from 'react';
import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {  get as _get } from 'lodash';
import classNames from 'classnames';
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
      postText: '',
      isShowInvalid: false
    };

    this.onPostTextChanged = this.onPostTextChanged.bind(this);
    this.onPostSubmit = this.onPostSubmit.bind(this);
  }

  validateShowError(text) {
    return text.length < 256;
  }

  validate(text) {
    return text.length > 0 && text.length < 256;
  }

  onPostTextChanged(e) {
    const postText = e.target.value;
    const isShowInvalid = !this.validateShowError(postText);
    this.setState({
      postText,
      isShowInvalid
    });
  }

  onPostSubmit(e) {
    e.preventDefault();
    const { postText } = this.state,
          { name, addPost } = this.props,
          payload = {
            text: postText,
            arthur: name
          };
    if (this.validate(postText)) {
      addPost(payload)
        .then(() => {
          this.setState({
            postText: ''
          });
        });
    }
  }

  render() {
    const { isShowInvalid } = this.state;

    return (
      <form className="form--post" onSubmit={this.onPostSubmit}>
        <p className="form-group title">Anything to say?</p>
        <div className="form-row">
          <textarea 
            className={classNames('input--post-text', {
              'is-error': isShowInvalid
            })}
            value={this.state.postText} 
            onChange={this.onPostTextChanged} 
          />
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
