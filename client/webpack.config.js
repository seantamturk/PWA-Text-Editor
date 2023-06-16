const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
      }),
      new InjectManifest({
        swSrc: './src/sw.js',
        swDest: 'sw.js',
      }),
      new WebpackPwaManifest({
        name: 'Just another Text Editor',
        short_name: 'JATE',
        description: 'A text editor PWA',
        background_color: '#ffffff',
        theme_color: '#000000',
        start_url: '/',
        icons: [
          {
            src: path.resolve('src/assets/icons/icon.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: 'icons',
          },
        ],
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread'],
            },
          },
        },
      ],
    },
  };
};
