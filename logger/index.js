const globby = require('globby')
const prettier = require('prettier')
const makeDir = require('make-dir')
const PATH = require('path')
const del = require('del')
const FS = require('fs')
const dirTree = require('./dirTree.js')
const mergeFileConfig = (item, dirpath) => {
  let configFile = PATH.join(dirpath, 'file.json')
  if (FS.existsSync(configFile)) {
    try {
      let infoJson = JSON.parse(FS.readFileSync(configFile).toString())
      if (infoJson) {
        Object.assign(item, infoJson)
      }
    } catch (err) {
      console.log('mergeFileConfig', err)
    }
  }
}
const relative = (from, to) => {
  return PATH.relative(from, to).replace(/\\/g, '/')
}
module.exports = {
  start () {
    const viewRoot = 'src/pages'
    const paths = globby.sync([`${viewRoot}/**/main.js`])
    const chunks = paths.map(path => {
      return PATH.dirname(PATH.relative(viewRoot, path))
        .split(PATH.sep)
        .join('~')
    })
    makeDir.sync('logs')
    del.sync('logs/*.json')
    const htmlFile = 'logs/pages.json'
    let htmlConfig = {}
    paths.forEach((path, index) => {
      const chunk = chunks[index]
      const dirpath = PATH.dirname(path)
      let template = './public/index.html'
      let ext = 'html'
      let title = '首页'
      let configFile = PATH.join(dirpath, 'file.json')
      if (FS.existsSync(configFile)) {
        try {
          let infoJson = JSON.parse(FS.readFileSync(configFile).toString())
          if (infoJson) {
            title = infoJson.title
            template = infoJson.template
            ext = process.env.NODE_ENV === 'production' ? infoJson.ext : 'html'
          }
        } catch (err) {
          console.log('start', err)
        }
      }
      htmlConfig[chunk] = {
        entry: path,
        title,
        filename: relative(viewRoot, dirpath) + '.' + ext,
        template: template,
        minify: process.env.NODE_ENV === 'development' ? false : {
          collapseWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeAttributeQuotes: false,
          minifyCSS: true,
          minifyJS: false,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true
        }
      }
    })
    htmlConfig = JSON.stringify(htmlConfig) !== '{}' ? htmlConfig : null
    if (htmlConfig) {
      let htmlConfigStr = prettier.format(JSON.stringify(htmlConfig), {
        parser: 'json'
      })
      FS.writeFile(htmlFile, htmlConfigStr, function (err) {
        if (err) {
          return console.log('htmlConfig', err)
        }
      })
    }
    this.log(viewRoot, paths, chunks)
    return htmlConfig
  },
  log (viewRoot, paths, chunks) {
    const routeFile = 'logs/location.json'
    const routesPath = paths.map((path, index) => {
      const dirpath = PATH.dirname(path)
      let item = {
        name: chunks[index],
        chunk: chunks[index],
        location: relative(viewRoot, dirpath) + '.html'
      }
      mergeFileConfig(item, dirpath)
      return item
    })
    if (routeFile) {
      let routesPathStr = prettier.format(JSON.stringify({
        route: routesPath
      }), {
        parser: 'json'
      })
      FS.writeFile(routeFile, routesPathStr, function (err) {
        if (err) {
          return console.log('routeFile', err)
        }
      })
    }
    const logsTree = dirTree(
      viewRoot, {
        basename: /^app.js$/,
        normalizePath: true
      },
      (item, PATH) => {
        const path = item.path
        const dirpath = PATH.dirname(path)
        if (item.type === 'file') {
          item.path = relative(viewRoot, dirpath) + '.html'
          mergeFileConfig(item, dirpath)
        } else if (item.type === 'directory') {
          mergeFileConfig(item, path)
          item.path = '#'
        }
      }
    )
    const treeFile = 'logs/tree.json'
    if (logsTree) {
      let logsTreeStr = prettier.format(JSON.stringify(logsTree), {
        parser: 'json'
      })
      FS.writeFile(treeFile, logsTreeStr, function (err) {
        if (err) {
          return console.log('logsTree', err)
        }
      })
    }
  }
}
