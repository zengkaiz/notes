const PENDDING = 'PENDDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'
class Promise {
    constructor(exector) {
        // 成功后的返回值
        this.value = undefined
        // 失败的返回原因
        this.reason = undefined
        // 初始化为初始态
        this.status = PENDDING
        // 存储成功时需要执行的事件的数组
        this.onResolvedCallbacks = []
        // 存储失败时需要执行的事件的数组
        this.onRejectedCallbacks = []
        // 成功的执行函数
        let resolve = (value)=>{
            // 只有在状态为pendding时可以改变为成功态
            if(this.status === PENDDING){
                this.status = FULFILLED
                this.value = value
                // 发布存储的成功后需要执行的回调
                this.onResolvedCallbacks.forEach(fn=>fn())
            }
       }
        // 失败的执行函数
        let reject = (reason)=>{
            // 只有在状态为pendding时可以改变为失败态
            if(this.status === PENDDING){
                this.status = REJECTED
                this.reason = reason
                // 发布存储的失败后需要执行的回调
                this.onRejectedCallbacks.forEach(fn=>fn())
            }
        }
        exector(resolve,reject)
    }
    then(onFulfilled, onRejected) {
        let newPromise = new Promise((resolve, reject)=>{
            // 状态是成功态的时候执行成功的回调onFulfilled
            if(this.status === FULFILLED){
                onFulfilled(this.value)
            }
            // 状态是失败态的时候执行失败的回调onRejected
            if(this.status === REJECTED){
                onRejected(this.reason)
            }
            // 状态是初始态PENDDING时
            if(this.status === PENDDING){
                // 订阅成功后需要执行的回调
                this.onResolvedCallbacks.push(()=>{
                    onFulfilled(this.value)
                })
                // 订阅失败后需要执行的回调
                this.onRejectedCallbacks.push(()=>{
                    onRejected(this.reason)
                })
            }
        })
        return newPromise
    }
}
module.exports = Promise