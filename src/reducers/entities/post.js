import update from 'immutability-helper';
// import stdout from '../../stdout';
// const debug = stdout('reducer:post');

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
      return Object.assign({}, state, payload);
    }

    case 'ADD_POST': {
      return update(state, {
        $merge: {
          [payload.id]: payload
        }
      });
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
