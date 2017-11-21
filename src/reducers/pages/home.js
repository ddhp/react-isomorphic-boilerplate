const initialState = {
  count: 0,
  post: []
};

export default function homeReducer(state = initialState, action) {
  // const payload = action.payload;
  switch (action.type) {
    case 'ACCUMULATE_COUNT': {
      return Object.assign({}, state, {
        count: ++ state.count
      });
      // state.count = payload
      // return state
    }

    case 'FETCH_POSTS': {
      return state;
    }

    default:
      return state;
  }
}
