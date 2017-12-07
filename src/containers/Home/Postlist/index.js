import React from 'react';
import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { vote } from '../../../actions';

import './style.scss';

export class Postlist extends Component {
  static propTypes = {
    post: PropTypes.object,
    vote: PropTypes.func
  }

  constructor(props) {
    super(props);

    this.onUpvote = this.onUpvote.bind(this);
    this.onDownvote = this.onDownvote.bind(this);
  }

  onUpvote() {
    const { post, vote } = this.props;
    vote({
      id: post.id,
      isUp: true
    });
  }

  onDownvote() {
    const { post, vote } = this.props;
    vote({
      id: post.id
    });
  }

  render() {
    const { post: p } = this.props,
          { downvote, upvote } = p;
    return (
      <li className="postlist">
        <div className="text">
          {p.text.split('\n').map((p, i) => {
            return <p key={i}>{p}</p>;
          })}
        </div>
        <div>
          <span className="arthur">{p.arthur} </span>
          <span className="createdAt">{moment().from(p.createdAt)}</span>
          <button onClick={this.onUpvote}> +{upvote} </button>
          <button onClick={this.onDownvote}> -{downvote} </button>
        </div>
      </li>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    vote: (voteInfo) => {
      return dispatch(vote(voteInfo));
    }
  };
}

export default connect(null, mapDispatchToProps)(Postlist);
