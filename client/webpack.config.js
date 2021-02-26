const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Webpack = require('webpack');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  devtool: 'source-map',
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: '../public/index.html',
    }),
    new CleanWebpackPlugin(),
    new Webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    historyApiFallback: true,
    port: 3000,
    overlay: {
      warnings: true,
      errors: true,
    },
    open: false,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          }
        }
      },
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      }
    ]
  }
}
