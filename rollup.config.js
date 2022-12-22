'use strict'
import babel from 'rollup-plugin-babel'

export const builds = {
    'cjs': {
        entry: "src/index.js",
        output: name => `dist/${name}.js`,
        format: "cjs",
        plugins: [
            babel({
                exclude: ['node_modules/**']
            })
        ]
    },
    "esm": {
        entry: "src/index.js",
        output: name => `dist/${name}.js`,
        format: "esm",
        plugins: [
            babel({
                exclude: ['node_modules/**']
            })
        ]
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
        plugins: [].concat((opts.plugins || []))
    }
    return config
}
export default Object.keys(builds).map(getConfig)

