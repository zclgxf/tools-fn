/*
 * @Descripttion: 工具函数
 * @version:
 * @Author: Gou xuefei
 * @Email:
 * @Date: 2022-03-30 09:30:44
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-03-30 16:28:27
 */
import { getType } from './type'

// 删除数组中的某一项
/**
 * @name: arrDel
 * @test: test font
 * @msg:
 * @param {*} arr
 * @param {*} item
 * @return {*}
 */
export function arrDel(arr, item) {
  if (arr.length) {
    const index = arr.indexOf(item)
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

// 删除对象中的某一项
/**
 * @name:objDel
 * @test: test font
 * @msg:
 * @param {*} obj
 * @param {*} item
 * @return {*}
 */
export function objDel(obj, item) {
  if (hasOwn(obj, item)) {
    delete obj.item
  }
}

/**
 * @name:hasOwn
 * @test: test font
 * @msg:
 * @param {*} obj
 * @param {*} key
 * @return {*}
 */
export function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key)
}

/**
 * @name: trim
 * @test: test font
 * @msg:
 * @param {*} v
 * @return {*}
 */
export function trim(v) {
  return v.replace(/^\s+|\s+$/gm, '')
}

// 深克隆
/**
 * @name: clone
 * @test: test font
 * @msg:
 * @param {*} target
 * @return {*}
 */
export function clone(target) {
  let result
  const targetType = getType(target)
  if (targetType === 'Object') {
    result = {}
  } else if (targetType === 'Array') {
    result = []
  } else {
    return target
  }
  // 3.遍历目标数据
  for (const i in target) {
    const value = target[i]

    // 4.判断目标结构里的每一值是否存在对象/数组
    if (getType(value) === 'Object' || getType(value) === 'Array') {
      // 对象或者数组里嵌套了对象或者数组
      // 5.继续遍历获取到的value值
      result[i] = clone(value)
    } else {
      result[i] = value
    }
  }
  return result
}

// 异步加载js，并防止重复加载
/**
 * @name: loadScript
 * @test: test font
 * @msg:
 * @param {*}
 * @return {*}
 */
const scriptCaches = {}
export function loadScript(url, callback) {
  if (!scriptCaches[url]) {
    const s = document.createElement('script')
    if (s.readyState) {
      // ie8及以下版本
      s.onreadystatechange = function () {
        if (s.readyState === 'complete' || s.readyState === 'loaded') {
          callback()
        }
      }
    } else {
      s.onload = function () {
        callback()
      }
    }
    s.src = url
    scriptCaches[url] = url
    document.head.appendChild(s)
  }
}

/**
 * @name: toNumber
 * @test: test font
 * @msg:
 * @param {*} val
 * @return {*}
 */
export function toNumber(val) {
  const n = parseFloat(val)
  return isNaN(n) ? val : n
}

/**
 * @name: colorToRGB
 * @test: test font
 * @msg:
 * @param {*} val: 颜色
 * @param {*} opa：是否透明
 * @return {*}
 */
export const colorToRGB = (val, opa) => {
  const pattern = /^(#?)[a-fA-F0-9]{6}$/ // 16进制颜色值校验规则
  const isOpa = typeof opa === 'number' // 判断是否有设置不透明度

  if (!pattern.test(val)) {
    // 如果值不符合规则返回空字符
    return ''
  }

  const v = val.replace(/#/, '') // 如果有#号先去除#号
  const rgbArr = []
  let rgbStr = ''

  for (let i = 0; i < 3; i++) {
    const item = v.substring(i * 2, i * 2 + 2)
    const num = parseInt(item, 16)
    rgbArr.push(num)
  }

  rgbStr = rgbArr.join()
  rgbStr =
    'rgb' + (isOpa ? 'a' : '') + '(' + rgbStr + (isOpa ? ',' + opa : '') + ')'
  return rgbStr
}
/**
 * @name: debounce
 * @test: test font
 * @msg:
 * @param {*} f:执行的方法
 * @param {*} t:时间
 * @param {*} im:是否立即执行
 * @return {*}
 */
export function debounce(f, t, im = false) {
  let timer
  let flag = true
  return (...args) => {
    // 需要立即执行的情况
    if (im) {
      if (flag) {
        f(...args)
        flag = false
      } else {
        clearTimeout(timer)
        timer = setTimeout(() => {
          f(...args)
          flag = true
        }, t)
      }
    } else {
      // 非立即执行的情况
      clearTimeout(timer)
      timer = setTimeout(() => {
        f(...args)
      }, t)
    }
  }
}
/**
 * @name: throttle
 * @test: test font
 * @msg:
 * @param {*} f: 执行的方法
 * @param {*} t: 时间
 * @param {*} im: 是否立即执行
 * @return {*}
 */
export function throttle(f, t, im = false) {
  let flag = true
  return (...args) => {
    if (flag) {
      flag = false
      im && f(...args)
      setTimeout(() => {
        !im && f(...args)
        flag = true
      }, t)
    }
  }
}
