# react-isomorphic-boilerplate
This boilerplate would help you build a react/redux/react-router isomorphic/universal web app

## Feature
- isomorphic: same code runs on server and browser
- SEO: information benefits to search engine would be rendered on server side
- easy to start
- production ready

## Concept
### Development
0. `yarn` and run 3 processes to start developing your app:
1. `yarn run build:client:dev:w`: build client side code and watch file change.
2. `yarn run build:server:dev:w`: build server side conde and watch file change.
3. `yarn start`: nodemon executing `dist/server.js`, and only watches on it's change,
   [--inspect](https://nodejs.org/en/docs/guides/debugging-getting-started/#enable-inspector) param is given,
   you can debug nodejs server on chrome-devtools.

All development code are built with [source map](http://blog.teamtreehouse.com/introduction-source-maps).

### Log
import stdout and define namespace ([example](https://github.com/ddhp/react-isomorphic-boilerplate/blob/master/src/server/pages.js)), then turn on debug message depends on platform:
- browser: allow debug log by type `localStorage.debug = '*'` in console
- server: run node with `DEBUG=*`, see `package.json.scripts.start`.

### Packing code
- Fonts: font face are set in `src/client/global.scss`
- Images: set src relative to your js or scss file, 

[extract-text-webpack-plugin](https://github.com/webpack-contrib/extract-text-webpack-plugin) would extract them (font, image) into static assets and handle url transform.


### Style
- [reset.css](https://www.npmjs.com/package/reset-css) reseting default style imported in [global.scss](https://github.com/ddhp/react-isomorphic-boilerplate/blob/master/src/client/global.scss).

### SEO
- Define `loadData` method in your route to prefetch data needed for SEO. ([example](https://github.com/ddhp/react-isomorphic-boilerplate/blob/master/src/routes/main.js))
- [react-helmet](https://github.com/nfl/react-helmet) help us set head (or specific property) in container and overwrites setting from parent, very handy.
- Define your basic helmet setting in each route file, see [src/routers/main.js](https://github.com/ddhp/react-isomorphic-boilerplate/blob/master/src/routes/main.js),
  my idea is - head can be different for different entry of app.
- Overwrites head info in containers. ([example](https://github.com/ddhp/react-isomorphic-boilerplate/blob/master/src/containers/About/index.js))

### Test
- [AVA](https://github.com/avajs/ava) as test runner.
- Don't use [webpack alias](https://webpack.js.org/configuration/resolve/#resolve-alias) in code base
- We use [mock-require](https://github.com/boblauer/mock-require) to mock dependencies to make test as independent as possible.
  As it's name says, it only support `require` not import, so if your importing module has some dependencies needs to be mocked,
  remember to `require` instead of import them in your test code.
  Also append `.default` to get the right reference if your module is defined in es6 way. (see [server test](https://github.com/ddhp/react-isomorphic-boilerplate/blob/master/src/server/__tests__/index.js) for example)

### Production build
1. `yarn run build:client:prod`
2. `yarn run build:server:prod`

## TODOS:
1. ~hash key~
2. ~production build~
3. ~style loader~
4. ~font / img loader~
5. ~test on server~
6. ~source map~
7. ~test on react component~
7-1. ~coverage report~
8. ~apply react router~
9. ~apply logic base on path(seo optimized)~
10. ~set head info~
11. ~fetch data from and submit to local api~

## LICENSE
MIT
