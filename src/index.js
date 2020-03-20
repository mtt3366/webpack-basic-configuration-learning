// import sum1 from './sum'
// import './index.css'
// import './a.less'
// import './icon/iconfont.css'
// console.log(sum1(1,2))
//
// import imgUrl from './p.jpg'
// let oImg = new Image()
// oImg.src = imgUrl
// document.body.appendChild(oImg)
//
// let i = document.createElement('i')
// i.className = 'iconfont icon-iconfont-edu12'
// document.body.appendChild(i)
// console.log('zhufeng'.includes('g'))
//
// //草案,装饰器,语法糖
// @fn//装饰器,可以操作类,给类添加属性等等
// class Son{
//     a = 1
// }
// function fn(target) {
//     target.flag = true
// }
// //
// let a  = new Son()
// console.log('Son.flag',Son.flag)
//
//
// // 将属性修饰为只读属性
// class Person{
//     @readonly
//     first = 1
// }
// function readonly(target,name,descriptor) {
//     descriptor.writable = false//不可更改
// }
// let p = new Person()
//
// let xhr = new XMLHttpRequest();
// xhr.open('get','/api/user',true)
// xhr.onreadystatechange = function () {
//     console.log(xhr.response)
// }
// xhr.send()

import sum from   './sum.js'

import $ from 'jquery'
//使用expose-loader,虽然暴露在全局,但是也要引用一下
console.log($,'----',window.$)

conso.log()