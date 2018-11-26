/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { resolve } = require("path");

module.exports = {
    mode: "development",
    entry: ["whatwg-fetch", "./src/index.js", "./src/sample.json"],
    output: {
        path: resolve(__dirname, "dist"),
        filename: "[name].bundle.js",
        chunkFilename: "[name].bundle.js",
        publicPath: "./dist/",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: ["babel-loader"],
            },
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", {
                    loader: "postcss-loader",
                    options: {
                        plugins() {
                            return [
                                require("precss"),
                                require("autoprefixer"),
                            ];
                        },
                    },
                }, "sass-loader"],
            },
            {
                test: /\.png$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 2048,
                        name: "[hash]-[name].[ext]",
                    },
                }],
            },
            {
                test: /\.json$/,
                type: "javascript/auto",
                use: [{
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                    },
                }, resolve(__dirname, "sample-loader.js")],
            },
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "../index.html",
        }),
    ],
    devServer: {
        contentBase: [__dirname, resolve(__dirname, "dist")],
        publicPath: "http://localhost:8080/dist/",
        hot: true,
    },
};
