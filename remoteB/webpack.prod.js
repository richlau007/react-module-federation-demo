const { ModuleFederationPlugin } = require('webpack').container;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const deps = require('./package.json').dependencies;

module.exports = {
  mode: 'production',
  entry: './src/bootstrap.js',
  output: {
    publicPath: '/react-module-federation-demo/remoteB/',
    path: require('path').resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react', '@babel/preset-env'],
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'remoteB',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App',
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};