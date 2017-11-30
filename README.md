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

## [双向链表](https://github.com/shenzekun/Data-Structure/blob/master/linkedList/doublyLinkedList.ts)

```typescript
//双向链表
//图片 ：https://ws4.sinaimg.cn/large/006tNc79ly1fly5ydpanuj319a09mglv.jpg
const DoublyLinkedList = (function() {
    class StructureNode {
        element: any;
        next: any;
        prev: any;
        constructor(el) {
            this.element = el;
            this.next = null;
            this.prev = null;
        }
    }
    class DoublyLinkedList {
        length: number;
        head: any;
        tail: any;
        constructor() {
            this.length = 0;
            this.head = null;
            this.tail = null;
        }

        /**
         * 向DoublyLinkedList对象的尾部添加一个元素。
         *
         * 可能有两种场景：🔽
         *  ① 列表为空，添加的是第一个元素：
         *  ② 列表不为空，向其追加元素。
         * @param el
         */
        append(el): void {
            let node = new StructureNode(el),
                current;
            if (this.head === null) {
                this.head = node;
                this.tail = node;
            } else {
                current = this.head;
                //循环列表，直到找到最后一项
                while (current.next) current = current.next;
                //找到最后一项，将其 next 赋为 node，建立链接
                current.next = node;
                //将this.tail 赋值给 node.prev
                node.prev = this.tail;
                this.tail = node;
            }
            this.length++;
        }

        /**
         * 在指定位置插入元素。
         *
         * 我们来分析第一种场景：在列表的第一个位置（列表的起点）插入一个新元素。如果列表为空 ，
         * 只需要把 head 和tail 都指向这个新节点。如果不为空，current变量将是对列表中第一个
         * 元素的引用。把node.next 设为 current，而 head 将指向 node（它将成为列表中的第一
         * 个元素） 。不同之处在于，我们还需要为指向上一个元素的指针设一个值。current.prev指针
         * 将由指向 null 变为指向新元素（node）。node.prev 指针已经是 null，因此不需要再更新任
         * 何东西。这个图演示了这个过程：https://ws1.sinaimg.cn/large/006tNc79ly1flyu33v49zj30xy0d6t9u.jpg
         *
         * 现在来分析一下，假如我们要在列表最后添加一个新元素。这是一个特殊情况，因为我们还控制着指
         * 向最后一个元素的指针（tail） 。current变量将引用最后一个元素 。然后开始建立第一个链接：
         * node.prev将引用 current。 current.next指针 （指向null） 将指向node （由于构造函数，
         * node.next已经指向了 null） 。然后只剩一件事了，就是更新tail，它将由指向current变为指
         * 向node。这个图展示了这些行为：https://ws1.sinaimg.cn/large/006tNc79ly1flyu3uwbazj31640dwjss.jpg
         *
         * 然后还有第三种场景：在列表中间插入一个新元素。就像我们在之前的方法中所做的，迭代列表，直到
         * 到达要找的位置 。我们将在current 和 previous元素之间插入新元素。首先，node.next将指向
         * current ，而previous.next 将指向 node，这样就不会丢失节点之间的链接。然后需要处理所有的
         * 链接：current.prev 将指向 node，而node.prev 将指向 previous。这个图展示了这一过程：
         * https://ws2.sinaimg.cn/large/006tNc79ly1flyu4bz3ymj31420dkwg7.jpg
         *
         * @param position
         * @param element
         */
        insert(position: number, element: any): boolean {
            //检查越界值
            if (position >= 0 && position <= this.length) {
                let node = new StructureNode(element),
                    current = this.head,
                    previous,
                    index = 0;
                //在第一个位置添加
                if (position === 0) {
                    ///新增的
                    if (!this.head) {
                        this.head = node;
                        this.tail = node;
                    } else {
                        node.next = current;
                        current.prev = node; //新增的
                        this.head = node;
                    }
                } else if (position === this.length) {
                    current = this.tail;
                    current.next = node;
                    node.prev = current;
                    this.tail = node;
                } else {
                    while (index++ < position) {
                        previous = current;
                        current = current.next;
                    }
                    node.next = current;
                    previous.next = node;
                    current.prev = node;
                    node.prev = previous;
                }
                this.length++;
                return true;
            } else {
                return false;
            }
        }

        /**
         * 根据指定位置删除元素
         *
         * 我们需要处理三种场景：从头部、从中间和从尾部移除一个元素
         *
         * 我们来看看如何移除第一个元素。current变量是对列表中第一个元素的引用，也就
         * 是我们想移除的元素。需要做的就是改变head的引用，将其从current改为下一个元
         * 素（current.next） 。但我们还需要更新current.next指向上一个元素的指针
         * （因为第一个元素的prev 指针是null） 。因此，把head.prev的引用改为 null
         * （因为head 也指向列表中新的第一个元素，或者也可以用current.next.prev)
         * 由于还需要控制 tail 的引用，我们可以检查要移除的元素是否是第一个元素，如果是，
         * 只需要把 tail 也设为 null。这个图显示双向链表移除第一个元素的过程：https://ws1.sinaimg.cn/large/006tNc79ly1flzrwu3d83j314y0ag0uf.jpg
         *
         *
         * 下一种场景是从最后一个位置移除元素。既然已经有了对最后一个元素的引用（tail），
         * 我们就不需要为找到它而迭代列表。这样我们也就可以把 tail 的引用赋给 current 变量
         * 接下来，需要把tail的引用更新为列表中倒数第二个元素（current.prev，或者tail.prev
         * 也可以） 。既然tail指向了倒数第二个元素，我们就只需要把 next 指针更新为 null
         * （tail.next = null）。这个图演示了这一行为： https://ws2.sinaimg.cn/large/006tNc79ly1flzrx5mfh1j315e0cejta.jpg
         *
         *
         * 第三种也是最后一种场景：从列表中间移除一个元素。首先需要迭代列表，直到到达要找的位
         * 置。current变量所引用的就是要移除的元素。那么要移除它，我们可以通过更新previous.next
         * 和current.next.prev的引用，在列表中跳过它。因此，previous.next 将指向 current.next，
         * 而current.next.prev 将指向 previous，如图所示：https://ws1.sinaimg.cn/large/006tNc79ly1flzrxng3eqj31580d2ac0.jpg
         *
         * @param position
         */
        removeAt(position: number): any {
            if (position >= 0 && position <= this.length - 1) {
                let current = this.head,
                    previous,
                    index = 0;
                //移除第一项
                if (position === 0) {
                    this.head = current.next;
                    //如果只有一项，更新tail
                    if (this.length === 1) this.tail = null;
                    else this.head.prev = null;
                    //最后一项
                } else if (position === this.length - 1) {
                    current = this.tail;
                    this.tail = current.prev;
                    this.tail.next = null;
                } else {
                    while (index++ < position) {
                        previous = current;
                        current = current.next;
                    }
                    //将previous 与current 的下一项链接起来——跳过current
                    previous.next = current.next;
                    current.next.prev = previous;
                }
                this.length--;
                return current.element;
            } else {
                return null;
            }
        }

        /**
         * 返回当前查询元素的索引
         *
         * @param element
         */
        indexOf(element: any): number {
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
        remove(element: any) {
            let index = this.indexOf(element);
            return this.removeAt(index);
        }
        //判断双向链表是否为空
        isEmpty(): boolean {
            return this.length === 0;
        }
        //LinkedList对象转换成字符串。
        toString(): string {
            let current = this.head,
                string = '';
            while (current) {
                string += '\n' + current.element;
                current = current.next;
            }
            //将第一个换行符去掉
            string = string.replace(/^\n/, '');
            return string;
        }
        //返回双向链表长度
        size(): number {
            return this.length;
        }
        //返回头结点
        getHead() {
            return this.head;
        }
        //获取尾节点
        getTail() {
            return this.tail;
        }
    }
    return DoublyLinkedList;
})();

//测试
let list1 = new DoublyLinkedList();
list1.append('4');
list1.append(55);
list1.append(2);
list1.append(12);
list1.append(34);
list1.append('55');
console.log('indexOf:' + list1.indexOf('55')); //5
console.log('removeAt: ' + list1.removeAt(1)); //55
console.log('after removeAt:\n' + list1.toString()); //4 2 12 34 55
console.log('isEmpty: ' + list1.isEmpty()); //false
console.log('size: ' + list1.size()); //5
console.log('remove: ' + list1.remove(34)); //34
console.log('after remove: \n' + list1.toString()); //4 2 12 55
```