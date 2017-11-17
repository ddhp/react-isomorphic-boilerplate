const initialState = {
  id: 'myid',
  name: 'jesse',
  sex: 'male'
};

export default function meReducer(state = initialState, action) {
  const payload = action.payload;
  switch (action.type) {
    case 'UPDATE_ME_ID':
      return Object.assign({}, state, {
        id: payload
      });

    case 'UPDATE_ME_NAME':
      return Object.assign({}, state, {
        name: payload
      });

    case 'UPDATE_ME_SEX':
      return Object.assign({}, state, {
        sex: payload
      });

    case 'UPDATE_ME':
      return Object.assign({}, state, payload);

    default:
      return state;
  }
}
