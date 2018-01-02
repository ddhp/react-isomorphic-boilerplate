import test from 'ava';
import sinon from 'sinon';
import React from 'react';
import { shallow } from 'enzyme';
import { Home, mapStateToProps, mapDispatchToProps } from './';

const mockPost = {
  1: {
    id: 1,
    text: 'content of 1',
  },
  2: {
    id: 2,
    text: 'content of 2',
  },
};

const props = {
  count: 0,
  me: {
    name: 'test-name',
    sex: 'test-sex',
  },
  dummyAction: () => {},
  addPost: () => {},
  posts: [
    {
      id: 1,
      text: 'content of 1',
    },
    {
      id: 2,
      text: 'content of 2',
    },
  ],
};

test('componentDidMount calls dummyAction', (t) => {
  const dummyActionSpy = sinon.spy(props, 'dummyAction');
  shallow(<Home {...props} />);
  t.true(dummyActionSpy.calledOnce);
});

test('renders correctly', (t) => {
  const wrapper = shallow(<Home {...props} />);
  t.true(wrapper.hasClass('page--home'));
});

test('mapStateToProps', (t) => {
  const mappedProps = mapStateToProps({
    entities: {
      post: mockPost,
    },
    pages: {
      home: {
        posts: [1],
      },
    },
  });
  t.deepEqual(mappedProps.posts, [mockPost['1']]);
});

test('mapDispatchToProps', (t) => {
  const dispatchSpy = sinon.spy();
  const dispatchers = mapDispatchToProps(dispatchSpy);
  dispatchers.dummyAction();
  t.true(dispatchSpy.calledOnce);
});
