const fs = require('fs')

let people = {}
// 并发的问题 使用计数器去解决
const after = (times, fn) => () => --times === 0 && fn()
let newAfter = after(2, () => {
    console.log(people)
})
fs.readFile('./name.txt','utf8', (err, data)=>{
    console.log(err)
    console.log(data)
    people['name'] = data
    newAfter()
})
fs.readFile('age.txt','utf8', (err, data)=>{
    people['age'] = data
    newAfter()
})