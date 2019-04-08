const path = require('path');
const APP_DIR = path.resolve(__dirname, 'src');
const BUILD_DIR = path.resolve(__dirname, 'public');


module.exports = {
	devtool: 'source-map',
	entry: {
		main: ['babel-polyfill', `${APP_DIR}/index.js`]
	},
	devServer: {
		contentBase: BUILD_DIR,
		publicPath: '/js/',
		historyApiFallback: true,
	},
	output: {
		filename: '[name].bundle.js',
		sourceMapFilename: '[name].bundle.js.map',
		path: `${BUILD_DIR}/js`
	},
	module: {
		rules: [
			{
				test: /\.(scss)$/,
				use: [
					'style-loader',
					'css-loader',
					'sass-loader'
				],
			},
			{
				test: /\.jsx?$/,
				include: [
					APP_DIR,
				],
				loader: 'babel-loader'
			},
			{
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                include : [
                    APP_DIR
                ],
                options: {
                    name: '[name]-[sha256:hash:base64:4].[ext]',
                    publicPath: 'images/',
                    outputPath: '../images/'
                }
            }
		]
	},
};