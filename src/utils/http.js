import 'nprogress/nprogress.css'
import axios from 'axios'
import qs from 'qs'
import NProgress from 'nprogress'
import { message } from 'element-ui'

let pending = []
const CancelToken = axios.CancelToken

const cancelPending = config => {
  pending.forEach((item, index) => {
    if (config) {
      if (item.urlPath === config.url) {
        item.Cancel('您的操作太快了')
        pending.splice(index, 1)
      }
    } else {
      item.Cancel()
      pending.splice(index, 1)
    }
  })
}

const Axios = axios.create({
  baseURL: process.env.VUE_APP_API,
  timeout: 15000,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

Axios.interceptors.request.use(
  config => {
    NProgress.start()
    if (config.method === 'post' || config.method === 'put' || config.method === 'delete') {
      config.data = qs.stringify(config.data, { allowDots: true })
    }

    cancelPending(config)
    config.cancelToken = new CancelToken(c => {
      pending.push({ 'urlPath': config.url, 'Cancel': c })
    })

    return config
  },
  err => {
    NProgress.done()
    return Promise.resolve(err)
  }
)

Axios.interceptors.response.use(res => {
  cancelPending(res.config)
  if (res.status && res.status === 200) {
    let responese = res.data
    let status = responese.code && String(responese.code)
    if (status === '80') {
      message({
        message: responese.msg,
        duration: 0,
        showClose: true,
        onClose () {
          window.location.reload()
        }
      })
    }
    NProgress.done()
    return responese
  }
}, err => {
  return Promise.resolve(err)
})

const request = ({
  url = '/',
  data = null,
  method = 'POST',
  params = {}
}) => {
  return Axios({
    url,
    method,
    data,
    params: method.toUpperCase() === 'GET' ? data : params
  })
}

export default request
