export const LinkedList = (function() {
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
