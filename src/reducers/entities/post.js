import update from 'immutability-helper';
import { get as _get } from 'lodash';
import stdout from '../../stdout';
const debug = stdout('reducer:post');

/**
 * keys:
 *  - id
 *  - arthur
 *  - createdAt
 *  - text
 *  - vote
 *
 */
const initialState = {};

export default function postReducer(state = initialState, action) {
  const payload = action.payload;
  switch (action.type) {
    case 'FETCH_POSTS': {
      if (payload.entities.posts) {
        return update(state, {
          $merge: payload.entities.posts
        });
      } else {
        return state;
      }
    }

    case 'ADD_POST': {
      const postEntities = _get(payload, 'entities.posts', {});
      const response = postEntities[payload.result];
      debug(response);
      if (response) {
        return update(state, {
          $merge: {
            [payload.result]: response
          }
        });
      } else {
        return state;
      }
    }

    case 'VOTE': {
      const post = state[payload.id];
      let vote = post.vote || 0;
      if (payload.isUp) {
        vote ++;
      } else {
        if (vote > 0) {
          vote --;
        }  
      }
      return update(state, {
        [payload.id]: {
          $merge: {
            vote
          }
        }
      });
    }

    default:
      return state;
  }
}
