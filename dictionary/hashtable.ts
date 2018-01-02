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
