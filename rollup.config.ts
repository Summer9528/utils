'use strict'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import alias from '@rollup/plugin-alias'
import path from 'node:path'
import commonjs from '@rollup/plugin-commonjs'
import { readFileSync } from 'node:fs'
import typescript from '@rollup/plugin-typescript'
import { fileURLToPath } from 'node:url'
import { defineConfig, RollupOptions } from 'rollup'
import dts from 'rollup-plugin-dts'
const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url)).toString())
const __dirname = fileURLToPath(new URL('.', import.meta.url))
function resolve(p, dirname = __dirname) {
  return path.resolve(dirname, p)
}
function getConfig(moduleName: string): RollupOptions {
  return defineConfig({
    input: resolve(`src/${moduleName}/index.ts`),
    output: [
      {
        file: resolve('dist/es/index.js'),
        format: 'es'
      },
      {
        file: resolve('dist/cjs/index.js'),
        format: 'cjs'
      }
    ],
    plugins: [
      nodeResolve(),
      typescript({
        tsconfig: resolve('./tsconfig.json')
      }),
      alias({
        entries: [
          { find: '@', replacement: resolve('src') }
        ]
      }),
      commonjs(),
    ],
    external: []
  })
}
const classesConfig = getConfig('classes')
const objectConfig = getConfig('object')
const dtsConfig = defineConfig({
  input: resolve('src/index.ts'),
  output: [
    {
      file: resolve('dist/index.d.ts'),
      format: 'es',
    }
  ],
  plugins: [
    alias({
      entries: [
        { find: '@', replacement: resolve('src') }
      ]
    }),
    dts()
  ]
})
export default [classesConfig, objectConfig]
