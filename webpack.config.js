const Dotenv = require('dotenv-webpack')
const path = require('path')

module.exports = {
    entry: "./js/main.js",
    mode: "development",
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "app.js"
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /(node-modules)/,
                include: path.resolve(__dirname, "src")
            }
        ]
    },
    plugins: [
        new Dotenv({
            path: "./.env"
        })
    ]
};
