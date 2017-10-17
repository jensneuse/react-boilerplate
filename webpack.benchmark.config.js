const path = require('path');
const fs = require('fs');
const webpack = require("webpack");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const pathsToClean = [
    'dist/benchmark'
];

let nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function (x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function (mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

const loaders =
    [
        {
            loader: 'babel-loader',
            options: {
                presets: ['env']
            }
        },
        {
            loader: 'awesome-typescript-loader'
        }
    ];

module.exports = {
    entry: "./src/server/benchmark/benchmark.tsx",
    output: {
        filename: "benchmark.js",
        path: __dirname + "/dist/benchmark"
    },
    target: 'node',
    externals: nodeModules,
    // Enable sourcemaps for debugging webpack's output.
    devtool: "cheap-module-source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    plugins: [
        new CleanWebpackPlugin(pathsToClean, {
            verbose: true,
            dry: false
        })
    ],
    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.

            {
                test: /\.tsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: loaders
            },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    }
};