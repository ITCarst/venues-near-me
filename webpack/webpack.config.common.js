const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: [path.join(__dirname, '../app/js/index.js')],
        styles: path.join(__dirname, '../app/css/main.css')
    },
    output: {
        path: path.join(__dirname, '../public/'),
        filename: 'js/[name].bundle.js',
        publicPath: './'
    },
    module: {
        rules: [
            {
                test: /\.json$/,
                use: ['json-loader']
            }
        ]
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
    ],
    resolve: {
        extensions: ['.js', '.css'],
    },
    devtool: 'eval-source-map'
};
