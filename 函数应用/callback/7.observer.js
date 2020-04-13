class Subject { // 被观察者 12306
    constructor(){
        this.arr = []
        this.state = '没票了'
    }
    attch(o){
        this.arr.push(o)
    }
    setState(newState){
        this.state = newState
        this.arr.forEach(o => o.update(newState))
    }
}

class Observer { // 观察者 我
    constructor(name){
        this.name = name
    }
    update(newState) {
        console.log(this.name + '发现' + newState)
    }
}

let s = new Subject('12306')
let o1 = new Observer("我")
s.attch(o1)
s.setState('有票了')