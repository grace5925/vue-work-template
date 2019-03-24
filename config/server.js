const express = require('express')
const chalk = require('chalk')
const app = express()
const mockApi = require('../mock')
const { getIp } = require('./utils')
const hostName = getIp() ? getIp() : 'localhost'
const allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type, x-requested-with')
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
}
let port = 3000
if (process.argv[3] && !isNaN(process.argv[3])) {
  port = process.argv[3]
}

app.use(allowCrossDomain)
app.all('*', function (req, res, next) {
  console.log(chalk.blue(`${req.method} - ${req.path}`))
  next()
})

app.get('/', function (req, res) {
  res.send('mock服务已启动')
})

if (mockApi.length > 0) {
  mockApi.forEach(function (mock) {
    app.use(mock.api, mock.response)
  })
}

app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  } else {
    console.log(chalk.white('\n server is runing at: ' +
      chalk.blue.underline(`http://${hostName}:${port}/`)
    ))
  }
})
