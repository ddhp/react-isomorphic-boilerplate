import update from 'immutability-helper';
import { get as _get, isEqual as _isEqual } from 'lodash';
import stdout from '../../stdout';

const debug = stdout('reducer:post');

/**
 * keys:
 *  - id
 *  - arthur
 *  - createdAt
 *  - text
 *  - upvote
 *  - downvote
 *
 */
const initialState = {};

export default function postReducer(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case 'FETCH_POSTS': {
      const postEntities = _get(payload, 'entities.posts', {});

      // don't update if there are the same
      if (!_isEqual(postEntities, state)) {
        return update(state, {
          $merge: payload.entities.posts,
        });
      }
      return state;
    }

    case 'ADD_POST': {
      const postEntities = _get(payload, 'entities.posts', {});
      const response = postEntities[payload.result];
      debug(response);
      if (response) {
        return update(state, {
          $merge: {
            [payload.result]: response,
          },
        });
      }
      return state;
    }

    case 'VOTE': {
      const postEntities = _get(payload, 'entities.posts', {});
      const response = postEntities[payload.result];
      if (response) {
        return update(state, {
          [payload.result]: {
            $merge: {
              upvote: response.upvote,
              downvote: response.downvote,
            },
          },
        });
      }
      return state;
    }

    default:
      return state;
  }
}
