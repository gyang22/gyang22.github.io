const path = require('path');

module.exports = {
  entry: 'spider_script.js', // Path to your main JS file
  output: {
    filename: 'bundle.js', // Output bundle file name
    path: path.resolve(__dirname, 'dist'), // Output path
  },
  mode: 'development', // Use 'production' for production builds
};
