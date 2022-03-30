/*
 * @Descripttion:
 * @version:
 * @Author: Gou xuefei
 * @Email:
 * @Date: 2022-03-30 14:19:10
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-03-30 14:56:27
 */
import baseConfig from './rollup.config.base'
import filesize from 'rollup-plugin-filesize'

export default {
  ...baseConfig,
  plugins: [...baseConfig.plugins, filesize()],
}
