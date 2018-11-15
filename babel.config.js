module.exports = function babelConfig(api) {
  api.cache(false);
  return {
    presets: [
      '@babel/react',
      '@babel/preset-env',
    ],
    env: {
      test: {
        plugins: [
          'istanbul',
        ],
      },
    },
    plugins: [
      '@babel/plugin-transform-runtime',
      '@babel/plugin-proposal-class-properties',
      // TODO: better put this in webpack.browser.config
      // but I don't know why it doesn't work
      ['transform-imports', {
        lodash: {
          transform: importName => `lodash/${importName}`,
          preventFullImport: true,
        },
        'date-fns': {
          transform: importName => `date-fns/${importName}`,
          preventFullImport: true,
          snakeCase: true,
        },
      }],
      [
        'react-css-modules',
        {
          filetypes: {
            '.scss': {
              syntax: 'postcss-scss',
            },
          },
          webpackHotModuleReloading: true,
          generateScopedName: '[local]___[hash:base64:5]',
          handleMissingStyleName: 'warn',
        },
      ],
    ],
    // transform-runtime adds import to bundle files
    // and uglify3 compiles code into commonjs modules
    // so set this to avoid error
    // https://github.com/webpack/webpack/issues/4039
    sourceType: 'unambiguous',
  };
};
