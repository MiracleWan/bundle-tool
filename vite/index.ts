import pic from '../src/testFile/chutian.jpeg'

import '../src/testFile/font/index.css'

import '../src/testFile/cssModule/index.less'

import '../src/testFile/cssModule/index.scss'

import {add} from '../src/testFile/test'


let pro = new Promise((resolve, reject) => {

    resolve('Es6 转换测试')
})
pro.then(res => {
    console.log(res)
    console.log("add(1, 2)===", add(1, 2));
})
