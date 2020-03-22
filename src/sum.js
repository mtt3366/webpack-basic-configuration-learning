// //esModule es6模块化方法  import  export
// //commonJS node模块化方法 require module.exports
// //草案,装饰器,语法糖
//
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
// const sum = (a, b)=>{
//     return a+b
// }
//
// console.log($$)
// // export {sum}//引入模块只能叫sum
// export default sum;//默认导出,引入的时候可以给模块起名
let a = 1
let b = 2
let c = 3
let d = a+b+c
export default d