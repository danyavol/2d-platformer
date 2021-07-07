'use strict';
const path = require('path');

module.exports = {
    devtool: 'source-map',
    mode: 'development',
	entry: path.resolve(__dirname, './src/index.ts'),
	output: {
		filename: 'platformer-2d.js',
		path: path.resolve(__dirname, 'dist'),
        library: {
            name: 'Platformer2D',
            type: 'umd'
        }
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