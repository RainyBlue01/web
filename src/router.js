import Vue from 'vue'
import Router from 'vue-router'
import Layout from './layout/Index'

Vue.use(Router)

export const menuRouters = [{
  path: '/',
  name: 'home',
  component: () => import(/* webpackChunkName: "home" */ './views/Home'),
  meta: { title: '首页',icon: ''}
}, {
  path: '/scenicspot',
  name: 'scenicspot',
  component: () => import(/* webpackChunkName: "scenicspot" */ './views/scenicspot/ScenicSpotList'),
  meta: { title: '景点', icon: '' }
}, {
  path: '/roadbook',
  name: 'roadbook',
  component: () => import(/* webpackChunkName: "roadbook" */ './views/roadbook/RoadBook'),
  meta: { title: '路书', icon: '' }
},
  {
    path: '/activities',
    name: 'activities',
    component: () => import(/* webpackChunkName: "activities" */ './views/activities/Activities'),
    meta: { title: '活动', icon: '' }
  },
  {
    path: '/travelnotes',
    name: 'travelnotes',
    component: () => import(/* webpackChunkName: "travelnotes" */ './views/travelnotes/TravelNotes'),
    meta: { title: '游记', icon: '' }
  },
]

export const otherRouters = [{
  path: '/login',
  name: 'Login',
  component: () => import(/* webpackChunkName: "login" */ './views/Login'),
  meta: { title: '登录', noTab: true, auth: false }
}, {
  path: '/e403',
  name: 'E403',
  component: () => import(/* webpackChunkName: "error" */ './views/errors/E403'),
  meta: { title: '没有权限', noTab: true, auth: false }
}]

function filterComponentRouter (routers) {
  let rs = []
  for (let route of routers) {
    if (Array.isArray(route.children) && route.children.length) {
      rs.push(...filterComponentRouter(route.children))
    } else if (route.component) {
      rs.push(route)
    }
  }
  return rs
}

let layoutChildren = []
// 单独提出，方便动态添加路由
export const layoutRoute = {
  path: '',
  name: 'Layout',
  component: Layout,
  redirect: '/',
  set children (menus) {
    layoutChildren = filterComponentRouter(menus)
  },
  get children () {
    return layoutChildren
  }
}
// 动态添加时，此处不赋值
layoutRoute.children = menuRouters

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    ...otherRouters,
    layoutRoute,
    {
      path: '*',
      name: 'E404',
      component: () => import(/* webpackChunkName: "error" */ './views/errors/E404'),
      meta: { title: '页面不存在', noTab: true, auth: false }
    }
  ]
})
