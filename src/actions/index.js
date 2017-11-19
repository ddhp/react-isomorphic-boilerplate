// import { get as _get } from 'lodash';

export const ACCUMULATE_COUNT = 'ACCUMULATE_COUNT';
export function accumulateCount() {
  return (dispatch/*, getState*/) => {
    dispatch({
      type: ACCUMULATE_COUNT,
    });
  };
}

export const UPDATE_ME_ID = 'UPDATE_ME_ID';
export function updateMeID(id) {
  return {
    type: UPDATE_ME_ID,
    payload: id
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
  return {
    type: FETCH_POSTS,
    payload: [
      {
        id: 1,
        text: 'content of 1'
      },
      {
        id: 2,
        text: 'content of 2'
      }
    ]
  };
}
