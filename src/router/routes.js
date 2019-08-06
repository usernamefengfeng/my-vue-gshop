/* 
  所有路由数组
*/
import Msite from 'pages/Msite/Msite.vue'
import Search from 'pages/Search/Search.vue'
import Order from 'pages/Order/Order.vue'
import Profile from 'pages/Profile/Profile.vue'
import Login from 'pages/Login/Login.vue'

export default [
  {
    path: '/',
    redirect: '/msite',
  },
  {
    path: '/msite',
    component: Msite,
  },
  {
    path: '/search',
    component: Search,
  },
  {
    path: '/order',
    component: Order,
  },
  {
    path: '/profile',
    component: Profile,
  },
  {
    path: '/login',
    component: Login,
  },
]