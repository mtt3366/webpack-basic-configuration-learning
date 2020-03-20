const express = require('express')
const app = express()
app.get('/user',function (req, res) {
    console.log(req.headers)
    res.json({name:'mtt'})
})
app.listen(8000,function () {
    console.log('8000端口已启动')
})