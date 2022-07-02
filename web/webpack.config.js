const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const rootDir = path.join(__dirname, '..');
const webpackEnv = process.env.NODE_ENV || 'development';

const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png|svg)$/,
  use: {
    loader: 'url-loader',
    options: {
      name: '[name].[ext]',
      esModule: false,
    },
  },
};

const babelLoaderConfiguration = {
  test: /\.js$/,
  // Add every directory that needs to be compiled by Babel during the build.
  include: [
    path.resolve(__dirname, 'index.web.js'),
    path.resolve(__dirname, 'src'),
    path.resolve(__dirname, 'node_modules/react-native-uncompiled'),
  ],
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      // The 'metro-react-native-babel-preset' preset is recommended to match React Native's packager
      presets: ['module:metro-react-native-babel-preset'],
      // Re-write paths to import only the modules needed by the app
      plugins: ['react-native-web'],
    },
  },
};

const cssLoaderConfiguration = {
  test: /\.css$/i,
  use: [MiniCssExtractPlugin.loader, 'css-loader'],
};

const tsLoaderConfiguration = {
  test: /\.(tsx|ts|jsx|js|mjs)$/,
  exclude: /node_modules/,
  use: [
    {
      loader: 'ts-loader',
      options: { compilerOptions: { noEmit: false } },
    },
  ],
};

module.exports = {
  mode: webpackEnv,
  entry: {
    app: path.join(rootDir, './index.web.ts'),
    index: path.join(rootDir, './web/index.js'),
  },
  output: {
    path: path.resolve(rootDir, 'dist'),
    filename: '[name]-[contenthash].bundle.js',
  },
  devtool: 'source-map',
  module: {
    rules: [
      babelLoaderConfiguration,
      tsLoaderConfiguration,
      cssLoaderConfiguration,
      imageLoaderConfiguration,
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: path.join(__dirname, './index.html') }),
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: '[contenthash].css' }),
  ],
  resolve: {
    extensions: [
      '.web.tsx',
      '.web.ts',
      '.tsx',
      '.ts',
      '.web.jsx',
      '.web.js',
      '.jsx',
      '.js',
    ], // read files in fillowing order
    alias: Object.assign({
      'react-native$': 'react-native-web',
    }),
  },
  devServer: {
    static: { directory: path.join(__dirname, 'public') },
    compress: true,
    port: 3000,
  },
};
