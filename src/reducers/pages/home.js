import update from 'immutability-helper';
import { get as _get } from 'lodash';
import stdout from '../../stdout';

const debug = stdout('reducer:home');

const initialState = {
  count: 0,
  posts: [],
};

export default function homeReducer(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case 'ACCUMULATE_COUNT': {
      const count = state.count + 1;
      return Object.assign({}, state, {
        count,
      });
      // state.count = payload
      // return state
    }

    case 'FETCH_POSTS': {
      const result = _get(payload, 'result', []);
      return update(state, {
        posts: {
          $set: result,
        },
      });
    }

    case 'ADD_POST': {
      const result = _get(payload, 'result');
      debug(result);
      if (result) {
        return update(state, {
          posts: {
            $unshift: [result],
          },
        });
      }
      return state;
    }

    default:
      return state;
  }
}
