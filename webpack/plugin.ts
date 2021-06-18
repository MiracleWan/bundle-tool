const htmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 已经被5。x 废弃
// const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const webpack = require("webpack");

export default function () {
    //清除上次打包内容
    const commonList = [new CleanWebpackPlugin()]
    var returnList = []
    const productionList = [
        //生成入口Html
        new htmlWebpackPlugin({
            title: "打包工具",
            template: './src/index.html',
            minify: {
                // 压缩HTML⽂件
                removeComments: true, // 移除HTML中的注释
                collapseWhitespace: true, // 删除空⽩符与换⾏符
                minifyCSS: true // 压缩内联css
            }
        }),


        new MiniCssExtractPlugin({
            filename: "css/[name]-[contenthash:8].css",
        }),
        new CssMinimizerPlugin({
            minimizerOptions: {
                preset: [
                    'default',
                    {
                        discardComments: {removeAll: true},
                    },
                ],
            },
        }),
    ]
    const devList = [
        new htmlWebpackPlugin({
            //选择html模板
            title: "打包工具",
            template: "./src/index.html",
            filename: "index.html",
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name]-[contenthash:8].css",
        }),

        new webpack.HotModuleReplacementPlugin(),
    ]

    if (process.env.NODE_ENV === 'dev') returnList = commonList.concat(devList)
    if (process.env.NODE_ENV === 'production') returnList = commonList.concat(productionList)
    return returnList

}
