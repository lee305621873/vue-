var express=require("express")
var path = require('path')
var bodyParser=require('body-parser')
var router=require('./router')
 var app=express()

 app.use('/node_modules/', express.static(path.join(__dirname, './node_modules/')))
 app.engine('html', require('express-art-template'))
 app.set('views', path.join(__dirname, './views/'))

app.use(bodyParser.urlencoded({
    extended: false
}))
 // parse application/json
 app.use(bodyParser.json())
 // 配置一个处理 404 的中间件
app.use(router)
 app.use(function (req, res) {
     res.render('404.html')
 })

 // 配置一个全局错误处理中间件
 app.use(function (err, req, res, next) {
     res.status(500).json({
         err_code: 500,
         message: err.message
     })
 })
 
 app.listen(4000, function () {
     console.log('running...')
 })