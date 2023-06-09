'use strict'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import alias from '@rollup/plugin-alias'
import path from 'node:path'
import commonjs from '@rollup/plugin-commonjs'
import { readFileSync } from 'node:fs'
import typescript from '@rollup/plugin-typescript'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'rollup'
const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url)).toString())
const __dirname = fileURLToPath(new URL('.', import.meta.url))
const c = defineConfig({
  input: 'src/index.ts',
  output: [
    {
      file: pkg.module,
      format: 'es'
    },
    {
      file: pkg.main,
      format: 'cjs'
    }
  ],
  plugins: [
    nodeResolve(),
    typescript({
      tsconfig: path.resolve(__dirname, './tsconfig.json')
    }),
    alias({
      entries: [
        { find: '@', replacement: path.resolve(__dirname, 'src') }
      ]
    }),
    commonjs(),
  ],
  external: []
})
export default [c]
