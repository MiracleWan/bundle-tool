const path = require('path')
export default {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
}
