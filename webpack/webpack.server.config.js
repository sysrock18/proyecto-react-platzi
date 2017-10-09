const fs = require('fs');
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const nodeModules = fs
  .readdirSync('node_modules')
  .filter(x => ['.bin'].indexOf(x) === -1)
  .reduce(
    (modules, module) => Object.assign(modules, { [module]: `commonjs ${module}` }),
    {}
  );

const config = {
  entry: ['babel-polyfill', './source/server.jsx'],
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '../built/server'),
    publicPath: process.env.NODE_ENV === 'production'
      ? 'https://simon-platzi-react-sfs.now.sh'
      : 'http://localhost:3001',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'latest-minimal', 'react'],
            env: {
              production: {
                plugins: ['transform-regenerator', 'transform-runtime'],
                presets: ['es2015'],
              },
              develoment: {
                presets: ['latest-minimal'],
              },
            },
          },
        },
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
        enforce: 'pre',
        exclude: /(node_modules)/,
        use: 'eslint-loader',
      }, */
    ],
  },
  target: 'node',
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.json'],
  },
  externals: nodeModules,
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
      ecma: 6,
    })
  );
} */

module.exports = config;
