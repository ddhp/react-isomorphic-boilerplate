import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { get as _get } from 'lodash';
import action from '../../actions';
import FormPostComponent from './FormPost';
import PostlistComponent from './Postlist';
import stdout from '../../stdout';
import style from './style.scss'; // eslint-disable-line no-unused-vars

const debug = stdout('container/Home');

export class Home extends React.Component {
  static propTypes = {
    dummyAction: PropTypes.func.isRequired,
    fetchPosts: PropTypes.func.isRequired,
    posts: PropTypes.arrayOf(PropTypes.object),
  }

  static defaultProps = {
    posts: [],
  }

  componentDidMount() {
    const { fetchPosts, dummyAction } = this.props;
    // componentDidMount hook only triggers on browser side
    // do browser specific behavior here
    fetchPosts();
    dummyAction();
  }

  render() {
    debug('render method');
    const { posts } = this.props;

    return (
      <div styleName="style.page--home">
        <Helmet>
          <title>
            Home
          </title>
          <meta name="description" content="home page shows posts" />
          <meta name="og:title" content="home page" />
        </Helmet>

        <FormPostComponent />

        <ul styleName="style.list--posts">
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
    fetchPosts: () => dispatch(action.fetchPosts()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
