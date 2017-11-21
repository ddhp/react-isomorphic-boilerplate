import React from 'react';
import { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { get as _get } from 'lodash';
import { dummyAction } from '../../actions';
import FormPost from './FormPost';
import Postlist from './Postlist';
import stdout from '../../stdout';
const debug = stdout('container/Home');

import './style.scss';

export class Home extends Component {
  static propTypes = {
    dummyAction: PropTypes.func,
    posts: PropTypes.array
  }

  componentDidMount() {
    this.props.dummyAction();
  }

  render() {
    debug('render method');
    const { posts } = this.props;

    return (
      <div className="page--home">
        <Helmet>
          <title>Home</title>
          <meta name="description" content="home page shows posts" />
          <meta name="og:title" content="home page" />
        </Helmet>

        <FormPost />

        <ul className="list--posts">
          {posts.map((p) => {
            return <Postlist post={p} key={p.id} />;
          })}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const entities = _get(state, 'entities'),
        post = _get(entities, 'post'),
        posts = Object.keys(post.byId).map((k) => {
          return post.byId[k];
        });

  return {
    posts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dummyAction: () => {
      return dispatch(dummyAction());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
