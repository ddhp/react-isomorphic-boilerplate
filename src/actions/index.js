// import { get as _get } from 'lodash';
import request from 'superagent';
import stdout from '../stdout';

const debug = stdout('action');

function accumulateCount() {
  return dispatch => dispatch({
    type: 'ACCUMULATE_COUNT',
  });
}

function dummyAction() {
  return {
    type: 'DUMMY_ACTION',
  };
}

function updateMe(me) {
  return {
    type: 'UPDATE_ME',
    payload: me,
  };
}

function fetchPosts() {
  return dispatch => request
    .get('http://localhost:3333/api/post')
    .then(res => dispatch({
      type: 'FETCH_POSTS',
      payload: JSON.parse(res.text),
    }), (err) => {
      debug(err);
      return err;
    });
}

function addPost(post) {
  return dispatch => request
    .post('/api/post')
    .send(post)
    .then((res) => {
      debug(res.text);
      return dispatch({
        type: 'ADD_POST',
        payload: JSON.parse(res.text),
      });
    }, (err) => {
      debug(err);
      return err;
    });
}

function vote(info) {
  return dispatch => request
    .post('/api/post/vote')
    .send(info)
    .then(res => dispatch({
      type: 'VOTE',
      payload: JSON.parse(res.text),
    }), (err) => {
      debug(err);
      return err;
    });
}

export default {
  accumulateCount,
  dummyAction,
  updateMe,
  fetchPosts,
  addPost,
  vote,
};
