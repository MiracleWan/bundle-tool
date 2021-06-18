const options = require('./webpack.config.ts')
const webpack = require('./lib/webpack.ts')

new webpack(options).run()
