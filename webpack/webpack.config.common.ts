import path from 'path'

export default {

    // 入口
    entry: "./src/index",

    // 出口
    output: {
        path: path.resolve(__dirname, '../webpack-dist'),
        filename: "[name].js"
    },
    optimization: {
        usedExports: true, // 哪些导出的模块被使用了，再做打包
        splitChunks: {
            chunks: "all",//默认是⽀持异步，我们使⽤all
        },
        concatenateModules: true,
    },

    // 减少查找过程
    // 例如： react: "./node_modules/react/umd/react.production.min.js",
    resolve: {
        extensions: ['.js', '.json', '.jsx', '.ts', '.tsx']
    },
}
