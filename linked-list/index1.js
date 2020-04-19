 // 双向链表
 
 function Node(element) {
    this.element = element
    this.next = null
    this.previous = null
 }

 function LList() {
     this.head = new Node("head")
     this.find = find
     this.insert = insert
     this.remove = remove
     this.display = display
     this.findLast = findLast
     this.dispReverse = dispReverse
     //当前节点就是头节点
     this.currNode = this.head;
     this.advance = advance
     this.back = back
     this.show = show
 }

 function find(item) {
    let currNode = this.head
    while (currNode.element != item) {
        currNode = currNode.next 
    }
    return currNode
 }

 function insert(newElement, item) {
    let newNode = new Node(newElement)
    let currNode = this.find(item)
    newNode.next = currNode.next
    newNode.previous = currNode
    currNode.next = newNode
 }

 function remove(item) {
   let currNode = this.find(item)
   while (!(currNode.next == null)) {
       currNode.previous.next = currNode.next
       currNode.next.previous = currNode.previous
       currNode.next = null
       currNode.previous = null
   }
}

 function display() {
     var currNode = this.head
     while (!(currNode.next == null)) {
        console.log(currNode.next.element)
        currNode = currNode.next
     }
 }

 function findLast() {
    let currNode = this.head
    while (!(currNode.next ==null)) {
      currNode = currNode.next
    }
    return currNode
 }

 function dispReverse() {
    let currNode = this.findLast()
    while (!(currNode.previous ==null)) {
      console.log(currNode.element)
      currNode = currNode.previous
    }
 }

 function advance(n) {
   while ((n>0) && !(this.currNode.next==null)){
      this.currNode = this.currNode.next; 
      n--
   }
}
 function back (n) {
   while (n>0 && !(this.currNode.previous == null)) {
      this.currNode = this.currNode.previous
      n--
   }
 }
 function show () {
    console.log(this.currNode.element)
 }
 let cars = new LList()
 cars.insert('bmw', 'head')
 cars.insert('tuolaji', 'bmw')
 cars.insert('benz', 'tuolaji')
 cars.insert('baolai', 'benz')
 cars.insert('yema', 'baolai')
 cars.display()
 console.log('----------')
 cars.advance(4)
 cars.show()
 cars.advance(1)
 cars.show()
