/*
 * @Descripttion:
 * @version:
 * @Author: Gou xuefei
 * @Email:
 * @Date: 2022-03-30 14:19:10
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-03-30 14:47:09
 */
import baseConfig from './rollup.config.base'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'

export default {
  ...baseConfig,
  plugins: [
    ...baseConfig.plugins,
    serve({
      port: 8080,
      contentBase: ['lib', 'examples/brower'],
      openPage: 'index.html',
    }),
    livereload({
      watch: 'examples/brower',
    }),
  ],
}
