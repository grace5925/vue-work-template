const path = require('path')
const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin')
const logger = require('./logger')
const pages = logger.start()

const loading = true

module.exports = {
  publicPath: process.env.VUE_APP_CDN,
  pages,
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
    config.module
      .rule('images')
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({
        disable: true
      })
      .end()
  },
  configureWebpack: config => {
    loading && config.plugins.push(
      new SkeletonWebpackPlugin({
        webpackConfig: {
          entry: {
            index: path.join(__dirname, './src/skeleton.js'),
            about: path.join(__dirname, './src/skeleton.js'),
            list: path.join(__dirname, './src/skeleton.js')
          }
        },
        minimize: true,
        quiet: true
      })
    )
  }
}
