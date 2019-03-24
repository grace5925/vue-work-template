module.exports = [
  {
    api: '/api/user/info',
    response: function (req, res) {
      let data = {
        nickname: 'test'
      }
      res.send(data)
    }
  },
  {
    api: '/api/rank',
    response: function (req, res) {
      let data = [1, 2, 3]
      res.send(data)
    }
  }
]
