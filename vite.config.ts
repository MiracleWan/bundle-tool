import {defineConfig} from "vite";
import path from 'path'
import legacy from '@vitejs/plugin-legacy'

console.log("123123123", path.join(__dirname, "../dist"));
export default defineConfig({
    root: './vite',
    plugins: [
        legacy({
            targets: ['defaults', 'not IE 11']
        })
    ],

    base: './',

    build: {
        target: 'modules',
        outDir: path.join(__dirname, "./vite-dist"), //指定输出路径
        assetsDir: 'assets', // 指定生成静态资源的存放路径
        minify: 'terser', // 混淆器，terser构建后文件体积更小
        cssCodeSplit: true, //启用/禁用 CSS 代码拆分。当启用时，在异步 chunk 中导入的 CSS 将内联到异步 chunk 本身，并在块加载时插入。
    },
})
