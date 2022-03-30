/*
 * @Descripttion: url操作的工具
 * @version:
 * @Author: Gou xuefei
 * @Email:
 * @Date: 2022-03-30 09:30:44
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-03-30 16:23:22
 */

/**
 * @name: obj2query
 * @test: test font
 * @msg:
 * @param {*} sHref
 * @return {*}
 */
export function query2obj(sHref = window.location.search) {
  const args = sHref.split('?')
  if (args[0] === sHref) {
    return ''
  }
  const hrefarr = args[1].split('#')[0].split('&')
  const obj = {}
  for (let i = 0; i < hrefarr.length; i++) {
    hrefarr[i] = hrefarr[i].split('=')
    obj[hrefarr[i][0]] = hrefarr[i][1]
  }
  return obj
}

/**
 * @name: obj2query
 * @test: test font
 * @msg:
 * @param {*} obj
 * @return {*}
 */
export const obj2query = (obj) => {
  const _result = []
  for (const key in obj) {
    const value = obj[key]
    if (value.constructor === Array) {
      value.forEach(function (_value) {
        _result.push(key + '=' + _value)
      })
    } else {
      _result.push(key + '=' + value)
    }
  }
  return _result.join('&')
}

/**
 * @name: getQuery
 * @test: test font
 * @msg:
 * @param {*} name
 * @return {*}
 */
export const getQuery = (name) => {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  const search = window.location.search.split('?')[1] || ''
  const r = search.match(reg) || []
  return r[2]
}
