//merge serve a mergiare più config tra loro
const { merge } = require('webpack-merge')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const commonConfig = require('./webpack.common')
const packageJson = require('../package.json')

const devConfig = {
  mode: 'development',
  output: {
    // per trovare il file main.js
    publicPath: 'http://localhost:8080/'
  },
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: '/index.html',
      historyApiFallback: true
    }
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        // 'marketing@ matches con il nome dato al remote nella config
        marketing: 'marketing@http://localhost:8081/remoteEntry.js',
        auth: 'auth@http://localhost:8082/remoteEntry.js'
      },
      shared: packageJson.dependencies
    })
  ]
}
// il secondo argomento ha la precedenza sulla prima configurazione (commonconfig) e riscrive le parti di configurazione in comune
module.exports = merge(commonConfig, devConfig)
