import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FavsView from '@/views/FavsView'
import UserPage from '@/views/UserPage'
import AllAds from '@/components/profile/AllAds'
import UserSettings from '@/components/profile/UserSettings'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/category/:id',
    name: 'category',
    component: () => import( '../views/CategoryView.vue')
  },
  {
    path: '/ads/:id',
    name: 'ads',
    component: () => import( '../views/AdsView.vue')
  },
  {
    path: '/favs',
    name: 'favs',
    component: FavsView
  },
  {
    path: '/user',
    name: 'user',
    component: UserPage,
    children : [
      {
        path: 'allads',
        name: 'allads',
        component: AllAds
      },      
      {
        path: 'settings',
        name: 'settings',
        component: UserSettings
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
