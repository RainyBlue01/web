'use strict'

import Vue from 'vue'
import axios from 'axios'
import { Message } from 'element-ui'

const showError = msg => {
  Message({ showClose: true, message: msg, type: 'error' })
}

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  baseURL: process.env.VUE_APP_BASE_URL || ''
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
}

const _axios = axios.create(config)

_axios.interceptors.request.use(
  function (config) {
    const token = localStorage.token
    if (token) {
      config.headers['X-Auth-Token'] = token
    }
    return config
  },
  function (error) {
    showError('请求发生错误')
    return Promise.reject(error)
  }
)

_axios.interceptors.response.use(
  function (response) {
    let data = response.data
    if (data && data.message === 'success') {
      return data.content
    }
    if (data) {
      if (response.config.showMessage !== false) {
        showError(data ? `Code: ${data.errorCode} - Message: ${data.errorMsg}` : '发生错误，但服务器未返回任何内容')
      }
      if (data.errorCode === '1201' && response.config.notice !== false) {
        if (Vue.$app) {
          Vue.$app.$emit('userNeedLogin')
        }
      }
      return Promise.reject(data)
    }
  },
  function (error) {
    if (error.response) {
      showError(`ServerError: Status=${error.response.status}, Text=${error.response.statusText}`)
    } else {
      showError('网络连接错误！')
    }
    return Promise.reject(error)
  }
)

export default _axios

Plugin.install = function (Vue) {
  Vue.axios = _axios
  window.axios = _axios
  Object.defineProperties(Vue.prototype, {
    axios: {
      get () {
        return _axios
      }
    },
    $axios: {
      get () {
        return _axios
      }
    }
  })
}

Vue.use(Plugin)
