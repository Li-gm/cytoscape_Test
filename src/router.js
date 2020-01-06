import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home/home.vue'
import network from './views/Home/network.vue'
import EsayNetwork from './views/NetWork/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/network',
      name: 'network',
      component: network
    },
    {
      path: '/',
      name: 'EsayNetwork',
      component: EsayNetwork
    }
  ]
})
