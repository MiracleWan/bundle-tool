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

            // 抽离公共代码
            cacheGroups: {
                // 将node_modules 中的代码抽离出来
                vender: {
                    name: 'vender',
                    priority: 1,
                    test: /node_modules/,
                    // 可以根据实际情况自行定义
                    minSize: 0, // 大小限制
                    minChunks: 1 //最少复用过几次
                },
                common:{
                    name:'common',
                    priority: 0,
                    // 可以根据实际情况自行定义
                    minSize: 0, // 大小限制
                    minChunks: 1 //最少复用过几次
                }
            }
        },
        concatenateModules: true,
    },

    // 减少查找过程
    // 例如： react: "./node_modules/react/umd/react.production.min.js",
    resolve: {
        extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'],
        mainFields:['jsnext:main','browser','main']
    },
    // webpack5 修改默认输出方式
    target: ['web', 'es5'],
}
