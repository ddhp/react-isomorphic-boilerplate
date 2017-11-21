import express from 'express';
import bodyParser from 'body-parser';
import { get as _get, sortBy as _sortBy } from 'lodash';
import configureStore from '../configureStore';
import moment from 'moment';
import { normalize } from 'normalizr';
import update from 'immutability-helper';

import stdout from '../stdout';
const debug = stdout('server/api');

// store representing db
const store = configureStore({});
const router = express.Router();

// don't know why import doesn't work
const schemas = require('../schemas');

router.get('/post', (req, res) => {
  const post = _get(store.getState(), 'entities.post');
  let posts = Object.keys(post).map((k) => {
    return post[k];
  });
  posts = _sortBy(posts, ['vote', 'createdAt']).reverse();

  const response = normalize(posts, [schemas.post]);
  debug(response);
  res.send(response);
});

router.post('/post/vote', bodyParser.json(), (req, res) => {
  const { id, isUp } = req.body;
  // get post from db
  const post = _get(store.getState(), `entities.post.${id}`, {});

  let vote = post.vote || 0;
  if (isUp) {
    vote ++;
  } else {
    if (vote > 0) {
      vote --;
    }  
  }
  let response = update(post, {
    $merge: {
      vote
    }
  });
  debug(response);
  response = normalize(response, schemas.post);
  debug(response);

  // this is the time you notice db
  store.dispatch({
    type: 'VOTE',
    payload: response
  });

  res.send(response);
});

router.post('/post', bodyParser.json(), (req, res) => {
  const { text, arthur } = req.body,
        postEntities = _get(store.getState(), 'entities.post', {}),
        allIds = Object.keys(postEntities);
  let lastId = allIds[allIds.length -1] || 0;
  const response = {
    id: ++lastId,
    text: text || '',
    arthur: arthur || 'anonymous',
    createdAt: moment().valueOf(),
    vote: 0
  };

  const normalized = normalize(response, schemas.post);
  debug(normalized);

  // save to local memory store
  store.dispatch({
    type: 'ADD_POST',
    payload: normalized
  });
  debug(_get(store.getState(), 'entities.post', {}));

  res.send(normalized);
});

module.exports = (app) => {
  app.use('/api', router);
};
