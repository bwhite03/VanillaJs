const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    port: 3008,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Vanilla JavaScript',
      template: 'public/index.html',
    }),
  ],
  resolve: {
    extensions: ['.js'],
  },
};
