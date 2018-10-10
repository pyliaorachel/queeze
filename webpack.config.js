const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StatsPlugin = require('stats-webpack-plugin');

const port = process.env.PORT || 8080;

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  entry: [
    `webpack-dev-server/client?http://localhost:${port}`,
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
    path.join(__dirname, './src/index.js'),
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main.js',
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.tpl.html',
      inject: 'body',
      filename: 'index.html',
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.json?$/,
        loader: 'json',
      },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: 'file-loader' },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&minetype=application/font-woff',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['react'],
            },
          },
        ],
      },
    ],
  },
  resolve: {
    modules: [path.join(__dirname, 'node_modules')],
  },
};
