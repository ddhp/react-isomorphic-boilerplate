import test from 'ava';
import sinon from 'sinon';

import mock from 'mock-require';

mock('superagent', '../__mocks__/superagent');

const mocksuperagent = require('superagent').default;

const action = require('./').default;

test('addPost would dispatch ADD_POST with response of request', (t) => {
  mocksuperagent.setMockResponse({
    text: JSON.stringify({ t: 'test' }),
  });
  const dispatchSpy = sinon.spy();
  action.addPost()(dispatchSpy);
  t.true(dispatchSpy.calledWith({
    type: 'ADD_POST',
    payload: { t: 'test' },
  }));
});

test('vote would dispatch VOTE action after request success', (t) => {
  mocksuperagent.setMockResponse({
    text: JSON.stringify({ t: 'vote' }),
  });
  const dispatchSpy = sinon.spy();
  action.vote()(dispatchSpy);
  t.true(dispatchSpy.calledWith({
    type: 'VOTE',
    payload: { t: 'vote' },
  }));
});
