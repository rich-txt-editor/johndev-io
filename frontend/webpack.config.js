const path = require("path");

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
				use: ["style-loader", "css-loader"], // Apply these loaders
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
  devtool: 'source-map',
	mode: "development", // Set to 'production' when deploying
};
