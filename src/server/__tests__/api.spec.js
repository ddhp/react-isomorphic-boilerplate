import test from 'ava';
import sinon from 'sinon';
import mock from 'mock-require';

mock('../../configureStore', '../../__mocks__/configureStore');

const initState = {
  entities: {
    post: {
      1: {
        id: 1,
        upvote: 0,
        downvote: 0
      },
      2: {
        id: 2,
        upvote: 1,
        downvote: 0
      }
    }
  }
};

const dispatchSpy = sinon.spy();
const mockConfigureStore = require('../../configureStore');

mockConfigureStore.setMockState(initState);
mockConfigureStore.setDispatchSpy(dispatchSpy);
const api = require('../api');

test('get /post', t => {
  const postcb = api.postcb;
  const sendSpy = sinon.spy();
  const res = {
    send: sendSpy
  };
  postcb(null, res);
  t.true(sendSpy.calledWith({
    result: [2, 1],
    entities: {
      posts: {
        1: {
          id: 1,
          upvote: 0,
          downvote: 0
        },
        2: {
          id: 2,
          upvote: 1,
          downvote: 0
        }
      }
    }
  }));
});

test('post /post/vote', t => {
  const postvotecb = api.postvotecb;
  const sendSpy = sinon.spy();
  const req = {
    body: {
      id: 1,
      isUp: true
    }
  };
  const res = {
    send: sendSpy
  };
  const expectResponse = {
    result: 1,
    entities: {
      posts: {
        1: {
          id: 1,
          upvote: 1,
          downvote: 0
        },
      }
    }
  };
  postvotecb(req, res);
  t.true(sendSpy.calledWith(expectResponse));
  t.true(dispatchSpy.calledWith({
    type: 'VOTE',
    payload: expectResponse
  }));
});
