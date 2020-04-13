// promise 是个类
let Promise = require('./promise')
let p = new Promise((resolve, reject)=>{
    // setTimeout(()=>{
    //     resolve("我就有钱")    // 同步的时候直接触发，异步的时候发布订阅
        //  throw new Error('失败')
    // }, 1000)
    resolve("我就有钱")   
})
p.then(data=>{
    console.log("success"+ data)
}, err => {
    console.log("error"+ err)
})
p.then(data=>{
    console.log("success"+ data)
}, err => {
    console.log("error"+ err)
})
p.then(data=>{
    console.log("success"+ data)
}, err => {
    console.log("error"+ err)
})