import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import store from './store'

// axios.defaults.withCredentials = true // 跨域可以携带cookie， 后端需要配置相关设置
Vue.prototype.$http = axios // 把axios绑定到Vue上 命名为 $http，以后可以用 this.$http 当做axios用

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
