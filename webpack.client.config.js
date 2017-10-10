const path = require('path');
const webpack = require("webpack");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StatsWriterPlugin = require("webpack-stats-plugin").StatsWriterPlugin;
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    entry: {
        client: "./src/client/client.tsx"
    },
    output: {
        filename: "[name].js",
        path: __dirname + "/dist/client"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "cheap-module-source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.js',
            minChunks: function(module, count) {
                return module.context && module.context.indexOf("node_modules") !== -1;
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production'),
            }
        }),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            mangle: true,
            compress: {
                warnings: false, // Suppress uglification warnings
                pure_getters: true,
                unsafe: true,
                unsafe_comps: true,
                screw_ie8: true
            },
            output: {
                comments: false,
            },
            exclude: [/\.min\.js$/gi] // skip pre-minified libs
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new CompressionPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.(js|html|css)$/,
            threshold: 0,
            minRatio: 0.8
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'static'
        }),
    ],

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            {
                test: /\.tsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env']
                        }
                    },
                    {
                        loader: 'awesome-typescript-loader'
                    }
                ]
            },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {enforce: "pre", test: /\.js$/, loader: "source-map-loader"}
        ]
    }
};