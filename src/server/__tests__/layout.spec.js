import test from 'ava';
import mock from 'mock-require';

// set mock path and response then require related dependencies
mock('../../../webpack-assets.json', {
  main: {
    js: '',
    css: '',
  },
});


mock('../../assets/images/favicon.ico', '../../__mocks__/asset');
mock('../../assets/images/icon.png', '../../__mocks__/asset');

const renderFullPage = require('../layout').default;

const mockReactHelmet = key => ({
  toString: () => `mock helmet of ${key}`,
});

const head = {
  title: mockReactHelmet('title'),
  meta: mockReactHelmet('meta'),
};

const mockClientStats = {
  publicPath: '/',
  entrypoints: {
    main: {
      assets: [
        '', '',
      ],
    },
  },
};

test('renders html', (t) => {
  const html = renderFullPage('', '{}', head, 'main', mockClientStats);
  t.true(html.indexOf('mock helmet of title') > -1);
  t.true(html.indexOf('mock helmet of meta') > -1);
});
