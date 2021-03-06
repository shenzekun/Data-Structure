let PriorityQueue = (function() {
  class PriorityQueue {
    items: Array<any> = [];
    /*入列
          默认的 Queue 类和 PriorityQueue 类实现上的区别是，要向 PriorityQueue 添加元素，
          需要创建一个特殊的元素。这个元素包含了要添加到队列的元素（它可以是任意类型）及其在队列
          中的优先级。如果队列为空，可以直接将元素入列。否则，就需要比较该元素与其他元素的优先级。
          当找到一个比要添加的元素的 priority 值更大（优先级更低）的项时，就把新元素插人到它之
          前（根据这个逻辑，对于其他优先级相同，但是先添加到队列的元素，我们同样遵循先进先出的原
          则）。一旦找到 priority 值更大的元素，就插人新元素并终止队列循环。这样，队列也就根据
          优先级排序了。如果要添加元素的 priority 值大于任何已有的元素，把它添加到队列的末尾就
          行了。
          */
    enqueue(element: any, priority: number) {
      let queueElement = new QueueElement(element, priority);
      if (this.isEmpty()) {
        this.items.push(queueElement);
      } else {
        let add = false;
        for (let i = 0, len = this.items.length; i < len; i++) {
          if (queueElement.priority < this.items[i].priority) {
            this.items.splice(i, 0, queueElement);
            add = true;
            break;
          }
        }
        if (!add) {
          this.items.push(queueElement);
        }
      }
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
    //输出 items
    print() {
      console.log(this.items);
    }
  }

  class QueueElement {
    element:any;
    priority:number;
    constructor(element: any, priority: number) {
      this.element = element;
      this.priority = priority;
    }
  }
  return PriorityQueue;
})();

var priorityQueue = new PriorityQueue();
priorityQueue.enqueue("John", 2);
priorityQueue.enqueue("Jack", 1);
priorityQueue.enqueue("Camila", 1);
priorityQueue.print();

/* 
结果：[ QueueElement { element: 'Jack', priority: 1 },
QueueElement { element: 'Camila', priority: 1 },
QueueElement { element: 'John', priority: 2 } ]

图片：https://ws1.sinaimg.cn/large/006tNc79ly1flvhihvqc8j30go0jqdfv.jpg

解释：第一个被添加的元素是优先级为2的John。 因为此前队列为空， 所以它是队列中唯一的元素。
接下来，添加了优先级为1的Jack。由于Jack的优先级高于John，它就成了队列中的第一个元素。 
然后， 添加了优先级也为1的Camila。 Camila的优先级和Jack相同， 所以它会被插入到Jack 之后
（因为Jack先被插入队列） ；Camila的优先级高于John，所以它会被插入到John之前
*/
