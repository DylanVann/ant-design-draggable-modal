import typescript from 'rollup-plugin-typescript2'
import commonjs from 'rollup-plugin-commonjs'
import autoExternal from 'rollup-plugin-auto-external'
import resolve from 'rollup-plugin-node-resolve'
import json from 'rollup-plugin-json'
import postcss from 'rollup-plugin-postcss'
import filesize from 'rollup-plugin-filesize'

import pkg from './package.json'

export default {
    input: 'src/index.ts',
    output: [
        {
            file: pkg.main,
            format: 'cjs',
            exports: 'named',
            sourcemap: true,
        },
        {
            file: pkg.module,
            format: 'es',
            exports: 'named',
            sourcemap: true,
        },
    ],
    plugins: [
        json(),
        autoExternal(),
        postcss({
            extract: true,
        }),
        resolve(),
        typescript({
            rollupCommonJSResolveHack: true,
            clean: true,
            abortOnError: false,
        }),
        commonjs(),
        filesize(),
    ],
}
