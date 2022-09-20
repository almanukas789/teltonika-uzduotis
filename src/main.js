// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import JwPagination from 'jw-vue-pagination'
Vue.component('jw-pagination', JwPagination)
Vue.config.productionTip = false

Vue.prototype.$jsonServer = "http://localhost:3000";
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})