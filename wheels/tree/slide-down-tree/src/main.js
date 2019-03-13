import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
//格式化 axios 请求返回的数据
axios.interceptors.response.use(function (response) {
  if (typeof response === 'string') {
    try {
      response.data = JSON.parse(response.data)
    } catch (err) {}
  }
  if (typeof response.data === 'object') {
    response.data.message = response.data.message || response.data.msg
  }
  return response.data
}, function (error) {
  throw new Error(error)
})
// axios.defaults.withCredentials = true 跨域可以携带cookie， 后端需要配置相关设置
axios.defaults.withCredentials = true
Vue.prototype.$http = axios

new Vue({
  el: '#app',
  render: h => h(App)
})
