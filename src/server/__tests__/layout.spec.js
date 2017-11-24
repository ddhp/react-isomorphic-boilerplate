import test from 'ava';
import sinon from 'sinon';
import React from 'react';
import { shallow } from 'enzyme';
import mock from 'mock-require';

// set mock path and response then require related dependencies 
mock('../../../webpack-assets.json', {
  main: {
    js: '',
    css: ''
  },
});


mock('../../assets/images/favicon.ico', '../../__mocks__/asset');
mock('../../assets/images/icon.png', '../../__mocks__/asset');

const Layout = require('../layout').default;

const mockReactHelmet = {
  toComponent: () => { return <div /> }
};
let props = {
  head: {
    title: mockReactHelmet,
    meta: mockReactHelmet
  }
};

test('renders html', t => {
  const wrapper = shallow(<Layout {...props} />);
  t.truthy(wrapper.find('html'));
});
