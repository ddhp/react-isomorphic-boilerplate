import test from 'ava';
import request from 'supertest';
import 'ignore-styles'
import server from '../';

test.cb('request to / returns a html', t => {
  request(server)
    .get('/')
    .expect('Content-Type', 'text/html; charset=utf-8')
    .expect(200)
    .end(() => {
      t.end();
    })
});
