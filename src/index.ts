import pic from "./testFile/chutian.jpeg"

import '../src/testFile/font/index.css'

import '../src/testFile/cssModule/index.less'

import './testFile/cssModule/index.scss'

import {add} from './testFile/test'

import _ from 'lodash'


let pro = new Promise((resolve, reject) => {

    resolve('Es6 转换测试')
})
pro.then(res => {
    console.log("_===",_);
    console.log(res)
    console.log("add(1, 2)===", add(1, 2));
})
