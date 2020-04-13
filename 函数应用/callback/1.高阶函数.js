
Function.prototype.before = function(beforeFn){
    return (...args)=>{ // 箭头函数中没有this指向，所以会像上级作用域查找；没有arguments
        beforeFn()
        this(...args)   // 展开运算符
    }
}

const say = (...args)=>{    // 剩余运算符（将所有参数组成一个数组）
    console.log("说话", args)
}

const newSay = say.before(()=>{
    console.log("您好")
})


newSay(1,2,4)
