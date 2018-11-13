# react-isomorphic-boilerplate
[![npm Version](https://img.shields.io/npm/v/react-isomorphic-boilerplate.svg?style=flat-square)](https://www.npmjs.org/package/react-isomorphic-boilerplate)
[![Build Status](https://img.shields.io/travis/ddhp/react-isomorphic-boilerplate/master.svg?style=flat-square)](https://travis-ci.org/ddhp/react-isomorphic-boilerplate)
[![codecov.io](https://codecov.io/github/ddhp/react-isomorphic-boilerplate/coverage.svg?branch=master)](https://codecov.io/github/ddhp/react-isomorphic-boilerplate?branch=master)
[![Dependency Status](https://dependencyci.com/github/ddhp/react-isomorphic-boilerplate/badge)](https://dependencyci.com/github/ddhp/react-isomorphic-boilerplate)


This boilerplate would help you build a react/redux/react-router isomorphic/universal web app

## Feature
- isomorphic: same code runs on server and browser.
- 🔥 browser and server side hot reload.
- SEO: information benefits to search engine would be rendered on server side.
- fully testable - shows how to test react containers / redux actions and reducers / also your server app.
- easy to start.
- production ready.
- webpack v4 support.
- manage your style in [CSS Modules](https://github.com/css-modules/css-modules) way.
- babel v7
- optimize bundle size by implementing [tree shaking](https://webpack.js.org/guides/tree-shaking/) (getting rid of moment.js is on the way [#35](https://github.com/ddhp/react-isomorphic-boilerplate/issues/35))

## Concept
### Getting Started
```
# install dependencies
yarn

# start dev env with hot reload
# it runs with
# [--inspect](https://nodejs.org/en/docs/guides/debugging-getting-started/#enable-inspector)
# you can debug nodejs server on chrome-devtools.
yarn start
```

then visit `localhost:3333` to see result.

All development code are built with [source map](http://blog.teamtreehouse.com/introduction-source-maps).

Since styles are hotload with `yarn start`, so you would see [FOUC](https://en.wikipedia.org/wiki/Flash_of_unstyled_content). 
You can do a prod build to see how it would actually work:
```
yarn build:browser:prod && yarn build:server:prod
node dist/server/index.js
```

### Eslint
Some rules are disabled when you run `yarn start`, see [#26](https://github.com/ddhp/react-isomorphic-boilerplate/issues/26).

`yarn build:browser:dev/prod` would save output to a json file, so you would only see subtle error message on terminal,
in this case you have to check generated `compilation-stats.json`'s `errors` for reasons.

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
- Introduced [CSS Modules](https://github.com/css-modules/css-modules), compiled with JSX support by [babel-plugin-react-css-modules](https://github.com/gajus/babel-plugin-react-css-modules) during build phase.

[mini-css-extract-plugin](https://github.com/webpack-contrib/extract-text-webpack-plugin) would extract style sheet from built code into target dist folder since webpack v4.

### SEO
- Define `loadData` method in your route to prefetch data needed for SEO. ([example](https://github.com/ddhp/react-isomorphic-boilerplate/blob/master/src/routes/main.js))
- [react-helmet](https://github.com/nfl/react-helmet) help us set head (or specific property) in container and overwrites setting of parents, very handy.
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

and `PORT={your_port} node dist/server/index.js` then your app runs on `localhost:{your_port}`.

### Multiple Entries
This is less likely to use, but somehow handy when you want to seperate your app into individual entries.

To add a new entry, do following:
1. add a new entry to `webpack.browser.js`.
2. add a new file in `/src/routes`, take [/src/routes/main.js](https://github.com/ddhp/react-isomorphic-boilerplate/blob/master/src/routes/main.js) as reference, define your routes for the new entry here.
4. (Optional) define a new reducer for the entry in `/src/reducers` if needed.
3. add a new file in `/src/entries`, take [/src/entries/main.js](https://github.com/ddhp/react-isomorphic-boilerplate/blob/master/src/entries/main.js) for example, replace `Routes` to the one you defined in step 2 and/or replace reducer to the one defined in previous step.
4. in `/src/server/entryAndRoute.js`, modify `entryRouteInfos`, `entryReducerMap` and `entryRouteComponentMap` variables.
5. if still don't get it, check how `anotherEntry` is added from steps above.

Multiple entry gives a huge benefit to bundle size, but you **will lose SPA between different entries** (which means you can't \<Link \/> to each other). 

Make sure you know the reason to necessarily seperate app into different entries, visit `http://localhost:3333/another-entry` to see it's in life.

### Hot reload
In this boilerplate, we build our own server app, which means we have to implement hot reload by ourself. 

In order to do this, we use 4 libraries listed below:
1. [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware) - given webpack compiler(s), create bundle(s) to memory, watch changes for rebuild.
2. [webpack-hot-middleware](https://github.com/glenjamin/webpack-hot-middleware) - whenever given compiler rebuilt, send events with built [stats](https://webpack.js.org/api/stats/) to client listener.
3. [react-hot-loader](https://github.com/gaearon/react-hot-loader) - listen to events from dev server and update layout when built bundle has changed.

then here is the tricky part, the 4th one makes server side hot reload work:

4. [webpack-hot-server-middleware](https://github.com/60frames/webpack-hot-server-middleware) - this middleware takes both server and client webpack compiler, 
and **register built server bundle as middleware**. Then if any rebuild (either server or client) occurs, replace that middleware with the new one.

webpack-hot-server-middleware has a very important convention - **server bundle needs to be a function returns a middleware function** (see `/src/server/renderer.js`),
so in `webpack.server.js`, you can see hot build has different entry (renderer.js, others are index.js), and in 
`/src/server/index.js`, you will see how server runs on hot environments different to others.

On the other hand, webpack-hot-server-middleware only watch changes on `/src/server/renderer.js` and its children, so hot reload doesn't work outside that scope, e.g `/src/server/api.js`,
you have to rerun `yarn start` to see it take place.

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
