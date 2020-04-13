// set map 是es6种的新的数据类型,用法基本一致
// set只有forEach方法
// 去重
let a1 = [1,4,5,3,55]
let a2 = [1,89,5,2,3]
let a = new Set([...a1,...a2])
console.log([...a])

// 数组的交集
let s1 = new Set([...a1])
let s2 = new Set([...a2])
let a3 = [...s2].filter((item)=>{
    // return s1.has(item)  //数组的交集
    return !s1.has(item) //数组的差集
})
console.log(a3)
