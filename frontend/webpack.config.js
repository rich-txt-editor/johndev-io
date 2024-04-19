const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Import the plugin

module.exports = {
  // The base directory, an absolute path, for resolving entry points and loaders from configuration
  context: path.resolve(__dirname),

  entry: "./src/index.js", // relative to context path
  output: {
    path: path.resolve(__dirname, "static/js"), // Output to Django's static directory
    filename: "bundle.js",
    publicPath: '/static/js/',
  },
  module: {
    rules: [
      {
        test: /\.css$/, // Target CSS files
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"], // Transpile JSX and ES6
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, 'templates/index.html'), // Output to Django's templates directory
      template: 'src/index.html', // Path to your HTML template
      inject: 'body', // Injects scripts at the end of the body tag
      scriptLoading: 'defer', // Defer loading of scripts
      publicPath: '/static/js/',
      // Pass the nonce to the template using a template parameter (this will be replaced server-side)
      templateParameters: {
        csp_nonce: '<%= csp_nonce %>',
      },
    }),
  ],
  devtool: 'source-map',
  mode: "development", // Set to 'production' when deploying
};
