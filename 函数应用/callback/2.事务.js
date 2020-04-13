// 事务 开始的时候做某件事 结束的时候做某件事

const perform = (anymethod,wrappers)=>{
    wrappers.forEach(wrap=>{
        wrap.initilizae()
    })
    anymethod()
    wrappers.forEach(wrap=>{
        wrap.initilizae()
    })
}

perform(()=>{
    console.log("说话")
},[
    {
        initilizae(){
            console.log("您好")
        },
        close(){
            console.log("再见")
        }
    },
    {
        initilizae(){
            console.log("您好1")
        },
        close(){
            console.log("再见2")
        }
    }
])