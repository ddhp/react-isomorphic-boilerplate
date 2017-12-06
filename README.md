# react-isomorphic-boilerplate
[![npm Version](https://img.shields.io/npm/v/react-isomorphic-boilerplate.svg?style=flat-square)](https://www.npmjs.org/package/react-isomorphic-boilerplate)
[![Build Status](https://img.shields.io/travis/ddhp/react-isomorphic-boilerplate/master.svg?style=flat-square)](https://travis-ci.org/ddhp/react-isomorphic-boilerplate)
[![codecov.io](https://codecov.io/github/ddhp/react-isomorphic-boilerplate/coverage.svg?branch=master)](https://codecov.io/github/ddhp/react-isomorphic-boilerplate?branch=master)
[![Dependency Status](https://dependencyci.com/github/ddhp/react-isomorphic-boilerplate/badge)](https://dependencyci.com/github/ddhp/react-isomorphic-boilerplate)


This boilerplate would help you build a react/redux/react-router isomorphic/universal web app

## Feature
- isomorphic: same code runs on server and browser.
- SEO: information benefits to search engine would be rendered on server side.
- fully testable - shows how to test react containers / redux actions and reducers / also your server app.
- easy to start.
- production ready.

## Concept
### Getting Started
Execute `yarn` to install.

Run 3 processes to start developing your app:
1. `yarn run build:browser:dev:w`: build browser side code and watch file change.
2. `yarn run build:server:dev:w`: build server side conde and watch file change.
3. `yarn start`: nodemon executing `dist/server.js`, and only watches on it's change,
   [--inspect](https://nodejs.org/en/docs/guides/debugging-getting-started/#enable-inspector) param is given,
   you can debug nodejs server on chrome-devtools.

then you can visit `localhost:3333`.

All development code are built with [source map](http://blog.teamtreehouse.com/introduction-source-maps).

### Log
Import `stdout.js` and define namespace ([example](https://github.com/ddhp/react-isomorphic-boilerplate/blob/master/src/server/pages.js)), then turn on debug message depends on platform:
- browser: allow debug log by type `localStorage.debug = '*'` in console.
- nodejs: run node with `DEBUG=*`, see `package.json.scripts.start`.

In production build, server side log would stay untouched to easily debug by checking log file,
and on browser side, **all debug message would be removed** by [remove-debug-loader](https://github.com/ddhp/remove-debug-loader).

### Static Files
- Put your fonts, images, etc. in `src/assets`.
- Fonts: set your font face in [src/entries/global.scss](https://github.com/ddhp/react-isomorphic-boilerplate/blob/master/src/entries/global.scss) and set src points to the font in assets folder.
- Images: set src relative to your js([example](https://github.com/ddhp/react-isomorphic-boilerplate/blob/master/src/containers/Demo/index.js)) or scss ([example](https://github.com/ddhp/react-isomorphic-boilerplate/blob/master/src/containers/Demo/style.scss)) file.

On the other hand, node server **only** serves static files in `/dist/assets` which means **/src/assets/ files not imported to your code base are not accessible from your web server.**
[file-loader](https://github.com/webpack-contrib/file-loader) will exports them to static folder with hash key and handle url transform. (so you don't have to worry about cache issue)

### Style
- [reset.css](https://www.npmjs.com/package/reset-css) resets default style and is imported in [global.scss](https://github.com/ddhp/react-isomorphic-boilerplate/blob/master/src/client/global.scss).
- Import `global.scss` in your entry component, or define your own styles for specific entry then import them.
- `style.scss` in containers folder only set styles for react component in the folder of same level, and starts with most root class name of that component. (see [src/containers/Home/style.scss](https://github.com/ddhp/react-isomorphic-boilerplate/blob/master/src/containers/Home/style.scss))

[extract-text-webpack-plugin](https://github.com/webpack-contrib/extract-text-webpack-plugin) would extract style sheet from built code into target dist folder.

### SEO
- Define `loadData` method in your route to prefetch data needed for SEO. ([example](https://github.com/ddhp/react-isomorphic-boilerplate/blob/master/src/routes/main.js))
- [react-helmet](https://github.com/nfl/react-helmet) help us set head (or specific property) in container and overwrites setting from parent, very handy.
- Define your basic helmet setting in each route file, see [src/routers/main.js](https://github.com/ddhp/react-isomorphic-boilerplate/blob/master/src/routes/main.js).
  My idea is - basic head meta can be different for different entries of app.
- Overwrites head info in containers. ([example](https://github.com/ddhp/react-isomorphic-boilerplate/blob/master/src/containers/About/index.js))

### Test
- [AVA](https://github.com/avajs/ava) as test runner.
- **Don't use** [webpack alias](https://webpack.js.org/configuration/resolve/#resolve-alias) in code base.
- [mock-require](https://github.com/boblauer/mock-require) mocks dependencies to make test as independent as possible.
  
  As it's name says, it only support `require`, so in your test file, remember you have to **require** the target testing module, `import` does not work.
  
  Also if your testing module is defined in es6 way (`export default`), remember to append `.default` to get the default export. (see [server test](https://github.com/ddhp/react-isomorphic-boilerplate/blob/master/src/server/__tests__/index.spec.js) for example)

### Production build
Build your code with:
1. `yarn run build:browser:prod`
2. `yarn run build:server:prod`

and your app is ready to go.

### TODO
- i18n, possibly don't need any library to do this, we only need some handy helpers for those topics:
  - number: ?
  - date: by [momentjs](https://momentjs.com/)
  - money: ?

basically we can approach by define our multi-lingual words in yaml(s) and get them by key and locale.
- deprecate sass and use [styled-components](https://github.com/styled-components/styled-components) instead.
- MODEL to handle api request and parse response.

## LICENSE
MIT
