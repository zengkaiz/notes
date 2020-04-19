 // 单向链表
 
 function Node(element) {
    this.element = element
    this.next = null
 }

 function LLits() {
     this.head = new Node("head")
     this.find = find
     this.insert = insert
     this.findPrevious = findPrevious
     this.remove = remove
     this.display = display
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
    currNode.next = newNode
 }

 function findPrevious(item) {
    let currNode = this.head
    while (!(currNode.next == null) && currNode.next.element != item) {
        currNode = currNode.next
    }
    return currNode
 }

 function remove(item) {
    let previousNode = this.findPrevious(item)
    if(previousNode.next != null){
        previousNode.next = previousNode.next.next
    } 
 }

 function display() {
     var currNode = this.head
     while (!(currNode.next == null)) {
        console.log(currNode.next.element)
        currNode = currNode.next
     }
 }

 let cars = new LLits()
 cars.insert('bmw', 'head')
 cars.insert('tuolaji', 'bmw')
 cars.insert('benz', 'tuolaji')
 cars.display()
 console.log('----------')
 cars.remove('tuolaji')
 cars.display()