const HtmlWebpackPlugin = require("html-webpack-plugin")
const Dotenv = require('dotenv-webpack')
const path = require('path')

module.exports = {
    entry: "./js/main.js",
    mode: "development",
    output: {
        path: path.resolve(__dirname, "dist"),
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
        new HtmlWebpackPlugin({
          title: "AQITask",
          template: path.resolve(__dirname, "dist"),
        }),
        new Dotenv({
            path: "./.env"
        })
    ]
};
