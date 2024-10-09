const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: path.resolve(__dirname, './src/index.js'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(ts)x?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.module\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',    // Внедряет CSS в DOM
          'css-loader',      // Преобразует CSS в CommonJS
          'sass-loader'      // Компилирует SCSS в CSS
        ],
      },
      {
        test: /\.(jpg|jpeg|png|svg)$/,
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]'  // Настраиваем путь сохранения шрифтов
        }
      }
    ]
  },
  plugins: [
    new ESLintPlugin({
      extensions: ['.js', '.jsx']
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new Dotenv()
  ],
  resolve: {
    extensions: [
      '.*',
      '.js',
      '.jsx',
      '.json',
      '.css',
      '.scss', // Добавляем поддержку .scss
      '.png',
      '.svg',
      '.jpg'
    ],
    alias: {
    }
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
    assetModuleFilename: 'assets/[hash][ext][query]'
  },
  devServer: {
    static: path.join(__dirname, './dist'),
    compress: true,
    historyApiFallback: true,
    port: 4000
  }
};
