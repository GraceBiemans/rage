const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');  // Correct import for Vue 3

module.exports = {
  entry: './src/main.js',  // Entry point for your app
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,  // Handle .vue files
        loader: 'vue-loader',  // Use vue-loader for .vue files
      },
      {
        test: /\.js$/,  // Handle .js files with Babel
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],  // Ensure modern JS syntax is transpiled
          },
        },
      },
      {
        test: /\.css$/,  // Handle CSS files
        use: ['vue-style-loader', 'css-loader'],  // Style loader and CSS loader for Vue
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',  // Path to your HTML template
    }),
    new VueLoaderPlugin(),  // Correct usage of VueLoaderPlugin
  ],
  resolve: {
    alias: {
        vue$: 'vue/dist/vue.esm-bundler.js',  // Full build of Vue 3
    },
    extensions: ['.js', '.vue', '.json'],  // Resolve these file types
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 8080,
    open: true,
  },
};
