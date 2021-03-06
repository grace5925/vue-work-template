const path = require('path')
const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin')

const loading = true

module.exports = {
  publicPath: process.env.VUE_APP_CDN,
  indexPath: 'index.html',
  productionSourceMap: false,
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
    config
      .plugin('html')
      .tap(args => {
        args.map(item => {
          if (process.env.NODE_ENV === 'production') {
            item.minify = {
              collapseWhitespace: true,
              removeComments: true,
              removeRedundantAttributes: true,
              removeScriptTypeAttributes: true,
              removeAttributeQuotes: false,
              minifyCSS: true,
              minifyJS: true,
              removeStyleLinkTypeAttributes: true,
              useShortDoctype: true
            }
          }
        })
        return args
      })
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
            app: path.join(__dirname, './src/skeleton.js')
          }
        },
        minimize: true,
        quiet: true
      })
    )
  }
}
