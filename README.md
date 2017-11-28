# Data-Structure

学习一波数据结构 （typescript）😑

## [栈](https://github.com/shenzekun/Data-Structure/blob/master/stack/stack.ts)


```typescript
class Stack {
  items: Array<number | string> = [];
  //压栈
  push(element) {
    this.items.push(element);
  }

  //移除栈顶的元素，同时返回被移除的元素
  pop() {
    return this.items.pop();
  }

  //返回栈顶的元素
  peek() {
    return this.items[this.items.length - 1];
  }

  //判断栈是否为空
  isEmpty() {
    return this.items.length === 0;
  }

  //移除栈里的所有元素
  clear() {
    this.items = [];
  }

  //返回栈里的元素个数
  size() {
    return this.items.length;
  }
}

//测试
let stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(8);
stack.push(9);
console.log(stack.size());//4
console.log(stack.peek()); //9
console.log(stack.items); //[1,2,8,9]
console.log(stack.isEmpty());//false
console.log(stack.pop());//9
console.log(stack.items);//[1,2,8]
stack.clear();
console.log(stack.items);//[]

```

## [队列](https://github.com/shenzekun/Data-Structure/blob/master/queue/queue.ts)

```typescript
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

```

## [最小优先队列](https://github.com/shenzekun/Data-Structure/blob/master/queue/priorityQueue.ts)

```typescript
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
然后， 添加了优先级也为1的 Camila。 Camila 的优先级和Jack相同， 所以它会被插入到Jack 之后
（因为Jack先被插入队列） ；Camila 的优先级高于John，所以它会被插入到John之前
*/

```

## [链表](https://github.com/shenzekun/Data-Structure/blob/master/linkedList/linkedList.ts)

```typescript
const LinkedList = (function() {
  class StructureNode {
    element: any;
    next: any;
    constructor(el: any) {
      this.element = el;
      this.next = null;
    }
  }
  class LinkedList {
    head: any;
    length: number;
    constructor() {
      this.head = null;
      this.length = 0;
    }

    /*
    向LinkedList对象的尾部添加一个元素。
    可能有两种场景：🔽
      ① 列表为空，添加的是第一个元素：
      ② 列表不为空，向其追加元素。
    */
    append(el: any) {
      let node = new StructureNode(el),
        current;
      //列表中第一个节点
      if (this.head === null) this.head = node;
      else {
        current = this.head;
        //循环列表，直到找到最后一项
        while (current.next) current = current.next;
        //找到最后一项，将其 next 赋为 node，建立链接
        current.next = node;
      }
      this.length++; //更新列表的长度
    }
    /*
      从链表中移除元素。
      移除元素有两种场景：🔽
        第一种是移除第一个元素：如果想移除第一个元素，要做的就是让head指向列表的第二个元素。
          我们将用current变量创建一个对列表中第一个元素的引用。这样current变量就是对列表中第一个元素
          的引用。如果把 head 赋为 current.next，就会移除第一个元素。
  
        第二种是移除第一个以外的任一元素：
         （我们会使用一个用于内部控制和递增的index变量）current 变量总是为对所循环列表的当前元
          素的引用。我们还需要一个对当前元素的前一个元素的引用，它被命名为previous 。 因此，
          要从列表中移除当前元素，要做的就是将previous.next 和 current.next链接起来。这样，
          当前元素就会被丢弃在计算机内存中，等着被垃圾回收器清除。
    */
    removeAt(position: number) {
      //检查临界值
      if (position >= 0 && position <= this.length - 1) {
        let current = this.head,
          previous,
          index = 0;
        //移除第一项
        if (position === 0) {
          this.head = current.next;
        } else {
          while (index++ < position) {
            previous = current;
            current = current.next;
          }
          //将previous 与 current的下一项链接起来：跳过current，从而移除它
          previous.next = current.next;
        }
        this.length--;
        return current.element;
      } else {
        //不是有效位置
        return null;
      }
    }

    /*
      在任意位置插入一个元素。
      在任意位置插入一个元素有两种场景：🔽
        第一种是在列表的起点添加一个元素，也就是第一个位置：current 变量是对列表中第一个元素的引用。
          我们需要做的是把node.next 的值设为current （列表中第一个元素）。现在 head 和 node.next
          都指向了current 。接下来要做的就是把 head 的引用改为 node ，这样列表中就有了一个新元素。
  
        第二种是在列表中间或尾部添加一个元素：首先，我们需要循环访问列表， 找到目标位置 。
          当跳出循环时，current 变量将是对想要插入新元素的位置之后一个元素的引用，
          而previous 将是对想要插入新元素的位置之前一个元素的引用。在这种情况下， 
          我们要在previous 和current 之间添加新项。因此，首先需要把新项（node）和当前项
          链接起来 ，然后需要改变previous 和current 之间的链接。我们还需要让previous.next 指向node
    */
    insert(position: number, element: any): boolean {
      //检查越界值
      if (position >= 0 && position <= this.length) {
        let node = new StructureNode(element),
          current = this.head,
          previous,
          index = 0;
        if (position === 0) {
          //在第一个位置添加
          node.next = current;
          this.head = node;
        } else {
          while (index++ < position) {
            previous = current;
            current = current.next;
          }
          node.next = current;
          previous.next = node;
        }
        this.length++; //更新列表的长度
        return true;
      } else {
        return false;
      }
    }
    //链表是否为空
    isEmpty(): boolean {
      return this.length === 0;
    }
    //返回链表长度
    size(): number {
      return this.length;
    }
    //查找元素的位置
    indexOf(element): number {
      let current = this.head,
        index = 0;
      while (current) {
        if (element === current.element) {
          return index;
        }
        index++;
        current = current.next;
      }
      return -1;
    }
    //删除指定元素
    remove(element) {
      let index = this.indexOf(element);
      return this.removeAt(index);
    }
    //返回头结点
    getHead() {
      return this.head;
    }
    //LinkedList对象转换成字符串。
    toString(): string {
      let current = this.head,
        string = "";
      while (current) {
        string += "\n" + current.element;
        current = current.next;
      }
      //将第一个换行符去掉
      string = string.replace(/^\n/, "");
      return string;
    }
  }
  return LinkedList;
})();
//测试
let list = new LinkedList();
list.append(2);
list.append(12);
list.append(34);
list.append("55");
console.log("indexOf:" + list.indexOf("55")); //3
console.log("removeAt: " + list.removeAt(1)); //12
console.log("after removeAt:\n" + list.toString()); //2 34 55
console.log("isEmpty: " + list.isEmpty()); //false
console.log("size: " + list.size()); //3
console.log("remove: " + list.remove(34)); //34
console.log("after remove: \n" + list.toString()); //2 55
```
