'use strict'
import {babel} from '@rollup/plugin-babel'
import alias from '@rollup/plugin-alias'
import path from 'path'

export const builds = {
    "esm": {
        entry: "src/index.js",
        output: name => `dist/${name}.js`,
        format: "esm",
        plugins: []
    }
}
const getConfig = (name) => {
    const opts = builds[name]
    const config = {
        input: opts.entry,
        external: opts.external || [],
        output: {
            file: opts.output(`bundle-${name}`),
            format: opts.format,
            name: opts.name || 'utils'
        },
        plugins: [
            alias({
                entries: [
                    {find: '@', replacement: path.resolve('src')}
                ]
            })
        ]
            .concat((opts.plugins || []))
            .concat([
                babel({
                    exclude: ['node_modules/**']
                })
            ])
    }
    return config
}
export default Object.keys(builds).map(getConfig)

