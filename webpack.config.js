
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const nodeExternals = require('webpack-node-externals')

module.exports = {
    mode: 'production',
    target: 'node',
    entry: ['./index.js','./sass/index.scss'],
    
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: './public'
    },

    module: {
        rules: [{
            test: /\.(sass|scss)$/,
            use: ExtractTextPlugin.extract({
                use: [{
                    loader: 'css-loader'
                }, {
                    loader: 'sass-loader'
                }]
            })
        }]
    },

    plugins: [
        new ExtractTextPlugin({
            filename: 'public/index.css'
        })
    ],
    externals: [nodeExternals()]
}