import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { get as _get } from 'lodash';
import action from '../../actions';
import FormPostComponent from './FormPost';
import PostlistComponent from './Postlist';
import stdout from '../../stdout';
import './style.scss';

const debug = stdout('container/Home');

export class Home extends React.Component {
  static propTypes = {
    dummyAction: PropTypes.func,
    posts: PropTypes.array,
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

        <FormPostComponent />

        <ul className="list--posts">
          {posts.map(p => <PostlistComponent post={p} key={p.id} />)}
        </ul>
      </div>
    );
  }
}

export function mapStateToProps(state) {
  const postEntity = _get(state, 'entities.post');
  const postIds = _get(state, 'pages.home.posts');
  let posts = postIds.map(id => postEntity[id] || {});
  posts = posts.slice(0, 20);
  debug(posts);

  return {
    posts,
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    dummyAction: () => dispatch(action.dummyAction()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
