const slsw = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');
var path = require('path');

module.exports = {
	entry: slsw.lib.entries,
	externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
	target: 'node',
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/, // in order to ignore built-in modules like path, fs, etc.
				loaders: ['babel-loader'],
				include: __dirname,
			},
		],
	},
	output: {
		libraryTarget: 'commonjs',
		path: path.join(__dirname, '.webpack'),
		filename: '[name].js',
	},
};