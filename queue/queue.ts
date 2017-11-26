class Queue {
  items: Array<number | string> = [];

  //入列
  enqueue(element) {
    this.items.push(element);
  }

  //移除队列的第一项，并返回移除的元素
  dequeue() {
    return this.items.shift();
  }

  //返回队列的最前项
  front() {
    return this.items[0];
  }

  //判断队列是否为空
  isEmpty() {
    return this.items.length === 0;
  }

  //返回队列的大小
  size() {
    return this.items.length;
  }

  //清空队列
  clear() {
    this.items = [];
  }
}

let queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
queue.enqueue(0);

console.log(queue.front()); //1
console.log(queue.size()); //4
console.log(queue.isEmpty()); //false
console.log(queue.dequeue()); //1
console.log(queue.items); // [2,3,4]
queue.clear();
console.log(queue.items); //[]
