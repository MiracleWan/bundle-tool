const fs = require('fs')
// @ts-ignore
const path = require('path')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const {transformFromAst} = require('@babel/core')
module.exports = class webpack {
    private entry: any;
    private output: any;
    private modules: any[];

    /**
     * @summar 获取相关的webpack 的配置
     * @param options
     */
    constructor(options: { entry: any; output: any }) {
        const {entry, output} = options
        this.entry = entry
        this.output = output
        this.modules = []
    }


    /**
     * @summary webpack的执行函数
     */
    run() {
        // 获取当前入口文件分析代码
        const info = this.parse(this.entry)

        //递归分析内部模块代码
        this.modules.push(info)
        for (let i = 0; i < this.modules.length; i++) {
            const item = this.modules[i]
            const {dependencies} = item
            if (dependencies) {
                for (let j in dependencies) {
                    this.modules.push(this.parse(dependencies[j]))
                }
            }

        }

        // 数组转成对象
        const obj = {}

        this.modules.forEach((item) => {
            // @ts-ignore
            obj[item.entryFile] = {
                dependencies: item.dependencies,
                code: item.code
            }
        })

        this.file(obj)
    }

    /**
     * @summary 代码解析函数
     * @param entryFile
     * @return {{code, entryFile, dependencies: {}}}
     */
    parse(entryFile: any) {

        const dependencies = {}
        //开始的借助fs 读取入口文件
        const content = fs.readFileSync(entryFile, 'utf-8')

        const ast = parser.parse(content, {sourceType: "module"})

        // 提取语法树上的import 模块的路径组成对象关系。
        traverse(ast, {
            // @ts-ignore
            ImportDeclaration({node}) {
                const newPathName = './' + path.join(path.dirname(entryFile), node.source.value)
                // @ts-ignore
                dependencies[node.source.value] = newPathName
            }
        })

        // 通过babel转换当前代码
        const {code} = transformFromAst(ast, null, {presets: ['@babel/preset-env']})


        return {
            entryFile,
            dependencies,
            code
        }
    }

    /**
     * @summary 生成启动器函数
     * @param code
     */
    file(code: {}) {

        // 创建自运行函数，处理require，module，exports
        // 生成main.js => dist/main.ts
        const fielePath = path.join(this.output.path, this.output.filename)

        // 生成对应的函数启动器
        const bundle = `(function (graph){
           function require(module){
              function reRequire(relativePath){
                 return require(graph[module].dependencies[relativePath])
              }
              var exports = {};
              (function(require,exports,code){
                 eval(code)
              })(reRequire,exports,graph[module].code,)
             
              return exports;
           }
           require('${this.entry}')
        })(${JSON.stringify(code)})`


        fs.writeFileSync(fielePath, bundle, 'utf-8')
    }
}
