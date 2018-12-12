// import { get as _get } from 'lodash';
import request from 'superagent';
import stdout from '../stdout';
import { changeLocale } from './global';

const debug = stdout('action');

export {
  changeLocale,
};

export function accumulateCount() {
  return dispatch => dispatch({
    type: 'ACCUMULATE_COUNT',
  });
}

export function dummy() {
  return async dispatch => new Promise(() => setTimeout(() => {
    dispatch({
      type: 'DUMMY_ACTION',
    });
  }, 1000));
}

export function updateMe(me) {
  return {
    type: 'UPDATE_ME',
    payload: me,
  };
}

export function fetchPosts() {
  return async (dispatch) => {
    try {
      const res = await request.get('http://localhost:3333/api/post');
      debug(res);
      return dispatch({
        type: 'FETCH_POSTS',
        payload: JSON.parse(res.text),
      });
    } catch (err) {
      debug(err);
      return err;
    }
  };
}

export function addPost(post) {
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

export function vote(info) {
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
