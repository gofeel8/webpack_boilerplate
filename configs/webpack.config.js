const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
module.exports = () => {
    const mode = process.env.Node_ENV;
    const config = {
        mode: mode,
        entry: {
            index: path.resolve(__dirname, '../source/js/index.js'),
            error: path.resolve(__dirname, '../source/js/error.js'),
        },
        output: {
            path: path.resolve(__dirname, '../dist/'),
            filename: '[name]_bundle.js',
        },
        plugins: [new HtmlWebpackPlugin({
            template: './source/html/index.html',
            filename: "./index.html",
            chunks: ['index']
        }), new HtmlWebpackPlugin({
            template: './source/html/error.html',
            filename: "./error.html",
            chunks: ['error']
        })],
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                            plugins: [
                                '@babel/plugin-transform-runtime',
                            ]
                        }
                    }
                }, {
                    test: /(\.scss|\.sass)$/,
                    use: [
                        'style-loader',
                        'css-loader',
                        "sass-loader"
                    ]
                }
            ]
        }
    };


    if (mode === 'development') {
        config.devtool = 'source-map';
    }
    else if (mode === 'production') {
    }

    return config;

};