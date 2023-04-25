import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { AppServiceFactory } from '@/appservices/AppServiceFactory'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    props: {
      appService: AppServiceFactory.createBasedOnConfiguration(),
    },   
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',    
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
