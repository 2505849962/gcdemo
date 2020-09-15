// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'


import Element from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Element)

Vue.config.productionTip = false

Vue.prototype.$host = "http://localhost:3030"
// 注册过滤器
import filterObj from "./filter"
for(let k in filterObj){
  Vue.filter(k,filterObj[k])
}



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
