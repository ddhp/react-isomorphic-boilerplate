import express from 'express';
import bodyParser from 'body-parser';
import { get as _get } from 'lodash';
import configureStore from '../configureStore';
import stdout from '../stdout';
const debug = stdout('app-server');

const store = configureStore({});
const router = express.Router();

router.get('/post', (req, res) => {
  const post = _get(store.getState(), 'entities.post');
  debug(post);
  res.send(post);
});

router.post('/post', bodyParser.json(), (req, res) => {
  const { text } = req.body,
        allIds = _get(store.getState(), 'entities.post.allIds', []);
  let lastId = allIds[allIds.length -1] || 0;
  const response = {
    id: ++lastId,
    text: text || ''
  };

  store.dispatch({
    type: 'ADD_POST',
    payload: response
  }); 
  debug(_get(store.getState(), 'entities.post', []));
  res.send(response);
});

module.exports = (app) => {
  app.use('/api', router);
};
