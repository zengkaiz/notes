// 柯里化 ：将一个函数拆分成多个函数

// 判断类型
// 1.
const checkType =(type, content)=>{
    return Object.prototype.toString.call(content)=== `[object ${type}]`
}
const a = checkType(123,'Number')

// 2.
const checkType1 = (type) => {
    return (content) => {
        return Object.prototype.toString.call(content) === `[object ${type}]`
    }
}
// let types = ['Number', 'String', 'Boolean']
// let utils = {}
// types.forEach((type)=>[
//     utils['is'+type] = checkType1(type)
// ])
// let isString = checkType1('String')

// const b = utils.isString('zack')
// console.log(b)

// 3.
// 函数柯里化怎么实现 通用的柯里化
const add = (a, b, c, d, e) => {
    return a + b + c + d + e
}

const curring = (fn, arr = []) => {
    let len = fn.length
    return (...args) => {
        arr = arr.concat(args)
        if(arr.length < len) {
            return curring(fn, arr)
        }
        return fn(...arr)
    }
}

let c = curring(add)(1)(2)(3)(4)(5)
console.log(c)


let types = ['Number', 'String', 'Boolean']
let utils = {}
types.forEach((type)=>[
    utils['is'+type] = curring(checkType1)(type)
])

console.log(utils.isString('zack'))