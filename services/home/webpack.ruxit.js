const path = require('path');

module.exports = {
  output: {
    path: path.resolve('public'),
    filename: 'ruxit.js'
  },
  module: {
    rules: [
      {
        test: /\src\/ruxit.js$/,
        loader: 'string-replace-loader',
        options: {
          search: '{{ruxit_cfg}}',
          replace: process.env.RUXIT_CFG,
          flags: 'g'
        }
      }
    ]
  }
};
