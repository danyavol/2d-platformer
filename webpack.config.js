'use strict';
const path = require('path');

module.exports = {
    devtool: 'inline-source-map',
    mode: 'development',
	entry: './src/index.ts',
	output: {
		filename: 'platformer.js',
		path: path.resolve(__dirname, 'dist'),
        library: 'Platformer',
        libraryTarget: 'umd'
	},
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    },
    resolve: {
        extensions: [ '.ts', '.tsx', '.js' ]
    }
}