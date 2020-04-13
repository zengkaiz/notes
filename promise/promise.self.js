// 定义promise的三个状态pendding(初始态),fulfilled(成功态),rejected(失败态)
const PENDDING = 'PENDDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'
const resolvePromise = (promise2, x, resolve, reject) => {
    if(promise2 === x){
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
    }
    // 判断x是不是promise
    if((typeof x === 'object' && x !== null) || typeof x === 'function'){
        // x可能是promise（判断是否有.then方法）
        let called
        try{
            let then = x.then
            if(typeof then === 'function'){
                then.call(x, (y)=>{
                    if(called)return
                    called = true
                    resolvePromise(promise2, y, resolve, reject)
                }, (r)=>{
                    if(called)return
                    called = true
                    reject(r)
                })
            }
        }catch(e){
            if(called)return
            called = true
            reject(e)
        }
    }else{
        // x不是promise
        resolve(x)
    }
}

class Promise {
    constructor(actuator){
        // 成功返回的结果
        this.value = undefined
        // 失败返回的原因
        this.reason = undefined
        // promise的状态
        this.status = PENDDING
        this.resolveCallbacks = []
        this.rejectCallbacks = []
        // 成功执行的方法
        let resolve = (value)=>{
            if(value instanceof Promise){
                value.then(resolve, reject)
            }
            if(this.status === PENDDING){   // 只有在初始状态penning的时候可以改变状态
                this.value = value
                this.status = FULFILLED
                this.resolveCallbacks.forEach(val=>val())
            } 
        }
        // 失败执行的方法
        let reject = (reason)=>{
            if(this.status === PENDDING){   // 只有在初始状态penning的时候可以改变状态
                this.reason = reason
                this.status = REJECTED
                this.rejectCallbacks.forEach(val=>val())
            }
        }
        try{
            actuator(resolve, reject)
        }catch(e){
            reject(e)
        }
        
    }
    then(onFulfilled, onRejected){
        // 每个promise都有一个then方法,此方法有两个可选参数onFulfilled，onRejected,没传的话给默认参数
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val=>val
        onRejected = typeof onRejected === 'function' ? onRejected : err => {throw err}
        let promise2 = new Promise((resolve, reject)=>{
            if(this.status === FULFILLED){
                setTimeout(()=>{
                    try{
                        let x = onFulfilled(this.value)
                        resolvePromise(promise2, x, resolve, reject)
                    }catch(e){
                        reject(e)
                    }     
                })
            }
            if(this.status === REJECTED){
                setTimeout(()=>{
                    try{
                        let x = onRejected(this.reason)
                        resolvePromise(promise2, x, resolve, reject)
                    }catch(e){
                        reject(e)
                    }
                })        
            }
            if(this.status === PENDDING){
                this.resolveCallbacks.push(()=>{
                    setTimeout(()=>{
                        try{
                            let x = onFulfilled(this.value)
                            resolvePromise(promise2, x, resolve, reject)
                        }catch(e){
                            reject(e)
                        }
                    })   
                })
                this.rejectCallbacks.push(()=>{
                    setTimeout(()=>{
                        try{
                            let x = onRejected(this.reason)
                            resolvePromise(promise2, x, resolve, reject)
                        }catch(e){
                            reject(e)
                        }
                    })
                })
            }
        })
        return promise2
    }
    catch(errCallback){
        this.then(null,errCallback)
    }
}

Promise.deferred = function(){
    let dfd = {}
    dfd.promise = new Promise((resolve,reject)=>{
        dfd.resolve = resolve
        dfd.reject = reject
    })
    return dfd
}

module.exports = Promise