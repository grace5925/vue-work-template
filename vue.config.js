const path = require('path')
const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin')

const loading = true

module.exports = {
  publicPath: process.env.VUE_APP_CDN,
  indexPath: 'index.html',
  transpileDependencies: [],
  css: {
    modules: false,
    sourceMap: false,
    loaderOptions: {
      sass: {
        data: `
          @import "~assets/scss/variables";
        `
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('assets', path.join(__dirname, './src/assets'))
  },
  configureWebpack: config => {
    loading && config.plugins.push(
      new SkeletonWebpackPlugin({
        webpackConfig: {
          entry: {
            app: path.join(__dirname, './src/skeleton.js')
          }
        },
        minimize: true,
        quiet: true
      })
    )
  }
}
