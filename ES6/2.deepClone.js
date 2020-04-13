// 展开对象

// ...展开运算符如果用在多层对象上，是浅拷贝
let home = {name:'回龙观',a:{b:2},fn:()=>{}}
let me = {age:10}

let newObj= {...home,...me}
console.log(newObj)
// 实现深拷贝？
//1. JSON.parse(JSON.stringify(obj))  缺陷：会过滤掉里面的function,undefined等
//2.递归拷贝
//  1）怎么判断数据类型
//   typeof  缺陷：object  Array
//   Object.prototype.toString.call() 缺陷： 不能判断是谁的实例
//   instanceof  判断谁的实例
//   constructor() 构造函数

const deepClone = (value, hash = new WeakMap) => {
    if(value == null) return value // 排除掉null 和 undefined
    if(typeof value !== 'object') return value
    if(value instanceof RegExp) return new RegExp(value)
    if(value instanceof Date)return new Date(value)
    // 拷贝的可能是个对象或者数组
    let instance = new value.constructor // 根据当前属性构造一个新的示例
    if(hash.has(value)){ // 先去hash中查看一下是否存在，如果存在就把以前拷贝的返回去
        return hash.get(value)
    }
    hash.set(value, instance)
    for(let key in value){
        if(value.hasOwnProperty(key) ){
            instance[key] = deepClone(value[key],hash)
        }
    }
    return instance
}

let obj = {a:1}
obj.b = obj  // 
console.log(deepClone(obj))
