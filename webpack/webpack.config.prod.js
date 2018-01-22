const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const baseConfig = require('./webpack.config.common');
const config = Object.assign({}, baseConfig);

config.module.rules.push(
    {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('css-loader')
    },
);

config.plugins.push(
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('production')
        }
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin('[name].css')
);

module.exports = config;
