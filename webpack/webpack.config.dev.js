const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.config.common');
const config = Object.assign({}, baseConfig);

config.devtool = 'cheap-source-map';
config.module.rules.push(
    {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
    }
);

config.plugins.push(
    new HtmlWebpackPlugin({
        template: 'app/index.html',
        inject: 'body',
        filename: 'index.html'
    }),
    new webpack.HotModuleReplacementPlugin(), 
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('development')
        }
    }
));

config.devServer = {
    historyApiFallback: true,
    publicPath: 'http://localhost:8080/'
};

module.exports = config;
