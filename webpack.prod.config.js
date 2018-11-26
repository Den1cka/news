const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const precss = require("precss");
const autoprefixer = require("autoprefixer");

module.exports = {
    mode: "production",
    entry: ["whatwg-fetch", "./src/index.js"],
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
};
