import Vue from 'vue'

export const date = (date, format = 'yyyy-MM-dd hh:mm') => {
  if (!date) return ''
  const value = date instanceof Date ? date : new Date(date)
  let o = {
    'M+': value.getMonth() + 1,
    'd+': value.getDate(),
    'h+': value.getHours(),
    'm+': value.getMinutes(),
    's+': value.getSeconds(),
    'q+': Math.floor((value.getMonth() + 3) / 3),
    'S': value.getMilliseconds()
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (value.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return format
}

Vue.filter('date', date)
