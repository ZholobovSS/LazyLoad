const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');


const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => {
    const config = { };

    if ( isProd ) {
        config.minimizer = [
        new OptimizeCssAssetsPlugin(),
        new TerserPlugin(), 
        ]
    }

    return config;
}

module.exports = {
    entry: {
        main: ['@babel/polyfill', './src/lazy.js']
    },
    output: {
        filename: 'lazy.js',
        path: path.join(__dirname, './build'),
    },
    plugins: [
    new MiniCssExtractPlugin({
        filename: '../build/lazy.css',
    })
    ],
    optimization: optimization(),
    module: {
        rules: [
        {
            test: /\.(png|jpeg|jpg|svg|ttf|woff2|woff|eot|gif|otf)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '../build/[name].[ext]'
                }
            }]
        },
        {
            test: /\.css$/i,
            use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
          }
      }
  }
  ]
}
}