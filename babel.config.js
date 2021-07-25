module.exports = {
    //语法转换插件 preset-env
    presets: [
        [
            "@babel/preset-env",
            {
                targets: {
                    "browsers": [
                        "> 1%",
                        "last 2 versions",
                        "Android >= 3.2",
                        "Firefox >= 20",
                        "iOS 7"
                    ],
                },
                corejs: 3,
                useBuiltIns: "usage",
            },
        ],
        "@babel/preset-react",
        "@babel/preset-typescript"
    ],
    plugins: [
        "@babel/proposal-class-properties",
        "@babel/proposal-object-rest-spread",
        [
            "@babel/plugin-transform-runtime",
            {
                "corejs": 3,
                "helpers": true,
                "regenerator": true,
                "useESModules": false
            }
        ]
    ]
};
