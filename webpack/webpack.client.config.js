const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  entry: ['babel-polyfill', './source/client.jsx'],
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, '../built/statics'),
    publicPath: process.env.NODE_ENV === 'production'
      ? 'https://simon-platzi-react-sfs.now.sh'
      : 'http://localhost:3001',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['es2015', 'es2016', 'es2017', 'react'],
              plugins: ['transform-es2015-modules-commonjs'],
              env: {
                production: {
                  plugins: ['transform-regenerator', 'transform-runtime'],
                  presets: ['es2015'],
                },
                development: {
                  plugins: ['transform-es2015-modules-commonjs'],
                },
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?modules',
        }),
      },
      /* {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        enforce: 'pre',
        use: 'eslint-loader',
      }, */
    ],
  },
  target: 'web',
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.json'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      },
    }),
    new ExtractTextPlugin('../statics/styles.css'),
    new webpack.LoaderOptionsPlugin({
      options: {
        context: __dirname,
      },
    })
  ],
};

/* if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      mangle: {
        reserved: ['$super', '$', 'exports', 'require'],
      },
      ecma: 6
    })
  );
} */

module.exports = config;
