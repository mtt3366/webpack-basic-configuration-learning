import plus from './test.js'
// import './index.css'
// import sum from './sum'
// console.log(sum)

let op = document.createElement('p')
op.innerHTML = plus(10,5)
document.body.appendChild(op)
if(module.hot){
    module.hot.accept('./test',()=>{
        let plus = require('./test').default
        op.innerHTML = plus(20,5)
    })
}