/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('@cypress/webpack-preprocessor');

module.exports = (on) => {
  const options = webpack.defaultOptions;
  options.webpackOptions.module.rules[0].use[0].options.presets.push('@babel/preset-flow');
  on('file:preprocessor', webpack(options));
};
