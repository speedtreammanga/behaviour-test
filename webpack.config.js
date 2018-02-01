const path = require('path');
const weback = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, "src"),
    entry: './index.js',
    devtool: 'source-map',
    plugins: [
        new CleanWebpackPlugin(['build']),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html')
        }),
        new UglifyJsWebpackPlugin({
            parallel: true,
            uglifyOptions: {
                minimize: true,
                compress: true,
                mangle: {
                    toplevel: true
                },
            }
        })
    ],
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
        filename: 'assets/js/app.bundle.[hash:8].js',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: '/node_modules/',
                loader: 'babel-loader',
                query: {
                    presets: ['es2016', 'react', 'stage-0']
                }
            }
        ]
    },
    stats: { colors: true },
    devServer: {
		port: process.env.PORT || 8080,
		host: 'localhost',
		publicPath: '/',
		contentBase: path.join(__dirname, 'build'),
		historyApiFallback: true,
		open: true,
		hot: false,
		openPage: '',
	}
}