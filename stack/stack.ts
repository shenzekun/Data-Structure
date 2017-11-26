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
