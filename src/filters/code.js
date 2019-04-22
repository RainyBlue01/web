import Vue from 'vue'
import store from '../store'

export const CodeType = {
  /* 性别 */ gender: 'GENDER'
}

const codes = store.state['codes']

export const code = (value, type) => {
  if (typeof value === 'undefined' || value === null) return ''
  if (!codes) return value
  if (typeof type !== 'string') {
    console.warn('type must a string value', type)
    return value
  }
  let codeValues = codes[type]
  if (toString.call(codeValues) === '[object Object]') {
    return codeValues[value] || value
  } else if (toString.call(codeValues) === '[object Array]') {
    if (codeValues.length === 0) return value
    let item = codeValues.find(i => i.content === value)
    return (item && item.name) || value
  }
  return value
}

Object.assign(code, CodeType)

const CodeFilter = {
  install (Vue) {
    Vue.filter('code', code)
    Object.keys(CodeType).forEach(key => {
      Vue.filter(key, value => code(value, CodeType[key]))
    })
    Object.defineProperties(Vue.prototype, {
      $code: { get: () => code },
      _code: { get () { return codes => store.dispatch('getCodes', codes) } }
    })
  }
}

Vue.use(CodeFilter)
