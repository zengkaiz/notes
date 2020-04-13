const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'
const resolvePromise = (promise,x,resolve,reject)=>{
    if(promise === x) {
        return reject(new TypeError('自己等自己'))
    }
    //先判断是不是promise，就是判断是不是对象或者函数,在看then是不是function
    if((typeof x === 'object' && x!== null) || typeof x === 'function') {
        let called;
        try{
            let then = x.then
            if(typeof then === 'function'){
                then.call(x, (y) =>{
                    if(called)return
                    called = true
                    // y 有可能是个promise
                    resolvePromise(promise,y,resolve,reject) // 递归解析
                }, (r)=>{
                    if(called)return
                    called = true
                    reject(r)
                })
            } else {
                resolve(x)
            }
           
        }catch(e){
            if(called)return
            called = true
            reject(e)
        }
    } else {
        resolve(x)
    }
}
class Promise {
    constructor(executor) {
        // 1.每次new一个promise都需要传一个执行器，执行器是立即执行的
        this.value = undefined
        this.reason = undefined
        this.status = PENDING
        this.onResolvedCallbacks = []
        this.onRejectedCallbacks = []
        let resolve = (value) => {
            if(value instanceof Promise){
                // 如果一个promise resolve一个新的promise 会等到这个内部的promise
                return value.then(resolve, reject)
            }
            if(this.status === PENDING) {
                this.value = value 
                this.status = FULFILLED
                this.onResolvedCallbacks.forEach(fn=>fn())  // 发布 有可能resolve在then的后边执行，此时先将方法存放起来，到成功时依次之心回归这些回调
            }    
        }
        let reject = (reason) => {
            if(this.status === PENDING) {
                this.reason = reason
                this.status = REJECTED
                this.onRejectedCallbacks.forEach(fn=>fn())
            }
        }
        // 异常捕获
        try{
            executor(resolve, reject)
        }catch(e){
            reject(e)
        }
    }
    then(onFulfilled, onRejected) {
        // 可选参数，没传的话给默认参数
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled:val=>val
        onRejected= typeof onRejected === 'function' ? onRejected:err=>{throw err}
        // then方法调用以后应该返回一个新的promise
        let _Promise = new Promise((resolve, reject)=>{
            if(this.status === FULFILLED) {
                setTimeout(()=>{
                    try{
                        let x = onFulfilled(this.value)
                        resolvePromise(_Promise,x,resolve,reject)
                    }catch(e){
                        reject(e)
                    }
                })
            }
            if(this.status === REJECTED) {
                setTimeout(()=>{
                    try{
                        let x = onRejected(this.reason)
                        resolvePromise(_Promise,x,resolve,reject)
                    }catch(e){
                        reject(e)
                    }
                })
            }
            if(this.status === PENDING) {
                console.log('是不是pending了')
                this.onResolvedCallbacks.push(()=>{
                    setTimeout(()=>{
                        try{
                            let x = onFulfilled(this.value) // 订阅
                            resolvePromise(_Promise,x,resolve,reject)
                        }catch(e){
                            reject(e)
                        }
                    })
                    
                })
                this.onRejectedCallbacks.push(()=>{
                    setTimeout(()=>{
                        try{
                            let x = onRejected(this.reason)
                            resolvePromise(_Promise,x,resolve,reject)
                        }catch(e){
                            reject(e)
                        }
                    })   
                })
            }
        })
        return _Promise   
    }
    catch(errCallback){
        return this.then(null, errCallback)
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
// 导出当前类 commonjs定义方式
module.exports = Promise