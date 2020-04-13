let fs = require('fs')

// 回调地域
// fs.readFile('./name.txt','utf8',(err,data)=>{
//     if(err){
//        return 
//     }
//     fs.readFile(data,'utf8',(err,data)=>{
//         if(err){
//            return 
//         }
//         console.log(data)
//     })
// })

// 如果需要改造成promise，就先将回调的方法改造成promise
// function readFile(...args){
//     return new Promise((resolve, reject)=>{
//         fs.readFile(...args,function(err, data){
//             if(err)reject(err)
//             resolve(data)
//         })
//     })
// }
// 链式调用 如果返回一个普通值 会走下一个then的成功
// 抛出错误执行then的失败方法
// 如果是promise 就让promise执行采用他的状态
// 返回了一个新的promise来实现链式调用
// readFile('./name.txt', 'utf8').then(data=>{
//     return readFile(data, 'utf8')
// }, err =>{
//     console.log(err)
// }).then(data=>{
//     console.log(data)
// }, err =>{
//     console.log(err)
// })
