const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require('webpack')
const htmlWebpackPlugin = new HtmlWebPackPlugin({
    template: "./src/index.html",
    filename: "./index.html"
});
module.exports = {
    entry: './src/js/index.js',
    output: {
        path: __dirname + '/dist',
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/, // 針對所有.css 的檔案作預處理，這邊是用 regular express 的格式
                use: [
                    'style-loader',  // 這個會後執行 (順序很重要)
                    'css-loader' // 這個會先執行
                ]
            }

        ]
    },
    plugins: [
        htmlWebpackPlugin,
        new webpack.ProvidePlugin({ // 利用 webpack.ProvidePlugin 讓 $ 和 jQuery 可以連結到 jquery library
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default']
        }),
    ],
};