const path = require(`path`);

module.exports = {
    mode: `development`,
    entry: [`whatwg-fetch`, `./resources/js/index.js`],
    output: {
        path: path.resolve(__dirname, `bin`),
        filename: `bundle.js`,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: `babel-loader`,
                    options: {
                        presets: [
                            [`@babel/preset-env`, {
                                targets: {
                                    browsers: [`last 2 versions`, `ie >= 11`],
                                },
                                useBuiltIns: `usage`,
                            }],
                        ],
                    },
                },
            },
        ],
    },
};
