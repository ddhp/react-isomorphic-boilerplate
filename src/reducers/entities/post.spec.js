import test from 'ava';

import reducer from './post';

test('FETCH_POSTS', (t) => {
  const initState = {};
  const expectState = {
    1: {
      id: 1,
    },
  };
  const action = {
    type: 'FETCH_POSTS',
    payload: {
      entities: {
        posts: expectState,
      },
    },
  };
  t.deepEqual(reducer(initState, action), expectState);

  // return original state if they are the same
  action.payload.entities.posts = initState;
  t.deepEqual(reducer(initState, action), initState);
});

test('ADD_POST', (t) => {
  const initState = {};
  const expectState = {
    1: {
      id: 1,
      text: 'test-text',
    },
  };
  const action = {
    type: 'ADD_POST',
    payload: {
      result: 1,
      entities: {
        posts: expectState,
      },
    },
  };
  t.deepEqual(reducer(initState, action), expectState);

  // return original state if no response
  const wrongAction = {
    type: 'ADD_POST',
    payload: {
      result: 1,
      entities: {
        posts: {
          2: {
            id: 2,
          },
        },
      },
    },
  };
  t.is(reducer(initState, wrongAction), initState);
});
