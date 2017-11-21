import test from 'ava';
import sinon from 'sinon';
import React from 'react';
import { shallow } from 'enzyme';
import { Home } from './';

let props = {
  count: 0,
  me: {
    name: 'test-name',
    sex: 'test-sex'
  },
  dummyAction: () => {},
  addPost: () => {},
  posts: [
    {
      id: 1,
      text: 'content of 1'
    },
    {
      id: 2,
      text: 'content of 2'
    }
  ]
};

test('componentDidMount calls dummyAction', t => {
  const dummyActionSpy = sinon.spy(props, 'dummyAction');
  shallow(<Home {...props} />);
  t.true(dummyActionSpy.calledOnce);
});

test('renders correctly', t => {
  const wrapper = shallow(<Home {...props} />);
  t.true(wrapper.hasClass('page--home'));
});
