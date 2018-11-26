const webpack = require("webpack");
const precss = require("precss");
const autoprefixer = require("autoprefixer");

module.exports = {
    mode: "development",
    entry: ["whatwg-fetch", "./src/index.js", "./src/sample.json"],
    output: {
        path: `${__dirname}/dist/`,
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
                                precss,
                                autoprefixer,
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
                }, `${__dirname}/sample-loader.js`],
            },
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        contentBase: [__dirname, `${__dirname}/dist/`],
        publicPath: "http://localhost:8080/dist/",
        hot: true,
    },
};
