const Promise = require('./promise.md')

let p = new Promise((resolve, reject) =>{
    resolve('hello')
})

let promise2 = p.then(data=>{
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(new Promise((resolve, reject)=>{
                setTimeout(()=>{
                    reject('22') 
                },1000)
            }))
        },1000)
    })
}) 

promise2.then(data=>{
    console.log(data)
    // throw new Error('error')
}).catch(err=>{
    console.log(err+'err')
})

// const p = new Promise((resolve,reject)=>{
//     resolve(new Promise((resolve,reject)=>{
//         setTimeout(()=>{
//             resolve('hello')
//         },1000)
//     }))
// }).then(data=>{
//     console.log(data)
// }).catch(err=>{
//     console.log(err+'err')
// })