const MiniCssExtractPlugin = require("mini-css-extract-plugin");
export default function () {

    const commonList = [
        // 图片的处理loader
        {
            test: /\.(png|jpe?g|gif)$/,
            use: {
                loader: "url-loader",
                options: {
                    name: "[name]_[hash:6].[ext]",
                    outputPath: "images/",
                    //推荐使用url-loader 因为url-loader支持limit
                    //推荐小体积的图片资源转成base64
                    limit: 12 * 1024, //单位是字节 1024=1kb
                },
            },
        },
        // 字体处理的load
        {
            test: /\.(eot|ttf|woff|woff2|svg)$/,
            use: {
                loader: "file-loader",
                options: {
                    outputPath: 'font/'
                }
            }
        },
        // css处理的loader
        {
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader'
            ]
        },
        // less处理的loader
        {
            test: /\.less$/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: "css-loader",
                    options: {
                        //css modules 开启
                        modules: true,
                    }
                },
                {
                    loader: "postcss-loader",
                },
                "less-loader"
            ]
        },
        // sass处理的loader
        {
            test: /\.scss$/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: "css-loader",
                    options: {
                        //css modules 开启
                        modules: true,
                    }
                },
                {
                    loader: "postcss-loader",
                },
                "sass-loader"
            ]
        },
        // stylus处理的loader
        {
            test: /\.stylus$/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: "css-loader",
                    options: {
                        //css modules 开启
                        modules: true,
                    }
                },
                {
                    loader: "postcss-loader",
                },
                "stylus-loader"]
        },
        // babel处理js的loader
        {
            test: /\.(js|jsx|tsx|ts)$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        },
    ]
    var returnList = []
    const devList = []
    const productionList = []
    if (process.env.NODE_ENV === 'dev') returnList = commonList.concat(devList)
    if (process.env.NODE_ENV === 'production') returnList = commonList.concat(productionList)
    return returnList
}
