import Vue from 'vue'
import Router from 'vue-router'
import Home from '../view/Home.vue'
import Details from '../view/Details.vue'
import NotFound from '../view/NotFound.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/details/:id',
      name: 'Details',
      component: Details
    },
    {
      path: '/*',
      name: '404',
      component: NotFound

  }
  ]
})
