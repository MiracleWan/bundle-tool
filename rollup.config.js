import plugins from "./rollup/plugins.ts";

import format from './rollup/format.ts'


export default (function () {
    return format.map((item) => {
        return {
            input: 'src/main.ts',
            output: {
                name: item.name,
                file: `rollup-dist/${item.name}`,
                format: item.format,
            },
            plugins: plugins
        }
    })
})()
