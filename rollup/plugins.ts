import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import {terser} from "rollup-plugin-terser";
import postcss from "rollup-plugin-postcss";
import typescript from '@rollup/plugin-typescript';
//@ts-ignore
import url from '@rollup/plugin-url';

const path = require('path')


export default [
    resolve({
        extensions: ['.js', '.ts', '.jsx', '.tsx']

    }), // so Rollup can find `ms`
    commonjs(), // so Rollup can convert `ms` to an ES module
    /**
     * @summary 兼容处理
     */
    babel({
        presets: [
            [
                "@babel/preset-env",
                {
                    targets: {
                        "browsers": "> 0.25%, not op_mini all, not dead, IE 10-11",
                    },
                    corejs: 2,
                    useBuiltIns: "usage",
                    "modules": false,
                },
            ],
        ],

        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
        extensions: ['.js', '.ts', '.jsx', '.tsx']

    }),
    /**
     * @summary 文件处理
     */
    url({
        fileName: '[dirname][hash][extname]',
        sourceDir: path.join(__dirname, 'src')
    }),

    /**
     * typescript 配置
     */
    typescript({ module: "ESNext" ,sourceMap: false}),
    /**
     * @summary js压缩处理
     */
    terser(),
    /**
     * @summary css压缩统一处理
     */
    postcss({
        plugins: [
            require('autoprefixer')({overrideBrowserslist: ['> 0.15% in CN']}) // 自动添加css前缀
        ],
        extract: path.resolve('rollup-dist/index.css'),
        minimize: true
    }),
]
