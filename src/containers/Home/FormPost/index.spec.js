import test from 'ava';
import sinon from 'sinon';
import React from 'react';
import { shallow } from 'enzyme';
import { FormPost } from './';
// import CSS module className map
import style from './style.scss';

const props = {
  name: 'test-name',
  addPost: () => ({
    then: () => {},
  }),
};

test('call handleChange when text input changed', (t) => {
  const onPostTextChangedSpy = sinon.spy(FormPost.prototype, 'onPostTextChanged');
  const setStateSpy = sinon.spy(FormPost.prototype, 'setState');
  const wrapper = shallow(<FormPost {...props} />);
  wrapper.find(`.${style['input--post-text']}`).simulate('change', {
    target: {
      value: 'test post text',
    },
  });
  t.true(onPostTextChangedSpy.calledOnce);
  t.true(setStateSpy.calledWith({
    postText: 'test post text',
    isShowInvalid: false,
  }));
});

test('handles when submit', (t) => {
  const onPostSubmitSpy = sinon.spy(FormPost.prototype, 'onPostSubmit');
  const preventDefaultSpy = sinon.spy();
  const addPostSpy = sinon.spy(props, 'addPost');
  const wrapper = shallow(<FormPost {...props} />);
  wrapper.find(`.${style['input--post-text']}`).simulate('change', {
    target: {
      value: 'test post text',
    },
  });
  wrapper.find(`.${style['form--post']}`).simulate('submit', {
    preventDefault: preventDefaultSpy,
  });
  t.true(onPostSubmitSpy.calledOnce);
  t.true(preventDefaultSpy.calledOnce);
  t.true(addPostSpy.calledWith({
    text: 'test post text',
    arthur: 'test-name',
  }));
});
