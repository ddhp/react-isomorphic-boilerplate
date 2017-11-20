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
  accumulateCount: () => {},
  updateMeID: () => {},
  updateMe: () => {},
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

test('componentDidMount calls accumulateCount', t => {
  const accumulateCountSpy = sinon.spy(props, 'accumulateCount');
  shallow(<Home {...props} />);
  t.true(accumulateCountSpy.calledOnce);
});

test('renders correctly', t => {
  const wrapper = shallow(<Home {...props} />);
  t.true(wrapper.hasClass('page--home'));
});

test('call handleChange when input changed', t => {
  const handleChangeSpy = sinon.spy(Home.prototype, 'handleChange'),
        setStateSpy = sinon.spy(Home.prototype, 'setState'),
        wrapper = shallow(<Home {...props} />);
  wrapper.find('.input--id').simulate('change', {
    target: {
      value: 'test-id'
    }
  });
  t.true(handleChangeSpy.calledOnce);
  t.true(setStateSpy.calledWith({ value: 'test-id' }));
});

test('handles when submit', t => {
  const handleSubmitSpy = sinon.spy(Home.prototype, 'handleSubmit'),
        preventDefaultSpy = sinon.spy(),
        updateMeIDSpy = sinon.spy(props, 'updateMeID'),
        wrapper = shallow(<Home {...props} />);
  wrapper.find('.input--id').simulate('change', {
    target: {
      value: 'test-id'
    }
  });
  wrapper.find('.form--me').simulate('submit', {
    preventDefault: preventDefaultSpy
  });
  t.true(handleSubmitSpy.calledOnce);
  t.true(preventDefaultSpy.calledOnce);
  t.true(updateMeIDSpy.calledWith('test-id'));
});
