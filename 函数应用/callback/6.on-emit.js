const fs = require('fs')

let people = {}
// 并发的问题 发布-订阅去解决
const e = {
    arr: [],
    on(fn){ // 订阅
        this.arr.push(fn)
    },
    emit(){ // 发布
        this.arr.forEach((fn)=> {fn()})
    }
}
e.on(()=>{
    console.log('ok')
})
e.on(() =>{
    Object.keys(people).length === 2 && console.log(people)
})
fs.readFile('./name.txt','utf8', (err, data)=>{
    people['name'] = data
    e.emit()
})
fs.readFile('age.txt','utf8', (err, data)=>{
    people['age'] = data
    e.emit()
})

// 发布订阅模式 => 观察者模式 （vue watcher）

// 发布和订阅没有关系