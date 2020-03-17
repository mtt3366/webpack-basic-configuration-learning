//esModule es6模块化方法  import  export
//commonJS node模块化方法 require module.exports

function sum(a, b) {
    return a+b
}
// export {sum}//引入模块只能叫sum
export default sum;//默认导出,引入的时候可以给模块起名