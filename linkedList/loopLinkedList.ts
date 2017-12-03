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
