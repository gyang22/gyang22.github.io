const path = require('path');

module.exports = {
  // Assuming your spider_script.js is in the root, if not adjust the path
  entry: './spider_script.js', // Entry should be a relative path
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    // This is necessary for webpack-dev-server
    publicPath: '/dist/', 
  },
  // Resolve .js extensions so you can leave them off when importing
  resolve: {
    extensions: ['.js'],
  },
  module: {
    rules: [
      // JavaScript: Use Babel to transpile JavaScript files
      { test: /\.js$/, exclude: /node_modules/, use: ['babel-loader'] },
    ],
  },
  mode: 'development',
  // Optional: Configure the webpack-dev-server
  devServer: {
    static: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
  // Source maps for debugging
  devtool: 'eval-source-map',
};
