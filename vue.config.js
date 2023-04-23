const { defineConfig } = require('@vue/cli-service')
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = defineConfig({
  devServer: {
    // 'auto' | 'all' [string] here
    allowedHosts: 'all',
  },
  transpileDependencies: true,

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false,
      enableBridge: false
    }
  },
  chainWebpack: (config) => {
    config.plugin("polyfills").use(NodePolyfillPlugin);
  },
})
