import update from 'immutability-helper';

const initialState = {
  locale: 'en',
  localeOptions: [{
    id: 'en',
    name: 'English',
  }, {
    id: 'zh',
    name: '中文',
  }, {
    id: 'ja',
    name: '日本語',
  }],
};

export const reducer = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case 'CHANGE_LOCALE': {
      return update(state, {
        locale: {
          $set: payload,
        },
      });
    }
    default: {
      return state;
    }
  }
};
export default reducer;
