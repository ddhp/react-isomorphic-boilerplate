import express from 'express';
import bodyParser from 'body-parser';
import { get as _get } from 'lodash';
import moment from 'moment';
import { normalize } from 'normalizr';
import update from 'immutability-helper';
import configureStore from '../configureStore';
import rootReducer from '../reducers/main';
import schemas from '../schemas';
import stdout from '../stdout';

const debug = stdout('server/api');
// store representing db
const store = configureStore({}, rootReducer);
const router = express.Router();

export const postcb = (req, res) => {
  const post = _get(store.getState(), 'entities.post');
  let posts = Object.keys(post).map(k => post[k]);
  posts = posts.sort((a, b) => {
    const scoreA = a.upvote - a.downvote;
    const scoreB = b.upvote - b.downvote;
    // if scroe the same, check createAt
    if (scoreA === scoreB) {
      return b.createdAt - a.createdAt;
    }
    return scoreB - scoreA;
  });

  const response = normalize(posts, [schemas.post]);
  debug(response);
  res.send(response);
};

router.get('/post', postcb);

export const postvotecb = (req, res) => {
  const { id, isUp } = req.body;
  // get post from db
  const post = _get(store.getState(), `entities.post.${id}`, {});
  debug('post', post);

  let { upvote, downvote } = post;
  debug('updownvote before', upvote, downvote);
  if (isUp) {
    upvote += 1;
  } else {
    downvote += 1;
  }
  debug('updownvote', upvote, downvote);
  let response = update(post, {
    $merge: {
      downvote,
      upvote,
    },
  });
  debug(response);
  response = normalize(response, schemas.post);

  // this is the time you notice db
  store.dispatch({
    type: 'VOTE',
    payload: response,
  });

  res.send(response);
};
router.post('/post/vote', bodyParser.json(), postvotecb);

router.post('/post', bodyParser.json(), (req, res) => {
  const { text, arthur } = req.body;
  const postEntities = _get(store.getState(), 'entities.post', {});
  const allIds = Object.keys(postEntities);
  let lastId = allIds[allIds.length - 1] || 0;
  const response = {
    id: lastId += 1,
    text: text || '',
    arthur: arthur || 'anonymous',
    createdAt: moment().valueOf(),
    upvote: 0,
    downvote: 0,
  };

  const normalized = normalize(response, schemas.post);
  debug(normalized);

  // save to local memory store
  store.dispatch({
    type: 'ADD_POST',
    payload: normalized,
  });
  debug(_get(store.getState(), 'entities.post', {}));

  res.send(normalized);
});

export default (app) => {
  app.use('/api', router);
};
