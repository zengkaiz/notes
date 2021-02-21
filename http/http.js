// 通过node实现一个http服务  需要http模块支持
const http = require('http')
const url = require('url')
const querystring = require('querystring')

let server = http.createServer()
let port = 3000


server.listen(port, ()=>{
    console.log(`server start ${port}`)
})

server.on('error', (err)=>{
    if(err.errno === 'EADDRINUSE') {
        server.listen(++port)
    }
})

// 收到请求，需要解析请求
server.on('request', (req, res)=>{
    // req代表的是客户端
    // res代表服务端

    // 1.请求行
    console.log(req.method)  // 方法名大写
    let {pathname, query} = url.parse(req.url, true)
    console.log(pathname, query)    // 请求路径

    // 2.请求头
    console.log(req.headers)

    // 3.请求体
    let arr = []
    req.on('data', function(chunk){
        arr.push(chunk)             // data方法不一定会触发
        console.log(chunk)
        console.log(111)
    })
    req.on('end', function(){
        console.log('end')          // end一定触发

        // 处理响应
        res.statusCode = 404
        // res.setHeader('Content-Length', '5')
        res.setHeader('Content-Type', 'text/plain;charset=utf-8')
        let content = Buffer.concat(arr).toString()
        let type = req.headers['content-type']
        if(type === 'application/json') {
            let obj = JSON.parse(content)
            return res.end(obj.a+'')
        } else if(type === 'application/x-www-form-urlencoded') {
            let obj = querystring.parse(content)
            return res.end(obj.a+'')
        } else {
            return res.end(content)
        }
        
    })
})