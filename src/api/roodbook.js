import require from '../plugins/axios'


export function getcodeList(params) {
  return require({
    method: 'post',
    url: 'code_config/page',
    data: params
  })
}
