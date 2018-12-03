/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { resolve } = require("path");

module.exports = {
    mode: "production",
    entry: ["whatwg-fetch", "./node_modules/proxy-polyfill/proxy.min.js", "./src/index.js"],
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
                use: [MiniCssExtractPlugin.loader, "css-loader", {
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
                        limit: 4096,
                        name: "[hash]-[name].[ext]",
                    },
                }],
            },
        ],
    },
    optimization: {
        minimizer: [new UglifyJsPlugin()],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "../index.html",
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[name].css",
        }),
    ],
    resolve: {
        alias: {
            "~": resolve(__dirname, "src"),
        },
    },
};
