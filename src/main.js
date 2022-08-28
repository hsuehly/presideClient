import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'
console.log(process.env.VUE_APP_URL,'VUE_APP_URL')
const app = new Vue({
  ...App
})
app.$mount()
