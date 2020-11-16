const path = require('path');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './server/index.js',

  target: 'node',

  externals: [nodeExternals()],

  output: {
    path: path.resolve('server-build'),
    filename: 'index.js'
  },
  plugins: [
    new MiniCssExtractPlugin(),
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.svg$/,
        use: [
          'file-loader',
          'svg-transform-loader',
        ]
      },
      {
          test: /\.html$/,
          use: [
              {
                  loader: "html-loader",
                  options: { minimize: true }
              }
          ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader'
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, // instead of style-loader
          'css-loader'
        ]
      },
      {
        test: /\.ruxit.js.template$/,
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
