import sum1 from './sum'
import './index.css'
import './a.less'
import './icon/iconfont.css'
console.log(sum1(1,2))

import imgUrl from './p.jpg'
let oImg = new Image()
oImg.src = imgUrl
document.body.appendChild(oImg)

let i = document.createElement('i')
i.className = 'iconfont icon-iconfont-edu12'
document.body.appendChild(i)
console.log('zhufeng'.includes('g'))