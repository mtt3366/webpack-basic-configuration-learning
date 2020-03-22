// import plus from './test.js'
// import './index.css'
// import sum from './sum'
// console.log(sum)

let op = document.createElement('p')
document.body.appendChild(op)
// if(module.hot){
//     module.hot.accept('./test',()=>{
//         let plus = require('./test').default
//         op.innerHTML = plus(20,5)
//     })
// }

let button = document.createElement('button')
button.innerHTML = '按钮'
document.body.appendChild(button)

//懒加载,点击之后才动态加载文件
button.addEventListener('click',function () {
    import(/*webpackPreload:true*/'./test').then(({default:m})=>{//将default重命名为m
        op.innerHTML = m(20,10)
    })
})