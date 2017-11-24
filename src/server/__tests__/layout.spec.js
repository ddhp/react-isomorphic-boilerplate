import test from 'ava';
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

const renderFullPage = require('../layout').default;

// don't know why eslint complains
/* eslint-disable react/display-name */
const mockReactHelmet = (key) => {
  return {
    toString: () => { return `mock helmet of ${key}`; }
  };
};
/* eslint-enable react/display-name */

let head = {
  title: mockReactHelmet('title'),
  meta: mockReactHelmet('meta')
};

test('renders html', t => {
  const html = renderFullPage('', '{}', head);
  t.true(html.indexOf('mock helmet of title') > -1);
  t.true(html.indexOf('mock helmet of meta') > -1);
});
