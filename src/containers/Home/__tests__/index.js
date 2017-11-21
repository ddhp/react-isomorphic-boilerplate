import test from 'ava';
import sinon from 'sinon';
import React from 'react';
import { shallow } from 'enzyme';
import { Home } from '../';

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

test('call handleChange when text input changed', t => {
  const onPostTextChangedSpy = sinon.spy(Home.prototype, 'onPostTextChanged'),
        setStateSpy = sinon.spy(Home.prototype, 'setState'),
        wrapper = shallow(<Home {...props} />);
  wrapper.find('.input--post-text').simulate('change', {
    target: {
      value: 'test post text'
    }
  });
  t.true(onPostTextChangedSpy.calledOnce);
  t.true(setStateSpy.calledWith({ postText: 'test post text' }));
});

test('handles when submit', t => {
  const onPostSubmitSpy = sinon.spy(Home.prototype, 'onPostSubmit'),
        preventDefaultSpy = sinon.spy(),
        addPostSpy = sinon.spy(props, 'addPost'),
        wrapper = shallow(<Home {...props} />);
  wrapper.find('.input--post-text').simulate('change', {
    target: {
      value: 'test post text'
    }
  });
  wrapper.find('.form--post').simulate('submit', {
    preventDefault: preventDefaultSpy
  });
  t.true(onPostSubmitSpy.calledOnce);
  t.true(preventDefaultSpy.calledOnce);
  t.true(addPostSpy.calledWith({
    text: 'test post text'
  }));
});
