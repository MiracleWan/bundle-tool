const webpackMerge = require('webpack-merge')
import commonConfig from './webpack.config.common'

import rules from './lodaer'
import plugin from './plugin'
var production = {
    // 区分环境
    mode: "production",

    //loader作为webpack的模块解析
    module: {
        rules: rules()
    },

    //plugin 可以在webpack运⾏到某个阶段的时候，帮你做⼀些事情，类似于⽣命周期的概念
    plugins: plugin(),
}
module.exports = webpackMerge.merge(commonConfig, production)
