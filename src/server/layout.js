import path from 'path';
import favicon from '../assets/images/favicon.ico';
import touchicon from '../assets/images/icon.png';

const debug = require('../stdout').default('server:layout');

function genJSTag(p) {
  return p ? `<script src=${p} type="text/javascript" charSet="utf-8"></script>` : '';
}

function genCSSTag(p) {
  return p ? `<link href=${p} rel="stylesheet" />` : '';
}

function genTag(targetPath, type) {
  if (!targetPath) {
    return '';
  }
  let method = () => {};
  let targetPaths = targetPath;
  if (type === 'CSS') { method = genCSSTag; }
  if (type === 'JS') { method = genJSTag; }
  if (!Array.isArray(targetPaths)) {
    targetPaths = [targetPaths];
  }
  const res = targetPaths.reduce((accu, p) => `${accu}\n${method(p)}`, '');
  return res;
}

function renderFullPage(content, reduxState, head, currentEntry, clientStats) {
  const { entrypoints, publicPath } = clientStats;
  const targetAssets = entrypoints[currentEntry].assets.map(a => path.join(publicPath, a));
  debug('targetAssets', targetAssets);
  let targetJS = '';
  let targetCSS = '';
  targetAssets.map((a) => {
    if (/\.js$/.test(a)) { targetJS += genTag(a, 'JS'); }
    if (/\.css$/.test(a)) { targetCSS += genTag(a, 'CSS'); }
    return false;
  });

  return `
    <!doctype html>
    <html>
      <head>
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        ${head.title.toString()}
        ${head.meta.toString()}

        <link rel="icon" type="image/x-icon" href=${favicon} />
        <link rel="apple-touch-icon" href=${touchicon} />

        <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" />
        ${targetCSS}

        <script type="text/javascript" charSet="utf-8">
          window.__REDUX_STATE__ = ${reduxState}
        </script>
      </head>
      <body>
        <div id="app-mount-point">${content}</div>
        ${targetJS}
      </body>
    </html>
  `;
}

export default renderFullPage;
