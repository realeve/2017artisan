import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Info from '@/components/Info'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    component: Home
  }, {
    path: '/info',
    component: Info
  }]
})
