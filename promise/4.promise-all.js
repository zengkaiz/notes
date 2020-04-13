let fs = require('fs').promises

const isPromise = value =>{
    if((typeof value === 'object' && value !== null) || typeof value === 'function'){
        return true
    }
    return false 
}

Promise.all = (promises)=>{
    return new Promise((resolve, reject) =>{
        let arr = []
        let i = 0
        let processData = (index, data)=>{
            arr[index] = data // 将数据放到数组中，当成功的数量和传入的数量相等的时候，将数据抛出去即可
            if(++i === promises.length){
                resolve(arr)
            } 
        }
        for(let i=0; i<promises.length; i++){
            let current = promises[i]
            if(isPromise(current)){
                current.then(data=>{
                    processData(i, data)
                },reject)
            } else {
                processData(i, current)
            }
        }
    })
}


// Promise.all 是按照固定顺序执行的 全部完成算完成，如果有一个失败就失败
Promise.all([fs.readFile('./name.txt', 'utf8'),fs.readFile('./age.txt', 'utf8')]).then(data=>{
    console.log(data)
})


