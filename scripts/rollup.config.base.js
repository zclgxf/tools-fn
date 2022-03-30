/*
 * @Descripttion:
 * @version:
 * @Author: Gou xuefei
 * @Email:
 * @Date: 2022-03-30 14:19:10
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-03-30 14:54:47
 */
import { nodeResolve } from '@rollup/plugin-node-resolve' // 解析 node_modules 中的模块
import commonjs from '@rollup/plugin-commonjs' // cjs => esm
import alias from '@rollup/plugin-alias' // alias 和 reslove 功能
import replace from '@rollup/plugin-replace'
import eslint from '@rollup/plugin-eslint'
import { babel } from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'
import clear from 'rollup-plugin-clear'
import { name, version, author, license } from '../package.json'

const pkgName = 'tools-fn'
const banner =
  '/*!\n' +
  ` * ${name} v${version}\n` +
  ` * (c) 2020-${new Date().getFullYear()} ${author}\n` +
  ` * Released under the ${license} License.\n` +
  ' */'

export default {
  input: 'package/index.js',
  output: [
    {
      file: `lib/${pkgName}.umd.js`,
      format: 'umd',
      name: pkgName,
      banner,
    },
    {
      file: `lib/${pkgName}.umd.min.js`,
      format: 'umd',
      name: pkgName,
      banner,
      plugins: [terser()],
    },
    {
      file: `lib/${pkgName}.cjs.js`,
      format: 'cjs',
      name: pkgName,
      banner,
    },
    {
      file: `lib/${pkgName}.esm.js`,
      format: 'es',
      banner,
    },
  ],
  plugins: [
    clear({
      targets: ['lib'],
    }),
    alias(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'development'
      ),
      preventAssignment: true,
    }),
    nodeResolve(),
    commonjs({
      include: 'node_modules/**',
    }),
    eslint({
      throwOnError: true, // 抛出异常并阻止打包
      include: ['package/**'],
      exclude: ['node_modules/**'],
    }),
    babel({ babelHelpers: 'bundled' }),
  ],
}
