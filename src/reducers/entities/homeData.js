const initialState = {
  byId: {},
  allIds: []
};

export default function homeDataReducer(state = initialState, action) {
  const payload = action.payload;
  switch (action.type) {
    case 'FETCH_HOME_DATA': {
      let byId = {},
          allIds = [];
      payload.map((d) => {
        byId[d.id] = d;
        allIds.push(d.id);
      });
      return Object.assign({}, state, {
        byId,
        allIds
      });
    }

    default:
      return state;
  }
}
