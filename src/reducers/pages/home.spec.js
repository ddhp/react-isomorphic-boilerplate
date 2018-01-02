import test from 'ava';

import reducer from './home';

test('ADD_POST', (t) => {
  const initState = {
    posts: [],
  };
  const action = {
    type: 'ADD_POST',
    payload: {
      result: 1,
    },
  };
  t.deepEqual(reducer(initState, action), {
    posts: [1],
  });

  // return original state if no response
  const wrongAction = {
    type: 'ADD_POST',
    payload: {
      result: undefined,
    },
  };
  t.is(reducer(initState, wrongAction), initState);
});
