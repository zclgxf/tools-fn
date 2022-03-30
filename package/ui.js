/*
 * @Descripttion:ui操作
 * @version:
 * @Author: Gou xuefei
 * @Email:
 * @Date: 2022-03-30 09:30:44
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-03-30 16:29:57
 */
/**
 * @name: hasClass
 * @test: test font
 * @msg:
 * @param {*} el
 * @param {*} className
 * @return {*}
 */
export const hasClass = (el, className) => {
  const reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

/**
 * @name: addClass
 * @test: test font
 * @msg:
 * @param {*} el
 * @param {*} className
 * @return {*}
 */
export const addClass = (el, className) => {
  if (hasClass(el, className)) {
    return
  }
  const newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}

/**
 * @name: delClass
 * @test: test font
 * @msg:
 * @param {*} el
 * @param {*} className
 * @return {*}
 */
export const delClass = (el, className) => {
  if (!hasClass(el, className)) {
    return
  }
  const reg = new RegExp('(^|\\s)' + className + '(\\s|$)', 'g')
  el.className = el.className.replace(reg, ' ')
}

/**
 * @name: scrollToTop
 * @test: test font
 * @msg:
 * @param {*}
 * @return {*}
 */
export const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop)
    window.scrollTo(0, c - c / 8)
  }
}

/**
 * @name: getStyle
 * @test: test font
 * @msg:
 * @param {*} elem
 * @param {*} prop
 * @return {*}
 */
export function getStyle(elem, prop) {
  return window.getComputedStyle
    ? window.getComputedStyle(elem, null)[prop]
    : elem.currentStyle[prop]
}
