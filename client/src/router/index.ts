import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import CustomerList from '@/views/CustomerList.vue'
import CustomerRegister from '@/views/CustomerRegister.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Customer',
    component: CustomerList
  },
  {
    path: '/register',
    name: 'Register',
    component: CustomerRegister
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
