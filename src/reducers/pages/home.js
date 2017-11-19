const initialState = {
  count: 0
};

export default function homeReducer(state = initialState, action) {
  const payload = action.payload;
  switch (action.type) {
    case 'ACCUMULATE_COUNT': {
      return Object.assign({}, state, {
        count: payload
      });
      // state.count = payload
      // return state
    }

    default:
      return state;
  }
}
