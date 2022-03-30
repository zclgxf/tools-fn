/*
 * @Descripttion: 时间处理的方法
 * @version:
 * @Author: Gou xuefei
 * @Email: 50209897@qq.com
 * @Date: 2022-03-30 09:30:44
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-03-30 16:50:07
 */
/**
 * @name: formatDate
 * @test: test font
 * @msg:
 * @param {*} date
 * @param {*} fmt
 * @return {*}
 */
export function formatDate(date, fmt = 'yyyy-MM-dd hh:mm:ss') {
  if (typeof date === 'string') {
    return date
  }
  date = new Date(date)
  const o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds(), // 毫秒
  }

  if (!date || date == null) return null

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
    }
  }
  return fmt
}
/**
 * @name: isDateValid
 * @test: test font
 * @msg:
 * @param {array} val
 * @return {*}
 */
export const isDateValid = (...val) => !Number.isNaN(new Date(...val).valueOf())
/**
 * @name: 获取最近时间段
 * @test: test font
 * @msg:
 * @param {*} val
 * @return {*}
 */
export const dateFn = (val, fmt = 'yyyy-MM-dd hh:mm:ss') => {
  const end = new Date()
  const year = end.getFullYear()
  const M = end.getMonth() + 1
  const D = end.getDate()
  const month = M < 10 ? `0${M}` : M // 0-11表示1-12月
  const day = D < 10 ? `0${D}` : D
  const dateObj = {}
  dateObj.end = year + '-' + month + '-' + day
  if (val === 0) {
    if (day - 7 <= 0) {
      // 如果在当月7日之前
      const startMonthDay = new Date(year, parseInt(month) - 1, 0).getDate() // 1周前所在月的总天数
      if (month - 1 <= 0) {
        // 如果在当年的1月份
        dateObj.start = year - 1 + '-' + 12 + '-' + (31 - (7 - day))
      } else {
        dateObj.start =
          year + '-' + (month - 1) + '-' + (startMonthDay - (7 - day))
      }
    } else {
      dateObj.start = year + '-' + month + '-' + (day - 7)
    }
  } else if (val === 1) {
    const endMonthDay = new Date(year, month, 0).getDate() // 当前月的总天数
    if (month - 1 <= 0) {
      // 如果是1月，年数往前推一年<br>
      dateObj.start = year - 1 + '-' + 12 + '-' + day
    } else {
      const startMonthDay = new Date(year, parseInt(month) - 1, 0).getDate()
      if (startMonthDay < day) {
        // 1个月前所在月的总天数小于现在的天日期
        if (day < endMonthDay) {
          // 当前天日期小于当前月总天数
          dateObj.start =
            year +
            '-' +
            (month - 1) +
            '-' +
            (startMonthDay - (endMonthDay - day))
        } else {
          dateObj.start = year + '-' + (month - 1) + '-' + startMonthDay
        }
      } else {
        dateObj.start = year + '-' + (month - 1) + '-' + day
      }
    }
  } else {
    const endMonthDay = new Date(year, month, 0).getDate() // 当前月的总天数
    if (month - val <= 0) {
      // 如果是1、2、3月，年数往前推一年
      const startValMonthDay = new Date(
        year - 1,
        12 - (val - parseInt(month)),
        0
      ).getDate() // 3个月前所在月的总天数
      if (startValMonthDay < day) {
        // 3个月前所在月的总天数小于现在的天日期
        dateObj.start =
          year - 1 + '-' + (12 - (val - month)) + '-' + startValMonthDay
      } else {
        dateObj.start = year - 1 + '-' + (12 - (val - month)) + '-' + day
      }
    } else {
      const startValMonthDay = new Date(
        year,
        parseInt(month) - val,
        0
      ).getDate() // 3个月前所在月的总天数
      if (startValMonthDay < day) {
        // 3个月前所在月的总天数小于现在的天日期
        if (day < endMonthDay) {
          // 当前天日期小于当前月总天数,2月份比较特殊的月份
          dateObj.start =
            year +
            '-' +
            (month - val) +
            '-' +
            (startValMonthDay - (endMonthDay - day))
        } else {
          dateObj.start = year + '-' + (month - val) + '-' + startValMonthDay
        }
      } else {
        dateObj.start = year + '-' + (month - val) + '-' + day
      }
    }
  }
  const startArr = dateObj.start.split('-')
  const startY = startArr[0]
  const startM = startArr[1].length < 2 ? `0${startArr[1]}` : startArr[1]
  const startD = startArr[2].length < 2 ? `0${startArr[2]}` : startArr[2]
  dateObj.start = `${startY}-${startM}-${startD}`
  return dateObj
}
