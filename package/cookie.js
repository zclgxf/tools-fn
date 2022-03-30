/*
 * @Descripttion: cookie
 * @version:
 * @Author: Gou xuefei
 * @Email:
 * @Date: 2022-03-30 09:30:44
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-03-30 16:30:29
 */
/**
 * @name: setCookie
 * @test: test font
 * @msg:
 * @param {*} key
 * @param {*} value
 * @param {*} options
 * @return {*}
 */
export function setCookie(key, value, options = {}) {
  let str = key + '=' + encodeURIComponent(value)
  if (options.expires) {
    const curr = new Date()
    curr.setTime(curr.getTime() + options.expires * 3600 * 1000)
    options.expires = curr.toUTCString()
  }
  for (const k in options) {
    str += ';' + k + '=' + options[k]
  }
  document.cookie = str
}

/**
 * @name: getCookie
 * @test: test font
 * @msg:
 * @param {*} key
 * @return {*}
 */
export function getCookie(key) {
  let cookies = document.cookie
  cookies += ';'
  const start = cookies.indexOf(key)
  if (start <= -1) {
    return null
  }
  const end = cookies.indexOf(';', start)
  const value = cookies.slice(start + key.length + 1, end)
  return decodeURIComponent(value)
}

/**
 * @name: delCookie
 * @test: test font
 * @msg:
 * @param {*} key
 * @return {*}
 */
export function delCookie(key) {
  const value = getCookie(key)
  if (value === null) {
    return false
  }
  setCookie(key, value, { expires: 0 })
}
