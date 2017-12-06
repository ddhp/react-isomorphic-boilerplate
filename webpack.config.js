module.exports = function(env) {
  const config = require(`./webpack.${env}.js`);
  if (typeof config === 'function') {
    return config();
  } else {
    return config;
  }
};
