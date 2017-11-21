import test from 'ava';
import sinon from 'sinon';
import React from 'react';
import { shallow } from 'enzyme';
import { FormPost } from './';

let props = {
  name: 'test-name',
  addPost: () => {},
};

test('call handleChange when text input changed', t => {
  const onPostTextChangedSpy = sinon.spy(FormPost.prototype, 'onPostTextChanged'),
        setStateSpy = sinon.spy(FormPost.prototype, 'setState'),
        wrapper = shallow(<FormPost {...props} />);
  wrapper.find('.input--post-text').simulate('change', {
    target: {
      value: 'test post text'
    }
  });
  t.true(onPostTextChangedSpy.calledOnce);
  t.true(setStateSpy.calledWith({ postText: 'test post text' }));
});

test('handles when submit', t => {
  const onPostSubmitSpy = sinon.spy(FormPost.prototype, 'onPostSubmit'),
        preventDefaultSpy = sinon.spy(),
        addPostSpy = sinon.spy(props, 'addPost'),
        wrapper = shallow(<FormPost {...props} />);
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
    text: 'test post text',
    arthur: 'test-name'
  }));
});
