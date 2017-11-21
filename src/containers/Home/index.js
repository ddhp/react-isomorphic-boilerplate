import React from 'react';
import { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import {  get as _get } from 'lodash';
import { dummyAction, updateMeID, updateMe, addPost } from '../../actions';
import stdout from '../../stdout';
const debug = stdout('container/Home');

import './style.scss';

export class Home extends Component {
  static propTypes = {
    dummyAction: PropTypes.func,
    addPost: PropTypes.func,
    me: PropTypes.object,
    posts: PropTypes.array
  }

  constructor(props) {
    super(props);
    this.state = {
      value: '',
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

  componentDidMount() {
    this.props.dummyAction();
  }

  render() {
    debug('render method');
    const { name } = this.props.me,
          { posts } = this.props;
    return (
      <div className="page--home">
        <Helmet>
          <title>Home</title>
          <meta name="description" content="home page shows posts" />
          <meta name="og:title" content="home page" />
        </Helmet>

        <ul className="posts">
          {posts.map((p) => {
            return (
              <li key={p.id}>
                {p.id}, {p.text}
              </li>
            );
          })}
        </ul>

        <form className="form--post" onSubmit={this.onPostSubmit}>
          <label>
          TEXT:
            <input className="input--post-text" type="text" value={this.state.postText} onChange={this.onPostTextChanged} />
          </label>
          <input type="submit" value="Submit" />
        </form>

        <div>name: {name}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const entities = _get(state, 'entities'),
        me = _get(entities, 'me'),
        post = _get(entities, 'post'),
        posts = Object.keys(post.byId).map((k) => {
          return post.byId[k];
        });

  return {
    me,
    posts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dummyAction: () => {
      return dispatch(dummyAction());
    },
    updateMeID: (id) => {
      return dispatch(updateMeID(id));
    },
    updateMe: (me) => {
      return dispatch(updateMe(me));
    },
    addPost: (post) => {
      return dispatch(addPost(post));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
