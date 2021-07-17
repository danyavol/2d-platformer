'use strict';
const path = require('path');

module.exports = {
    devtool: 'source-map',
    mode: 'development',
	entry: {
        lib: { 
            import: './lib/index.ts',
            filename: 'dist/platformer-2d.js',
            library: {
                name: 'Platformer2D',
                type: 'umd'
            }
        },
        sandbox: { 
            import: './sandbox/src/index.ts',
            filename: 'sandbox/index.js'
        },
    },
	output: {
		// filename: 'platformer-2d.js',
		path: path.resolve(__dirname),
        // library: {
        //     name: 'Platformer2D',
        //     type: 'umd'
        // }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/inline',
            },
        ]
    },
    resolve: {
        extensions: [ '.ts', '.tsx', '.js' ]
    },
    devServer: {
        contentBase: [
          path.join(__dirname, 'dist'),
          path.join(__dirname, 'sandbox'),
        ],
    },
}