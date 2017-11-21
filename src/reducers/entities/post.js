import update from 'immutability-helper';
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
const initialState = {
  byId: {},
  allIds: []
};

export default function postReducer(state = initialState, action) {
  const payload = action.payload;
  switch (action.type) {
    case 'FETCH_POSTS': {
      return Object.assign({}, state, payload);
    }

    case 'ADD_POST': {
      let allIds = Array.prototype.slice.call(state.allIds);
      let byId = Object.assign({}, state.byId);

      allIds.push(payload.id);
      byId[payload.id] = payload;
      debug(allIds, byId);

      return Object.assign({}, state, {
        byId,
        allIds
      });
    }

    case 'VOTE': {
      const post = state.byId[payload.id];
      let vote = post.vote || 0;
      if (payload.isUp) {
        vote ++;
      } else {
        if (vote > 0) {
          vote --;
        }  
      }
      return update(state, {
        byId: {
          [payload.id]: {
            $merge: {
              vote
            }
          }
        }
      });
    }

    default:
      return state;
  }
}
