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

