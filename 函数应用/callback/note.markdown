
### 函数应用
###### 高阶函数

1. 一个函数的参数是一个函数 （回调）
2. 一个函数返回一个函数 （拆分函数）

###### promise
###### 解决的问题

###### 解决并发问题 （同步多个异步方法的执行结果）
1. 每次new一个promise都需要传一个执行器，执行器(exector)是立即执行的
2. 执行器函数中有两个参数 resolve reject、
3. 默认promise有三个状态 pendding  => resolve 成功fulfilled, reject 失败 rejected
4. 如果一旦成功了，不能变成失败；一旦失败了，不能变成成功；只有当前状态是penning的时候可以改变状态
5. 每个promise都有一个then方法,此方法有两个可选参数onFulfilled，onRejected,没传的话给默认参数

###### 链式调用问题，解决多个回调嵌套问题 

1. 链式调用 如果返回一个普通值 会走下一个then的成功
2. 抛出错误执行then的失败方法
3. 如果是promise 就让promise执行采用他的状态
4. 返回了一个新的promise来实现链式调用

 Promise.all 是按照固定顺序执行的 全部完成算完成，如果有一个失败就失败
 Promise.race 