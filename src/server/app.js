import Express from 'express';
import pagesMiddleware from './pages';
import apiMiddleware from './api';

const app = Express();

//Serve static files
app.use('/assets', Express.static('dist/client'));

apiMiddleware(app);
pagesMiddleware(app);

export default app;
