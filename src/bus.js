import router from './router'
import store from './store'

export const hasPermission = value => {
  const userPermissions = store.getters.userPermissions
  if (!userPermissions) return false
  if (!value || value.length === 0) return true
  if (!userPermissions.length) return false

  let permissions
  if (typeof value === 'string') {
    permissions = value.split(',')
  } else if (Array.isArray(value)) {
    permissions = value
  } else {
    throw new Error('指定的权限必须是一个数组或者以英文逗号分隔的字符串')
  }

  return userPermissions.some(i => permissions.includes(i))
}

export const isRole = value => {
  const userRoles = store.getters.userRoles
  if (!userRoles) return false
  if (!value || value.length === 0) return true
  if (!userRoles.length) return false

  let roles
  if (typeof value === 'string') {
    roles = value.split(',')
  } else if (Array.isArray(value)) {
    roles = value
  } else {
    throw new Error('指定的角色必须是一个数组或者以英文逗号分隔的字符串')
  }

  return userRoles.some(i => roles.includes(i))
}

export const beforeAppCreate = () => {
  // 如果存在用户登录信息
  if (localStorage.user) {
    try {
      const user = JSON.parse(localStorage.user)
      store.commit('setUser', user)
    } catch (e) {
      localStorage.removeItem('user')
    }
  }
  // 路由跳转拦截
  router.beforeEach((to, from, next) => {
    let user = store.state.user
    if (to.name === 'Login' && user) {
      next({ name: 'Home' })
      return
    }
    const meta = to.meta
    // 检查用户登录
    if (!user && (!meta || meta.auth !== false) && to.name !== 'Login') {
      next({ name: 'Login' })
      return
    }
    // 检查用户权限
    if (user && (!isRole(meta.roles) || !hasPermission(meta.permissions))) {
      next({ name: 'E403' })
      return
    }
    // 浏览器标题显示
    if (meta && meta.title) {
      document.title = '管理平台 - ' + meta.title
    } else {
      document.title = '管理平台'
    }
    if (!meta || !meta.noTab) {
      store.commit('openRoute', to)
    }
    next()
  })
}

// 菜单过滤
export const filterMenus = menus => {
  let ms = []
  for (let m of menus) {
    if (m.meta && m.meta.hidden === true) continue
    let auth = !m.meta || m.meta.auth !== false
    let roles = (m.meta && m.meta.roles) || []
    let permissions = (m.meta && m.meta.permissions) || []
    if (auth && isRole(roles) && hasPermission(permissions)) {
      if (m.children && m.children.length) {
        let children = filterMenus(m.children)
        if (children.length) {
          ms.push({ name: m.name, path: m.path, meta: m.meta, children })
        }
      } else {
        ms.push({ name: m.name, path: m.path, meta: m.meta })
      }
    }
  }
  return ms
}

// 全局事件处理
export const eventBus = function (app) {
  app.$on('userNeedLogin', () => {
    router.push({ name: 'Login' })
  })
}
