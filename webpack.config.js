'use strict'

const path = require('path')
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require("copy-webpack-plugin");
module.exports = {
    mode: 'development',
    // entry: './src/js/main.js',
    entry: {
        main: './src/js/main.js',
        // critical: '/src/critical.js',
        // bootstrap: '/src/bootstrap.js',
    },
    output: {
        // filename: 'main.js',
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        static: path.resolve(__dirname, 'dist'), port: 8080, hot: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',  // Output filename for index.html
        }),
        new miniCssExtractPlugin(),
        new CopyPlugin({
            patterns: [
                { from: "src/images", to: "images" },
                // { from: "src/fonts", to: "fonts" },
            ],
        }),
    ],
    module: {
        rules: [{
            mimetype: 'image/svg+xml', scheme: 'data', type: 'asset/resource', generator: {
                filename: 'icons/[hash].svg'
            }
        }, {
            test: /\.(scss)$/, use: [{
                // Extracts CSS for each JS file that includes CSS
                loader: miniCssExtractPlugin.loader
            }, {
                // Interprets `@import` and `url()` like `import/require()` and will resolve them
                loader: 'css-loader'
            }, {
                // Loader for webpack to process CSS with PostCSS
                loader: 'postcss-loader', options: {
                    postcssOptions: {
                        plugins: [autoprefixer]
                    }
                }
            }, {
                // Loads a SASS/SCSS file and compiles it to CSS
                loader: 'sass-loader'
            }]
        }]
    }
}