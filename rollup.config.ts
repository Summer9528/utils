'use strict'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import alias from '@rollup/plugin-alias'
import path from 'node:path'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import { fileURLToPath } from 'node:url'
import { defineConfig, RollupOptions, OutputOptions } from 'rollup'
import dts from 'rollup-plugin-dts'
const __dirname = fileURLToPath(new URL('.', import.meta.url))
function resolve(p: string, dirname: string = __dirname) {
  return path.resolve(dirname, p)
}
enum ModuleName {
  'object' = 'object',
  'classes' = 'classes',
  'node' = 'node'
}
function getOutputs(moduleName: ModuleName, isDec: boolean = false): OutputOptions[] {
  const suffix = isDec ? 'd.ts' : 'js'
  return [
    {
      file: resolve(`dist/es/${moduleName}/index.${suffix}`),
      format: 'es',
    },
    {
      file: resolve(`dist/umd/${moduleName}/index.${suffix}`),
      format: 'umd',
      name: 'Utils'
    },
    {
      file: resolve(`dist/cjs/${moduleName}/index.${suffix}`),
      format: 'cjs',
    },
  ]
}
function getDeclarationConfig(moduleName: ModuleName): RollupOptions {
  return defineConfig({
    input: resolve(`src/${moduleName}/index.ts`),
    output: getOutputs(moduleName, true),
    plugins: [
      alias({
        entries: [
          { find: '@', replacement: resolve('src') }
        ]
      }),
      dts()
    ]
  })
}
function getConfigs(moduleName: ModuleName): [RollupOptions, RollupOptions] {
  const d = getDeclarationConfig(moduleName)
  const c = defineConfig({
    input: resolve(`src/${moduleName}/index.ts`),
    output: getOutputs(moduleName),
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
  return [c, d]
}
const classesConfig = getConfigs(ModuleName.classes)
const objectConfig = getConfigs(ModuleName.object)
export default [...classesConfig, ...objectConfig]
