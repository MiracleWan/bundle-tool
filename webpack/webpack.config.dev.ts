const webpackMerge = require('webpack-merge')
const commonConfig = require('./webpack.config.common.js')
import devServe from './devServer'
import rules from './lodaer'
import plugin from './plugin'

var devconfig = {
    // 区分环境
    mode: "development",

    //source-map
    devtool: "cheap-module-source-map",

    //启动本地服务
    devServer: devServe,

    //loader作为webpack的模块解析
    module: {
        rules: rules()
    },
    //plugin 可以在webpack运⾏到某个阶段的时候，帮你做⼀些事情，类似于⽣命周期的概念
    plugins: plugin(),
}
console.log("devconfig===", devconfig);
module.exports = webpackMerge.merge(commonConfig, devconfig)


