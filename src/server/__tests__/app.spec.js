import test from 'ava';
import request from 'supertest';
import mock from 'mock-require';

// set mock path and response then require related dependencies 
mock('../../../webpack-assets.json', {
  client: {
    js: '',
    css: ''
  },
});

mock('../layout', '../../__mocks__/dummydom');

// WARNING: import server from '../' does not work
// remove .default if module is defined as COMMONJS
const app = require('../app').default;

test.cb('request to / returns a html', t => {
  request(app)
    .get('/')
    .expect('Content-Type', 'text/html; charset=utf-8')
    .expect(200)
    .end(() => {
      t.end();
    });
});
