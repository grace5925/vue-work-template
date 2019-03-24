const path = require('path')

module.exports = {
  publicPath: process.env.VUE_APP_CDN,
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
  }
}
