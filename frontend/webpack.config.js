const path = require('path');

module.exports = {
  entry: './src/index.js',  // Entry point for your React application
  output: {
    path: path.resolve(__dirname, '../frontend/static/js'),  // Output to Django's static directory
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']  // Transpile JSX and ES6
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  mode: 'development'  // Set to 'production' when deploying
};

