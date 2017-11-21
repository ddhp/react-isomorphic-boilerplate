// import { get as _get } from 'lodash';
import stdout from '../stdout';
const debug = stdout('action');
import request from 'superagent';

export const ACCUMULATE_COUNT = 'ACCUMULATE_COUNT';
export function accumulateCount() {
  return (dispatch/*, getState*/) => {
    dispatch({
      type: ACCUMULATE_COUNT,
    });
  };
}

export const DUMMY_ACTION = 'DUMMY_ACTION';
export function dummyAction() {
  return {
    type: DUMMY_ACTION
  };
}

export const UPDATE_ME = 'UPDATE_ME';
export function updateMe(me) {
  return {
    type: UPDATE_ME,
    payload: me
  };
}

export const FETCH_POSTS = 'FETCH_POSTS';
export function fetchPosts() {
  return function (dispatch) {
    return request
      .get('http://localhost:3333/api/post')
      .then((res) => {
        dispatch({
          type: FETCH_POSTS,
          payload: JSON.parse(res.text)
        });
      }, (err) => {
        debug(err);
      });
  };
}

export const ADD_POST = 'ADD_POST';
export function addPost(post) {
  return function (dispatch) {
    return request
      .post('/api/post')
      .send(post)
      .end((err, res) => {
        if (err) {
          debug(err);
        } else {
          debug(res.text);
          dispatch({
            type: ADD_POST,
            payload: JSON.parse(res.text)
          });
        }
      });
  };
}

export const VOTE = 'VOTE';
export function vote(info) {
  return function (dispatch) {
    return request
      .post('/api/post/vote')
      .send(info)
      .then(() => {
        dispatch({
          type: VOTE,
          payload: info
        });
      }, (err) => {
        debug(err);
      });
  };
}

