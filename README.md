# Data-Structure

学习一波数据结构 （typescript）😑

## [栈](https://github.com/shenzekun/Data-Structure/blob/master/stack/stack.ts)

>栈是一种遵从后进先出（LIFO）原则的有序集合。新添加的或待删除的元素都保存在栈的末尾，称作栈顶，另一端就叫栈底。在栈里，新元素都靠近栈顶，旧元素都接近栈底。在生活中有很多这样的例子，如我们把擦完的盘子一个一个放在桶里，这个时候，新擦完的盘子是不是放在最上面？之前擦完的盘子是不是放在新擦完的盘子的下面？😄栈就是这个道理

![](https://ws3.sinaimg.cn/small/006tNc79ly1fm0hl914enj30au09itan.jpg)

代码如下：

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

>队列是遵循FIFO（First In First Out，先进先出，也称为先来先服务）原则的一组有序的项。队列在尾部添加新元素，并从顶部移除元素。最新添加的元素必须排在队列的末尾。在现实中，最常见的队列的例子就是排队（最先排队的人能更快获取到服务，最晚的排队的人当然只能最晚获得服务啦😊）

![](https://ws1.sinaimg.cn/small/006tNc79ly1fm0hp7s7dij30da07awf9.jpg)

代码如下：

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

>这个其实就是队列的改进版。举个例子，在机场上，头等舱和商务舱乘客的优先级要高于经济舱乘客。在有些国家，老年人和孕妇登机时享有高于其他乘客的优先级，那这个时候就要根据优先级来排队入列😁

代码如下

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

>链表存储有序的元素的集合，它不同于数组，链表中的元素在内存中并不是连续放置的，每个元素由一个存储元素本身的节点和一个指向下一个元素的引用（也称指针或链接）组成，如下图：

![](https://ws1.sinaimg.cn/large/006tNc79ly1fm0h71f5m4j30xe06mwem.jpg)

代码如下：

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

>双向链表和普通链表的区别在于， 在链表中， 一个节点只有链向下一个节点的链接，而在双向链表中，链接是双向的：一个链向下一个元素， 另一个链向前一个元素，如下图所示：

![](https://ws4.sinaimg.cn/large/006tNc79ly1fly5ydpanuj319a09mglv.jpg)

代码如下：

```typescript
//双向链表
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

## [循环链表](https://github.com/shenzekun/Data-Structure/blob/master/linkedList/loopLinkedList.ts)

>循环链表可以像链表一样只有单向引用，也可以像双向链表一样有双向引用。循环链表和链表之间唯一的区别在于，最后一个元素指向下一个元素的指针（tail.next）不是引用null， 而是指向第一个元素（head） ，如下图所示:

![](https://ws2.sinaimg.cn/bmiddle/006tKfTcly1fm3bp6jcoqj30r208ct8t.jpg)

代码如下：

```typescript
let LoopLinkedList = (function() {
    class StructureNode {
        element: any;
        next: any;
        constructor(el) {
            this.element = el;
            this.next = null;
        }
    }

    class LoopLinkedList {
        length: number;
        head: any;
        constructor() {
            this.head = null;
            this.length = 0;
        }
        /*
         向LoopLinkedList对象的尾部添加一个元素。
         可能有两种场景：🔽
          ① 列表为空，添加的是第一个元素：
          ② 列表不为空，向其追加元素。
        */
        append(el): void {
            let node = new StructureNode(el),
                current;
            //列表中第一个节点
            if (this.head === null) this.head = node;
            else {
                current = this.head;
                //循环列表，直到找到最后一项(如果只有一个元素的情况，current.next === this.head)
                while (current.next !== this.head) current = current.next;
                //找到最后一项，将其 next 赋为 node，建立链接
                current.next = node;
            }
            //首尾相连起来变成一个环列表
            node.next = this.head;
            this.length++;
        }
        /**
         * @description 根据位置删除元素
         *
         * 移除元素有两种场景：🔽
         *
         * 第一种是移除第一个元素：如果想移除第一个元素，要做的就是让head指向列表的第二个元素，并且尾部
         * 的next 指向 head，构成一个环
         *
         * 第二种是移除第一个以外的任一元素：
         *（我们会使用一个用于内部控制和递增的index变量）current 变量总是为对所循环列表的当前元
         * 素的引用。我们还需要一个对当前元素的前一个元素的引用，它被命名为previous 。 因此，
         * 要从列表中移除当前元素，要做的就是将previous.next 和 current.next链接起来。这样，
         * 当前元素就会被丢弃在计算机内存中，等着被垃圾回收器清除
         *
         *
         * @param {number} position
         * @memberof LoopLinkedList
         */
        removeAt(position: number): any {
            //检查临界值
            if (position >= 0 && position <= this.length - 1) {
                let current = this.head,
                    index = 0,
                    previous;
                if (position === 0) {
                    //判断对象是否只有一个元素，如果不是的话循环获取最后的元素
                    while (current.next !== this.head) {
                        current = current.next;
                    }
                    this.head = this.head.next;
                    //更新最后一项
                    current.next = this.head;
                } else {
                    while (index++ < position) {
                        previous = current;
                        current = current.next;
                    }
                    //将previous 与current 的下一项链接起来——跳过current
                    previous.next = current.next;
                }
                this.length--;
                return current.element;
            } else {
                return null;
            }
        }
        /**
         * 在指定位置插入元素
         * 在任意位置插入一个元素有两种场景：🔽
         *
         * 第一种是在列表的起点添加一个元素，也就是第一个位置：current 变量是对列表中第一个元素的引用。
         * 我们需要做的是把node.next 的值设为current （列表中第一个元素）。现在 head 和 node.next
         * 都指向了current 。接下来要做的就是把 head 的引用改为 node ，这样列表中就有了一个新元素。并且
         * 将最后一个元素指向 head
         *
         * 第二种是在列表中间或尾部添加一个元素：首先，我们需要循环访问列表， 找到目标位置 。
         * 当跳出循环时，current 变量将是对想要插入新元素的位置之后一个元素的引用，
         * 而previous 将是对想要插入新元素的位置之前一个元素的引用。在这种情况下，
         * 我们要在previous 和current 之间添加新项。因此，首先需要把新项（node）和当前项
         * 链接起来 ，然后需要改变previous 和current 之间的链接。我们还需要让previous.next 指向node，
         * 并且得判断当前的 node 是否是最后一个元素，如果是则 node.next = head
         *
         * @param position
         * @param element
         */
        insert(position: number, element: any): boolean {
            if (position >= 0 && position < this.length - 1) {
                let node = new StructureNode(element),
                    current = this.head,
                    index = 0,
                    previous;
                //在第一项插入
                if (position === 0) {
                    node.next = current;
                    while (current.next !== this.head) {
                        current = current.next;
                    }
                    this.head = node;
                    current.next = this.head;
                } else {
                    while (index++ < position) {
                        previous = current;
                        current = current.next;
                    }
                    node.next = current;
                    previous.next = node;
                    //如果在最后添加的话
                    if ((node.next = null)) {
                        node.next = this.head;
                    }
                }
                this.length++;
                return true;
            } else {
                return false;
            }
        }
        //删除指定元素
        remove(el): any {
            let index = this.indexOf(el);
            return this.removeAt(index);
        }
        /**
         * 返回当前查询元素的索引
         * @param el
         */
        indexOf(el): number {
            let current = this.head,
                index = 0;
            while (current) {
                if (current.element === el) {
                    return index;
                }
                current = current.next;
                index++;
            }
            return -1;
        }
        //链表是否为空
        isEmpty(): boolean {
            return this.length === 0;
        }
        //返回链表长度
        size(): number {
            return this.length;
        }
        //获取头结点
        getHead(): any {
            return this.head;
        }
        //LoopLinkedList对象转换成字符串。
        toString(): string {
            let current = this.head,
                string = current.element;
            while (current.next !== this.head) {
                current = current.next;
                string += '\n' + current.element;
            }
            //将第一个换行符去掉
            string = string.replace(/^\n/, '');
            return string;
        }
    }

    return LoopLinkedList;
})();

//测试
let list2 = new LoopLinkedList();
list2.append(2);
list2.append(12);
list2.append(34);
list2.append('55');
console.log('indexOf:' + list2.indexOf('55')); //3
console.log('removeAt: ' + list2.removeAt(1)); //12
console.log('after removeAt:\n' + list2.toString()); //2 34 55
console.log('isEmpty: ' + list2.isEmpty()); //false
console.log('size: ' + list2.size()); //3
console.log('remove: ' + list2.remove(34)); //34
console.log('after remove: \n' + list2.toString()); //2 55

```

## [字典](https://github.com/shenzekun/Data-Structure/blob/master/dictionary/dictionary.ts)

>在字典中，存储的是[键，值] 对，其中键名是用来查询特定元素的。字典也称做映射

![](https://ws4.sinaimg.cn/small/006tNc79ly1fmbb2blg3fj30bu0c8mx4.jpg)

代码如下：

```typescript
class Dictionary {
    items = {};
    /**
     * @description 如果某个键值存在于这个字典中，则返回true，反之则返回false。
     * @param {any} key
     * @returns boolean
     * @memberof Dictionary
     */
    has(key) {
        return key in this.items;
    }
    /**
     * @description 向字典中添加新元素
     * @param {any} key
     * @param {any} value
     * @memberof Dictionary
     */
    set(key, value) {
        this.items[key] = value;
    }
    /**
     * @description 通过使用键值来从字典中移除键值对应的数据值
     * @param {any} key
     * @returns
     * @memberof Dictionary
     */
    remove(key) {
        if (this.has(key)) {
            delete this.items[key];
            return true;
        }
        return false;
    }
    /**
     * @description 通过键值查找特定的数值并返回
     * @param {any} key
     * @returns
     * @memberof Dictionary
     */
    get(key) {
        return this.has(key) ? this.items[key] : undefined;
    }
    /**
     * @description 将字典所包含的所有数值以数组形式返回
     * @returns Array
     * @memberof Dictionary
     */
    values() {
        let values = [];
        for (let key in this.items) {
            if (this.has(key)) {
                values.push(this.items[key]);
            }
        }
        return values;
    }
    /**
     * @description 将字典所包含的所有键名以数组形式返回
     * @returns Array
     * @memberof Dictionary
     */
    keys() {
        let keys = [];
        for (let key in this.items) {
            if (this.has(key)) {
                keys.push(key);
            }
        }
        return keys;
    }
    /**
     * @description 返回字典所包含元素的数量。
     * @returns number
     * @memberof Dictionary
     */
    size() {
        return Object.keys(this.items).length;
    }
    /**
     * @description 将这个字典中的所有元素全部删除
     * @memberof Dictionary
     */
    clear() {
        this.items = {};
    }
}
//测试
let d = new Dictionary();
d.set('tom', '44@qq.com');
d.set('jam', 'dsad@qq.com');
console.log(d.has('jam')); //true
console.log(d.size()); //2
console.log(d.keys()); //[ 'tom', 'jam' ]
console.log(d.values()); //[ '44@qq.com', 'dsad@qq.com' ]
console.log(d.get('tom')); //44@qq.com
console.log(d.remove('tom')); //true
console.log(d.get('tom')); //undefined
```

## [散列表](https://github.com/shenzekun/Data-Structure/blob/master/dictionary/hashtable.ts)

>散列表（Hash table，也叫哈希表），是根据关键码值(Key value)而直接进行访问的数据结构。也就是说，它通过把关键码值映射到表中一个位置来访问记录，以加快查找的速度。这个映射函数叫做散列函数，存放记录的数组叫做散列表。散列函数的作用是给定一个键值，然后返回值在表中的地址。
>举个例子，比如我们使用的电子邮件地址簿。名字与电话对应。那么怎么将名字和电话对应起来呢？我们可以使用最常见的散列函数——“lose lose”散列函数，方法是简单地将每个键值中的每个字母的ASCII值相加，得到一个散列值，这个散列值对应着使用者的电话

![](https://ws2.sinaimg.cn/large/006tKfTcly1fn26a9ryhaj31cm0fsdgu.jpg)

代码如下：

```typescript
import { LinkedList } from './linkedList';

// 散列表，使用分离链接解决散列表中的冲突
//图片 https://ws1.sinaimg.cn/large/006tKfTcly1fn23uqbuhrj31ag0nq0uk.jpg
class HashTable {
    table = [];
    key = null;
    value = null;

    /**
     * @description 生成散列值。 给定一个key参数，我们就能根据组成 key 的每个字符的 ASCII 码值的
     * 和得到一个数字。 所以， 首先需要一个变量来存储这个总和 。然后，遍历 key并将从 ASCII
     * 表中查到的每个字符对应的 ASCII值加到 hash变量中。最后，返回hash值。为了得到比较小的
     * 数值，我们会使用hash 值和一个任意数做除法的余数（mod） 。
     *
     * @param {any} key
     * @returns number
     * @memberof HashTable
     */
    loseloseHashCode(key) {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash += key.charCodeAt(i);
        }
        return hash % 37;
    }
    /**
     * @description 向散列表增加一个新的项
     *
     * 在这个方法中，将验证要加入新元素的位置是否已经被占据 。如果这个位置是第一次被加入元素，则在这个位置上
     * 初始化一个LinkedList类的实例 。然后，使用第5章中实现的 append 方法向 LinkedList
     * 实例中添加一个 ValuePair实例
     *
     * @param {any} key
     * @param {any} value
     * @memberof HashTable
     */
    put(key, value) {
        let position = this.loseloseHashCode(key);
        if (this.table[position] === undefined) {
            this.table[position] = new LinkedList();
        }
        console.log(position + '-' + key);
        this.table[position].append(new this.ValuePair(key, value));
    }

    /**
     * @description 返回根据键值检索到的特定的值
     *
     * 我们要做的第一个验证，是确定在特定的位置上是否有元素存在 。如果没有，则返回一个 undefined 表示在 HashTable
     * 实例中没有找到这个值 。如果在这个位置上有值存在，我们知道这是一个LinkedList实例。现在要做的是遍历这个链表来
     * 寻找我们需要的元素。在遍历之前先要获取链表表头的引用,然后就可以从链表的头部遍历到尾部，current.next 将会是 null。
     * Node链表包含 next指针和 element属性。而 element属性又是 ValuePair的实例，所以它又有 value 和key属性。可以通过
     * current.element.next 来获得 Node链表的 key属性，并通过比较它来确定它是否就是我们要找的键 。
     * （这就是要使用ValuePair这个辅助类来存储元素的原因。我们不能简单地存储值本身，这样就不能确定哪个值对应着特定的键。 ）
     * 如果key 值相同，就返回Node的值；如果不相同，就继续遍历链表，访问下一个节点。如果要找的元素是链表的第一个或最后一个节
     * 点， 那么就不会进入while循环的内部。 因此， 需要在处理这种特殊的情况。
     *
     * @param {any} key
     * @returns any
     * @memberof HashTable
     */
    get(key) {
        let position = this.loseloseHashCode(key);
        if (this.table[position] !== undefined) {
            //遍历链表来寻找键/值
            let current = this.table[position].getHead();
            while (current.next) {
                if (current.element.key === key) {
                    return current.element.value;
                }
                current = current.next;
            }
            //检查元素在链表第一个或最后一个节点的情况
            if (current.element.key === key) {
                return current.element.value;
            }
        }
        return undefined;
    }
    /**
     * @description 根据键值从散列表中移除值。
     *
     * 在remove方法中，我们使用和get方法一样的步骤找到要找的元素。遍历LinkedList实例时，如果链表中的
     * current元素就是要找的元素 ，使用remove方法将其从链表中移除。然后进行一步额外的验证：
     * 如果链表为空了（链表中不再有任何元素了） ，就将散列表这个位置的值设为undefined ，这样搜索一个元素或
     * 打印它的内容的时候，就可以跳过这个位置了。 最后， 返回true表示这个元素已经被移除 , 或者在最后返回false
     * 表示这个元素在散列表中不存在 。同样，需要和get方法一样，处理元素在第一个或最后一个的情况。
     *
     * @param {any} key
     * @memberof HashTable
     */
    remove(key) {
        let position = this.loseloseHashCode(key);
        if (this.table[position] !== undefined) {
            let current = this.table[position].getHead();
            while (current.next) {
                if (current.element.key === key) {
                    this.table[position].remove(current.element);
                    if (this.table[position].isEmpty()) {
                        this.table[position] = undefined;
                    }
                    return true;
                }
                current = current.next;
            }
            // 检查是否为第一个或最后一个元素
            if (current.element.key === key) {
                if (this.table[position].isEmpty()) {
                    this.table[position] = undefined;
                }
                return true;
            }
        }
        return false;
    }

    ValuePair(key, value) {
        this.key = key;
        this.value = value;
        this.toString = function() {
            return '[' + this.key + ' - ' + this.value + ']';
        };
    }
    /**
     * @description 输出
     * @memberof HashTable
     */
    printf() {
        for (var i = 0; i < this.table.length; ++i) {
            if (this.table[i] !== undefined) {
                console.log(i + ': ' + this.table[i]);
            }
        }
    }
}

let hash = new HashTable();
hash.put('Gandalf', 'gandalf@email.com');
hash.put('John', 'johnsnow@email.com');
hash.put('Tyrion', 'tyrion@email.com');
hash.put('Aaron', 'aaron@email.com');
hash.put('Donnie', 'donnie@email.com');
hash.put('Ana', 'ana@email.com');
hash.put('Jonathan', 'jonathan@email.com');
hash.put('Jamie', 'jamie@email.com');
hash.put('Sue', 'sue@email.com');
hash.put('Mindy', 'mindy@email.com');
hash.put('Paul', 'paul@email.com');
hash.put('Nathan', 'nathan@email.com');
hash.printf();

// 19-Gandalf
// 29-John
// 16-Tyrion
// 16-Aaron
// 13-Donnie
// 13-Ana
// 5-Jonathan
// 5-Jamie
// 5-Sue
// 32-Mindy
// 32-Paul
// 10-Nathan
// 5: [Jonathan - jonathan@email.com]
// [Jamie - jamie@email.com]
// [Sue - sue@email.com]
// 10: [Nathan - nathan@email.com]
// 13: [Donnie - donnie@email.com]
// [Ana - ana@email.com]
// 16: [Tyrion - tyrion@email.com]
// [Aaron - aaron@email.com]
// 19: [Gandalf - gandalf@email.com]
// 29: [John - johnsnow@email.com]
// 32: [Mindy - mindy@email.com]
// [Paul - paul@email.com]
```

## [二叉搜索树](https://github.com/shenzekun/Data-Structure/blob/master/tree/binarySearchTree.ts)

>我们都知道二叉树中的节点最多只能有两个子节点：一个是左侧子节点，另一个是右侧子节点。这些定义有助于我们写出更高效的向/从树中插入、查找和删除节点的算法。而二叉搜索树（BST）是二叉树的一种，但是它只允许你在左侧节点存储（比父节点）小的值， 在右侧节点存储（比父节点）大（或者等于）的值，如图：

![](https://ws1.sinaimg.cn/bmiddle/006tNc79ly1fn6nbxg0xlj30zk0jkjul.jpg)

代码如下：

```typescript
let BinarySearchTree = (function() {
    class BinarySearchTree {
        root: any;
        constructor() {
            this.root = null;
        }
        /**
         * @description 向树中插入一个节点。
         * 要向树中插入一个新的节点（或项） ，要经历三个步骤。 第一步是创建用来表示新节点的Node2类实例 。
         * 只需要向构造函数传递我们想用来插入树的节点值，它的左指针和右指针的值会由构造函数自动设置为null。
         * 第二步要验证这个插入操作是否为一种特殊情况。 这个特殊情况就是我们要插入的节点是树的第一个节点 。
         * 如果是，就将根节点指向新节点。
         * 第三步是将节点加在非根节点的其他位置
         *
         * @param {any} key
         * @memberof BinarySearchTree
         */
        insert(key) {
            let newNode = new Node2(key);
            if (this.root === null) {
                this.root = newNode;
            } else {
                this.insertNode(this.root, newNode);
            }
        }

        /**
         * @description 帮助我们找到新节点应该插入的正确位置。
         * 如果树非空，需要找到插入新节点的位置。因此，在调用insertNode方法时要通过参数传入树的根节点和要插入的节点。
         *
         * 如果新节点的键小于当前节点的键（现在，当前节点就是根节点），那么需要检查当前节点的左侧子节点。
         * 如果它没有左侧子节点 ，就在那里插入新的节点。如果有左侧子节点，需要通过递归调用insertNode方法,继续找到树的下一层
         * 在这里，下次将要比较的节点将会是当前节点的左侧子节点。
         *
         * 如果节点的键比当前节点的键大，同时当前节点没有右侧子节点 ，就在那里插入新的节点 。如果有右侧子节点，同样需要递归
         * 调用insertNode方法，但是要用来和新节点比较的节点将会是右侧子节点
         *
         * @param {any} node
         * @param {any} newNode
         * @memberof BinarySearchTree
         */
        insertNode(node, newNode) {
            if (newNode.key < node.key) {
                if (node.left === null) {
                    node.left = newNode;
                } else {
                    this.insertNode(node.left, newNode);
                }
            } else {
                if (node.right === null) {
                    node.right = newNode;
                } else {
                    this.insertNode(node.right, newNode);
                }
            }
        }
        /**
         * @description 中序遍历
         * @param {any} callback
         * @memberof BinarySearchTree
         */
        inOrderTraverse(callback) {
            this.inOrderTraverseNode(this.root, callback);
        }
        /**
         * @description 方法接收一个回调函数作为参数。回调函数用来定义我们对遍历到的每个节点进行的操作
         * 要通过中序遍历的方法遍历一棵树，首先要检查以参数形式传入的节点是否为null，是停止递归继续执行的判断条件
         * 然后，递归调用相同的函数来访问左侧子节点，接着对这个节点进行一些操作（callback） ，然后再访问右侧子节点
         * @param {any} node
         * @param {any} callback
         * @memberof BinarySearchTree
         */
        inOrderTraverseNode(node, callback) {
            if (node !== null) {
                this.inOrderTraverseNode(node.left, callback);
                callback(node.key);
                this.inOrderTraverseNode(node.right, callback);
            }
        }
        /**
         * @description 先序遍历
         * @param {any} callback
         * @memberof BinarySearchTree
         */
        preOrderTraverse(callback) {
            this.preOrderTraverseNode(this.root, callback);
        }
        /**
         * @description 先序遍历和中序遍历的不同点是，先序遍历会先访问节点本身 ，然后再访问它的左侧子
         * 节点，最后是右侧子节点
         * @param {any} node
         * @param {any} callback
         * @memberof BinarySearchTree
         */
        preOrderTraverseNode(node, callback) {
            if (node !== null) {
                callback(node.key);
                this.preOrderTraverseNode(node.left, callback);
                this.preOrderTraverseNode(node.right, callback);
            }
        }
        /**
         * @description 后续遍历
         * @param {any} callback
         * @memberof BinarySearchTree
         */
        postOrderTraverse(callback) {
            this.postOrderTraverseNode(this.root, callback);
        }
        postOrderTraverseNode(node, callback) {
            if (node !== null) {
                this.postOrderTraverseNode(node.left, callback);
                this.postOrderTraverseNode(node.right, callback);
                callback(node.key);
            }
        }

        /**
         * @description 寻找树的最小键
         * @returns
         * @memberof BinarySearchTree
         */
        min() {
            return this.minNode(this.root);
        }
        /**
         * @description 遍历树的左边,直到找到树的最下层（最左端）,返回 node 的值
         * @param {any} node
         * @returns
         * @memberof BinarySearchTree
         */
        minNode(node) {
            if (node) {
                while (node && node.left !== null) {
                    node = node.left;
                }
                return node.key;
            }
            return null;
        }
        /**
         * @description 遍历树的左边,直到找到树的最下层（最左端）,返回 node
         * @param {any} node 
         * @returns 
         * @memberof BinarySearchTree
         */
        finminNode(node) {
            if (node) {
                while (node && node.left !== null) {
                    node = node.left;
                }
                return node;
            }
            return null;
        }

        /**
         * @description 寻找树的最大键
         * @memberof BinarySearchTree
         */
        max() {
            return this.maxNode(this.root);
        }
        /**
         * @description 找到最右端的节点
         * @param {any} node
         * @returns
         * @memberof BinarySearchTree
         */
        maxNode(node) {
            if (node) {
                while (node && node.right !== null) {
                    node = node.right;
                }
                return node.key;
            }
            return null;
        }
        /**
         * @description 搜索一个特定的值
         * @param {any} key
         * @returns
         * @memberof BinarySearchTree
         */
        search(key) {
            return this.searchNode(this.root, key);
        }
        searchNode(node, key) {
            if (node === null) return false;
            if (key < node.key) return this.searchNode(node.left, key);
            else if (key > node.key) return this.searchNode(node.right, key);
            else return true;
        }

        remove(key) {
            this.root = this.removeNode(this.root, key);
        }

        /**
         * @description 移除节点
         * 如果我们找到了要找的键（键和node.key相等） ，就需要处理三种不同的情况
         * 
         * 第一种情况是该节点是一个没有左侧或右侧子节点的叶节点。在这种情况下，我们要做的就是给这个节点赋予null
         * 值来移除它。在这里，这个节点没有任何子节点，但是它有一个父节点，需要通过返回 null来将对应的父节点指针赋予null值
         * 
         * 现在我们来看第二种情况，移除有一个左侧子节点或右侧子节点的节点。这种情况下，需要跳过这个节点，直接将父节点指向它的
         * 指针指向子节点，如果这个节点没有左侧子节点 ，也就是说它有一个右侧子节点。因此我们把对它的引用改为对它右侧子节
         * 点的引用并返回更新后的节点 。如果这个节点没有右侧子节点，也是一样——把对它的引用改为对它左侧子节点的引用并返回更新后的值。
         * 下图展现了移除只有一个左侧子节点或右侧子节点的节点的过程：
         * https://ws4.sinaimg.cn/large/006tNc79ly1fn6mocm82oj30uu0j8q4q.jpg
         * 
         * 现在是第三种情况，也是最复杂的情况，那就是要移除的节点有两个子节点——左侧子节点和右侧子节点。要移除有两个子节点的节点，
         * 需要执行四个步骤：
         * (1) 当找到了需要移除的节点后，需要找到它右边子树中最小的节点。 
         * (2) 然后，用它右侧子树中最小节点的键去更新这个节点的值 。通过这一步，我们改变了这个节点的键，也就是说它被移除了。
         * (3) 但是，这样在树中就有两个拥有相同键的节点了，这是不行的。要继续把右侧子树中的最小节点移除，毕竟它已经被移至要移除的节点的位置了。
         * (4) 最后，向它的父节点返回更新后节点的引用。
         * 下图展现了移除有两个子节点的节点的过程：
         * https://ws1.sinaimg.cn/large/006tNc79ly1fn6mtxk5rrj30vm0h8416.jpg
         * 
         * @param {any} node 
         * @param {any} key 
         * @returns 
         * @memberof BinarySearchTree
         */
        removeNode(node, key) {
            if (node === null) return null;
            if (key < node.key) {
                node.left = this.removeNode(node.left, key);
                return node;
            } else if (key > node.key) {
                node.right = this.removeNode(node.right, key);
                return node;
            } else {//键等于node.key
                //第一种情况——一个叶节点
                if (node.left === null && node.right ==null) {
                    node = null;
                    return null;
                }
                //第二种情况——一个只有一个子节点的节点
                if (node.left === null) {
                    node = node.right;
                    return node;
                } else if (node.right === null) {
                    node = node.left;
                    return node;
                } 
                //第三种情况——一个有两个子节点的节点
                let aux = this.finminNode(node.right);
                node.key = aux.key;
                node.right = this.removeNode(node.right,aux.key);
                return node;
            }
        }
    }

    class Node2 {
        key: any;
        left: any;
        right: any;
        constructor(key) {
            this.key = key;
            this.left = null;
            this.right = null;
        }
    }
    return BinarySearchTree;
})();

function printNode(value) {
    console.log(value);
}

let tree = new BinarySearchTree();
tree.insert(11);
tree.insert(7);
tree.insert(15);
tree.insert(5);
tree.insert(3);
tree.insert(9);
tree.insert(8);
tree.insert(10);
tree.insert(13);
tree.insert(12);
tree.insert(14);
tree.insert(20);
tree.insert(18);
tree.insert(25);
tree.insert(6);

//过程 https://ws4.sinaimg.cn/large/006tNc79ly1fn5yj862tbj30w20juwfw.jpg
tree.inOrderTraverse(printNode); //3 5 6 7 8 9 10 11 12 13 14 15 18 20 25
console.log('------------------');

//过程 https://ws1.sinaimg.cn/large/006tNc79ly1fn5z7xye37j30r80kcwfi.jpg
tree.preOrderTraverse(printNode); //11 7 5 3 6 9 8 10 15 13 12 14 20 18 25

console.log('-----------------');
//过程 https://ws3.sinaimg.cn/large/006tNc79ly1fn6077voz0j30qy0gk0tr.jpg
tree.postOrderTraverse(printNode); //3 6 5 8 10 9 7 12 14 13 18 25 20 15 11

console.log(tree.search(1) ? 'Key 1 found.' : 'Key 1 not found.'); //Key 1 not found
console.log(tree.search(8) ? 'Key 8 found.' : 'Key 8 not found.'); //Key 8 not found

tree.remove(15);

console.log('====================================');
tree.inOrderTraverse(printNode) //3 5 6 7 8 9 10 11 12 13 14 18 20 25
console.log('====================================');
```