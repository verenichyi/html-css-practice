import path from 'path';
import { ProgressPlugin } from 'webpack';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { type WebpackConfiguration } from 'webpack-cli';

interface IWebpackEnv {
  port: string;
}

export default ({ port }: IWebpackEnv): WebpackConfiguration => ({
  mode: 'development',
  entry: path.resolve(__dirname, 'src', 'main.ts'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[contenthash].js',
  },
  plugins: [
    new ProgressPlugin(),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.(png|svg|jpg|jpeg)$/i,
        type: 'asset/resource',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 10kb
          },
        },
        generator: {
          filename: 'images/[name]-[hash][ext]',
        },
      },
    ],
  },
  devtool: 'inline-source-map',
  devServer: {
    watchFiles: ['src/index.html'],
    port: +port || 8000,
  },
});
