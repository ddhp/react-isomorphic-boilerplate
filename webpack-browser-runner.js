/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
require('@babel/register');
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');

const ENV = process.argv[2] || 'dev';
const config = require('./webpack.browser.babel').default;

const ROOT_PROJECT_PATH = path.resolve(__dirname, './');
const DEST_PATH = path.resolve(ROOT_PROJECT_PATH, 'dist');
const configInstance = config(ENV);
configInstance.plugins.push(
  new ProgressPlugin((percentage, msg, currentOri, activeOri, modulepathOri) => {
    if (process.stdout.isTTY && percentage < 1) {
      process.stdout.cursorTo(0);
      const modulepath = modulepathOri
        ? ` …${modulepathOri.substr(modulepathOri.length - 30)}`
        : '';
      const current = currentOri ? ` ${currentOri}` : '';
      const active = activeOri ? ` ${activeOri}` : '';
      process.stdout.write(
        `${(percentage * 100).toFixed(0)}% ${msg}${current}${active}${modulepath}`,
      );
      process.stdout.clearLine(1);
    } else if (percentage === 1) {
      process.stdout.write('\n');
    }
  }),
);
const compiler = webpack(configInstance);

function cb(err, stats) {
  if (err) {
    throw err;
  }

  mkdirp(path.resolve(DEST_PATH));
  fs.writeFileSync(
    path.resolve(DEST_PATH, 'server', 'compilation-stats.json'),
    JSON.stringify(
      stats.toJson({
        chunks: false,
        modules: false,
      }),
    ),
  );
  process.stdout.write(
    `${stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false,
    })}\n\n`,
  );
}

compiler.run(cb);
