// 类似中间层
const http = require('http')


// request 发送请求体
let config = {
    port:3001,
    hostname:'localhost',
    headers:{
    //    'Content-Type': 'application/json',
    //    'Content-Type': 'application/x-www-form-urlencoded'
    },
    method:'POST'
}
let client = http.request(config, function(res){
    res.on('data', function(chunk){
        console.log(chunk.toString())
    })
})

// 数据传输
client.end('{"a":1}')