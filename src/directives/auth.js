import Vue from 'vue'
import { isRole, hasPermission } from '../bus'

export const authDirectives = {
  install (Vue) {
    Object.defineProperties(Vue, {
      '$auth': {
        get () {
          return hasPermission
        }
      },
      '$role': {
        get () {
          return isRole
        }
      }
    })
    // 权限判断指令
    Vue.directive('auth', (el, binding, vnode) => {
      const { value } = binding

      if (vnode.context.$route.meta.auth !== false && !hasPermission(value)) {
        if (el.parentNode) {
          el.parentNode.removeChild(el)
        } else {
          el.style.display = 'none'
        }
      }
    })
    // 角色判断指令
    Vue.directive('role', (el, binding, vnode) => {
      const { value } = binding

      if (vnode.context.$route.meta.auth !== false && !isRole(value)) {
        if (el.parentNode) {
          el.parentNode.removeChild(el)
        } else {
          el.style.display = 'none'
        }
      }
    })
  }
}

Vue.use(authDirectives)
