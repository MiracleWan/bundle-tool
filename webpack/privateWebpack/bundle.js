const options = require('./webpack.config')
const webpack = require('./lib/webpack.js')

new webpack(options).run()
