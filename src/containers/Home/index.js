import React from 'react';
import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {  get as _get } from 'lodash';
import { Link } from 'react-router-dom';
import { accumulateCount, updateMeID, updateMe, addPost } from '../../actions';
import stdout from '../../stdout';
const debug = stdout('container/home/index');

import './style.scss';
import logoImg from '../../assets/images/react-logo.png';
debug(logoImg);

export class Home extends Component {
  static propTypes = {
    count: PropTypes.number,
    accumulateCount: PropTypes.func,
    updateMeID: PropTypes.func,
    updateMe: PropTypes.func,
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

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onPostTextChanged = this.onPostTextChanged.bind(this);
    this.onPostSubmit = this.onPostSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    debug('A name was submitted: ' + this.state.value);
    event.preventDefault();
    this.props.updateMeID(this.state.value);
  }

  onClick() {
    debug('onclick');
    this.props.updateMe({
      id: Math.random().toString()
    });
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
    this.props.accumulateCount();
  }
  
  // shouldComponentUpdate(nextProps, nextState) {
  //   const { name: thisName, sex: thisSex } = this.props.me,
  //         { name: nextName, sex: nextSex } = nextProps.me;
  //   if (thisName !== nextName || 
  //       thisSex !== nextSex ||
  //       this.state !== nextState) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  render() {
    debug('render method');
    const { name, sex } = this.props.me,
          { posts } = this.props;
    return (
      <div className="page--home">
        <h1 className="demo--font">
          Title in Spectral SC
          A red flair silhouetted the jagged edge of a wing
        </h1>
        <Link to="/about">To About</Link>

        <div className="demo--bg"></div>
        <img className="demo--img-src" src={logoImg} />

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

        counter: {this.props.count}
        <div>name: {name}</div>
        <div>sex: {sex}</div>
        <form onSubmit={this.handleSubmit}>
          <label>
          ID:
            <input className="input--id" type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <p onClick={this.onClick}>Set random user id by update whole user object</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const count = _get(state, 'pages.home.count', 0),
        entities = _get(state, 'entities'),
        me = _get(entities, 'me'),
        post = _get(entities, 'post'),
        posts = Object.keys(post.byId).map((k) => {
          return post.byId[k];
        });

  return {
    count,
    me,
    posts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    accumulateCount: () => {
      return dispatch(accumulateCount());
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
