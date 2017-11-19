import stdout from '../../stdout';
const debug = stdout('reducer:post');

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

    default:
      return state;
  }
}
