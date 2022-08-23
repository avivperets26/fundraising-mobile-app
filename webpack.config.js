/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-env node */

const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const {EnvironmentPlugin} = require('webpack')
const {getIfUtils, removeEmpty} = require('webpack-config-utils')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = (env) => {
  const {ifMin, ifNotMin} = getIfUtils(env, ['min'])
  process.env.NODE_ENV = ifMin('production', 'development')

  return removeEmpty({
    mode: ifMin('production', 'development'),
    stats: {colors: true},
    devtool: ifMin(false, 'cheap-module-source-map'),
    entry: ['./src/index.tsx', './src/assets/styles/main.scss'],
    output: {
      filename: ifMin('[contenthash].js', '[name].js'),
      path: resolve(__dirname, 'dist/' + process.env.NODE_ENV),
      publicPath: '/',
    },
    devServer: {
      static: false,
      port: 8083,
      open: false,
      historyApiFallback: {
        disableDotRule: true,
      },
    },
    optimization: ifMin({
      minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
    }),
    plugins: removeEmpty([
      new HtmlWebpackPlugin({
        template: './src/index.html',
      }),
      new EnvironmentPlugin(['NODE_ENV']),
      ifMin(
        new MiniCssExtractPlugin({
          filename: '[contenthash].css',
        })
      ),
      ifNotMin(new ReactRefreshWebpackPlugin()),
      new ForkTsCheckerWebpackPlugin({
        async: ifNotMin(),
        typescript: {
          configFile: './tsconfig.json',
          mode: 'write-references',
          diagnosticOptions: {
            syntactic: true,
            semantic: true,
            declaration: false,
            global: false,
          },
        },
      }),
    ]),
    module: {
      rules: [
        {
          test: /\.s?css$/,
          use: removeEmpty([
            ifMin({loader: MiniCssExtractPlugin.loader}),
            ifNotMin({loader: 'style-loader'}),
            {
              loader: 'css-loader',
              options: {sourceMap: ifNotMin(true, false)},
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: ['postcss-import', 'tailwindcss'],
                },
                sourceMap: ifNotMin(true, false),
              },
            },
            {
              loader: 'sass-loader',
              options: {sourceMap: ifNotMin(true, false)},
            },
          ]),
        },
        {
          test: /\.tsx?$/,
          exclude: /\/node_modules\//,
          loader: 'babel-loader',
        },
        {
          test: /\.ya?ml$/,
          exclude: /\/node_modules\//,
          loader: 'yaml-loader',
          type: 'json',
        },
        {
          test: /\.svg$/,
          issuer: /\.tsx$/,
          use: ['@svgr/webpack'],
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json'],
      modules: ['./src', 'node_modules'],
    },
    performance: {
      hints: false,
    },
  })
}
