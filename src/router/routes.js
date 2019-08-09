/* 
  所有路由数组
*/
import Msite from 'pages/Msite/Msite.vue'
import Search from 'pages/Search/Search.vue'
import Order from 'pages/Order/Order.vue'
import Profile from 'pages/Profile/Profile.vue'
import Login from 'pages/Login/Login.vue'
import Shop from 'pages/Shop/Shop.vue'
import Goods from 'pages/Shop/Goods/Goods.vue'
import Ratings from 'pages/Shop/Ratings/Ratings.vue'
import Info from 'pages/Shop/Info/Info.vue'

export default [
  {
    path: '/',  //模糊匹配--重定向
    redirect: '/msite',
  },
  {
    path: '/msite',
    component: Msite,
    meta: {
      showFooter: true
    }
  },
  {
    path: '/search',
    component: Search,
    meta: {
      showFooter: true
    }
  },
  {
    path: '/order',
    component: Order,
    meta: {
      showFooter: true
    }
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      showFooter: true
    }
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/shop',
    component: Shop,
    children: [
      {
        path: '/shop/goods',
        component: Goods,
      },
      {
        path: '/shop/ratings',
        component: Ratings,
      },
      {
        path: '/shop/info',
        component: Info,
      },
      {
        path: '',  //模糊匹配--重定向
        redirect: '/shop/goods',
      },
    ]
  },
]