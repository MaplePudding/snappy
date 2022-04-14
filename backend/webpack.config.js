const path = require('path');
const Dotenv = require('dotenv-webpack');
module.exports = {

    mode: 'production',
    entry: './index.js',
    target: 'node',
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: 'bundle.min.js',
        clean: true
    },
    node: {
        __dirname: true
    },
    externals: {
        mapbox: '@mapbox/node-pre-gyp',
    },
    plugins:[
        new Dotenv()
    ],
    module: {
        rules: [
            {
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [['@babel/preset-env', {
                            "targets": {
                                "node": true
                            }
                        }]]
                    }
                },
                test: /\.js$/,
                exclude: /node_modules/
            }
        ]
    }
};
