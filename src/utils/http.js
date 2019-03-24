import 'nprogress/nprogress.css'
import axios from 'axios'
import qs from 'qs'
import NProgress from 'nprogress'

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
    return config
  },
  err => {
    NProgress.done()
    return Promise.resolve(err)
  }
)

Axios.interceptors.response.use(res => {
  if (res.status && res.status === 200) {
    let responese = res.data
    let status = responese.code && String(responese.code)
    if (status === '80') {
      alert(responese.msg)
    }
    NProgress.done()
    return responese
  }
}, err => {
  NProgress.done()
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
