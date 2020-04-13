// 生成器 生成迭代器的

// function * read() {`// 生成器函数`
//     yield 1
//     yield 2
//     yield 3
// }

// let it = read()  // iterator 迭代器
// console.log(it.next())
// console.log(it.next())



// 将类数组转化成数组   类数组：1.索引 2.长度
function add() {
  // ...或者for of迭代数组必须提供一个生成器
  console.log([
    ...{
      0: 1,
      1: 2,
      length: 2,
      [Symbol.iterator]: function *(){
          let index = 0
          while (index !== this.length) {
            yield this[index++]
          }
      }
    //   [Symbol.iterator]() {
    //     let len = this.length
    //     let index = 0
    //     return {
    //       next:()=> {
    //         return { value: this[index++], done: index === len+1 };
    //       }
    //     };
    //   }

    }
  ]);
}

add(1, 2, 3, 4, 5);


// function * read(){
//     try{
//         let a= yield 1
//         console.log(a)
//         let b= yield 2
//         console.log(b)
//         let c= yield 3
//         console.log(c)
//     }catch(e){
//         console.log(e)
//     }
    
// }
// let it = read()
// console.log(it.next('1'))   // 第一次next参数没有任何意义
// console.log(it.next('100'))
// it.throw('err')


const fs = require('fs').promises
// // const co = require('co')

// function * read(){
//     let content = yield fs.readFile('./name.txt', 'utf8')
//     let age = yield fs.readFile(content, 'utf8')
//     let age1 = yield {age:age+10}
//     return age1
// }

// // co核心原理,参数是个iterator
// function co(it){
//     // 首先它返回的是一个promise
//     return new Promise((resolve, reject)=>{
//         // 异步迭代需要先提供一个next方法
//         function next(data){
//             let {value,done} = it.next(data)
//             if(!done){
//                 // value不一定是promise，用Promise.resolve()包装成promise
//                 Promise.resolve(value).then(data=>{
//                     next(data)
//                 },err=>{
//                     reject(err)
//                 })
//             }else{
//                 resolve(value)
//             }
//         }
//         next()
//     })
// }

// co(read()).then(data=>{
//     console.log(data)   // co特点 传入的是个generator，输出的是个promise
// })


// async + await 其实是generator + co的语法糖
async function read(){  // async返回的是promise
    let content = await fs.readFile('./name.txt', 'utf8')
    let age = await fs.readFile(content, 'utf8')
    let age1 = await {age:age+10}
    return age1
}
read().then(data=>{
    console.log(data)
},err=>{
    console.log(err)
})