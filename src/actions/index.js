import { get as _get } from 'lodash';

export const ACCUMULATE_COUNT = 'ACCUMULATE_COUNT';
export function accumulateCount() {
  return (dispatch, getState) => {
    let count = _get(getState(), 'pages.home.count', 0);
    count ++;
    dispatch({
      type: ACCUMULATE_COUNT,
      payload: count
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
