import Vue from 'vue'
// import ElementUI from 'element-ui'
import App from './App.vue'
import axios from 'axios'
// import store from './store'
// import 'element-ui/lib/theme-chalk/index.css'
// Vue.use(ElementUI);
// axios
axios.interceptors.response.use(function (response) {
  if (typeof response === 'string') {
    try {
      response.data = JSON.parse(response.data)
    } catch (err) {}
  }
  if (typeof response.data === 'object') {
    response.data.message = response.data.message || response.data.msg
  }
  // let data = response.data
  // if (data.flag == 1) {
  //   alert(data.data)
  // }
  return response.data
}, function (error) {
  throw new Error(error)
})
axios.defaults.withCredentials = true
// axios.defaults.withCredentials = true // 跨域可以携带cookie， 后端需要配置相关设置
Vue.prototype.$http = axios // 把axios绑定到Vue上 命名为 $http，以后可以用 this.$http 当做axios用

new Vue({
  el: '#app',
  render: h => h(App)
})
