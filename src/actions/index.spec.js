import test from 'ava';
import sinon from 'sinon';

import mock from 'mock-require';
mock('superagent', '../__mocks__/superagent');

const mocksuperagent = require('superagent').default;

const actions = require('./');

test('addPost would dispatch ADD_POST with response of request', (t) => {
  mocksuperagent.setMockResponse({
    text: JSON.stringify({t: 'test'})
  });
  const addPost = actions.addPost;
  const dispatchSpy = sinon.spy();
  addPost()(dispatchSpy);
  t.true(dispatchSpy.calledWith({
    type: 'ADD_POST',
    payload: {t: 'test'}
  }));
});

test('vote would dispatch VOTE action after request success', (t) => {
  mocksuperagent.setMockResponse({
    text: JSON.stringify({t: 'vote'})
  });
  const vote = actions.vote;
  const dispatchSpy = sinon.spy();
  vote()(dispatchSpy);
  t.true(dispatchSpy.calledWith({
    type: 'VOTE',
    payload: {t: 'vote'}
  }));
});
