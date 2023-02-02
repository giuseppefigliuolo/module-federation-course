//merge serve a mergiare più config tra loro
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const commonConfig = require('./webpack.common')

const devConfig = {
  mode: 'development',
  devServer: {
    port: 8081,
    historyApiFallback: {
      index: 'index.html'
    }
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'marketing',
      filename: 'remoteEntry.js',
      exposes: {
        './MarketingApp': './src/bootstrap'
      }
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
}
// il secondo argomento ha la precedenza sulla prima configurazione (commonconfig) e riscrive le parti di configurazione in comune
module.exports = merge(commonConfig, devConfig)
