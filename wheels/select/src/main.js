import Vue from 'vue'
import App from './App.vue'

import ElSelect from './components/packages/select'
import ElOption from './components/packages/option'

Vue.use(ElSelect)
Vue.use(ElOption)

new Vue({
  el: '#app',
  render: h => h(App)
})
