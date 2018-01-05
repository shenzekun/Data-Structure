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
            this.preOrderTraverseNode(this.root,callback);
        }
        /**
         * @description 先序遍历和中序遍历的不同点是，先序遍历会先访问节点本身 ，然后再访问它的左侧子
         * 节点，最后是右侧子节点
         * @param {any} node 
         * @param {any} callback 
         * @memberof BinarySearchTree
         */
        preOrderTraverseNode(node,callback) {
            if (node !== null) {
                callback(node.key);
                this.preOrderTraverseNode(node.left,callback);
                this.preOrderTraverseNode(node.right,callback);
            }
        }
        /**
         * @description 后续遍历
         * @param {any} callback 
         * @memberof BinarySearchTree
         */
        postOrderTraverse(callback) {
            this.postOrderTraverseNode(this.root,callback);
        }
        postOrderTraverseNode(node,callback) {
            if(node !== null) {
                this.postOrderTraverseNode(node.left,callback);
                this.postOrderTraverseNode(node.right,callback);
                callback(node.key);
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
tree.preOrderTraverse(printNode);//11 7 5 3 6 9 8 10 15 13 12 14 20 18 25 

console.log('-----------------');
//过程 https://ws3.sinaimg.cn/large/006tNc79ly1fn6077voz0j30qy0gk0tr.jpg
tree.postOrderTraverse(printNode);//3 6 5 8 10 9 7 12 14 13 18 25 20 15 11 


