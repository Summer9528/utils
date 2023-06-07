'use strict'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { babel } from '@rollup/plugin-babel'
import alias from '@rollup/plugin-alias'
import path from 'node:path'
import commonjs from '@rollup/plugin-commonjs'
import { readFileSync } from 'node:fs'
const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url)).toString())
export default [
  {
    input: 'src/index.js',
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
      alias({
        entries: [
          { find: '@', replacement: path.resolve('src') }
        ]
      }),
      nodeResolve(),
      commonjs(),
      babel()
    ]
  }
]
