import Vue from 'vue'
import Vuex from 'vuex'
import { menuRouters } from './router'
import { filterMenus } from './bus'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    globalLoading: false,
    user: null,
    codes: {},
    menus: [],
    menuCollapse: false,
    openTabs: []
  },
  getters: {
    aliveTabs (state) {
      return state.openTabs.filter(i => i.meta && i.meta.keepalive).map(i => i.name)
    },
    userPermissions (state) {
      return state.user ? (Array.isArray(state.user.permissions) ? state.user.permissions : []) : null
    },
    userRoles (state) {
      return state.user ? (Array.isArray(state.user.roles) ? state.user.roles : []) : null
    }
  },
  mutations: {
    setGlobalLoading (state, loading) {
      state.globalLoading = loading
    },
    togglerMenuCollapse (state) {
      state.menuCollapse = !state.menuCollapse
    },
    setUser (state, user) {
      state.user = user
      if (user) {
        localStorage.user = JSON.stringify(user)
        state.menus = filterMenus(menuRouters)
      } else {
        state.openTabs = []
        localStorage.removeItem('user')
      }
    },
    addCodes (state, codes) {
      Object.assign(state.codes, codes)
    },
    openRoute (state, route) {
      if (!state.openTabs.length) {
        state.openTabs.push(menuRouters[0])
      }
      if (route && !state.openTabs.map(i => i.name).includes(route.name) && (!route.meta || (route.meta.layout !== false && route.meta.tag !== false))) {
        state.openTabs.push(route)
      }
    },
    closeRoute (state, route) {
      if (!route) {
        state.openTabs = []
      } else {
        let index = state.openTabs.indexOf(route)
        if (index > -1) {
          state.openTabs.splice(index, 1)
        }
      }
    }
  },
  actions: {
    doUserLogin ({ commit }, loginData) {
      // TODO: 用户登录请求
      let user
      if (loginData.username === 'admin') {
        user = {
          name: '系统管理员',
          nickname: '机智的绿豆蛙',
          avatar: 'https://s1.ax1x.com/2018/12/14/FUpmyF.jpg',
          token: '4JDRIJGGDO8TFBDIKFGMG0W3R',
          lastlogin: 1542185049718
        }
      } else if (loginData.username === 'user') {
        user = {
          name: '平台用户',
          nickname: '愚蠢的绿豆蛙',
          avatar: 'http://cnscoo.cc/static/favicon.png',
          token: 'I9EN3OE5NRHB0RKTPDRITJ389F',
          lastlogin: 1542185067554
        }
      } else {
        return Promise.reject(new Error('错误的用户名或密码'))
      }
      commit('setUser', user)
      return Promise.resolve(user)
    },
    doUserLogout ({ commit }) {
      // TODO: 用户登出请求
      commit('setUser', null)
      return Promise.resolve()
    },
    getCodes ({ commit, state }, codeTypes) {
      let codes
      const result = {}
      if (typeof codeTypes === 'string') {
        codes = codeTypes.split(',')
      } else if (toString.call(codeTypes) === '[object Array]') {
        codes = codeTypes
      } else {
        console.warn('错误的CodeTypes', codeTypes)
        return Promise.resolve(result)
      }

      const originCodes = Object.keys(state.codes)
      const requestCodes = codes.filter(i => !originCodes.includes(i))

      if (requestCodes.length === 0) {
        codes.forEach(i => {
          if (state.codes[i]) result[i] = state.codes[i]
        })
        return result
      }

      return Vue.axios.post('/code', requestCodes).then(res => {
        for (let c of res) {
          switch (c.dataType) {
            case 'Boolean':
              c.children.forEach(i => { i.content = Boolean(i.content) })
              break
            case 'Integer':
            case 'Decimal':
              c.children.forEach(i => { i.content = Number(i.content) })
              break
            case 'Date':
            case 'DateTime':
              c.children.forEach(i => { i.content = new Date(i.content) })
              break
          }
          result[c.code] = c.children
        }
        commit('addCodes', result)
        codes.forEach(i => {
          if (!result[i] && state.codes[i]) {
            result[i] = state.codes[i]
          }
        })
        return result
      })
    }
  }
})
