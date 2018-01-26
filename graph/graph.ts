import { Dictionary } from './dictionary';
import { Queue } from './queue';
class Graph {
    vertices: any; //存储图中所有顶点的名字
    adjList: any; //存储邻接表,字典将会使用顶点的名字作为键，邻接顶点列表作为值。
    constructor() {
        this.vertices = [];
        this.adjList = new Dictionary();
    }

    /**
     * @description 向图中添加一个新的顶点。
     * 这个方法接受顶点v作为参数。我们将该顶点添加到顶点列表中，
     * 并且在邻接表中， 设置顶点v作为键对应的字典值为一个空数组
     * @param {any} v
     * @memberof Graph
     */
    addVertex(v) {
        this.vertices.push(v);
        this.adjList.set(v, []);
    }

    /**
     * @description 添加顶点之间的边。
     *
     * 首先，通过将w 加入到 v的邻接表中，我们添加了一条自顶点v 到顶点w的边。由于基于无向图，我们需要添加一条自w向v的边
     *
     * @param {any} v
     * @param {any} w
     * @memberof Graph
     */
    addEdge(v, w) {
        this.adjList.get(v).push(w);
        this.adjList.get(w).push(v);
    }

    toString() {
        let s = '';
        for (let i = 0; i < this.vertices.length; i++) {
            s += this.vertices[i] + ' -> ';
            var neighbors = this.adjList.get(this.vertices[i]);
            for (let j = 0; j < neighbors.length; j++) {
                s += neighbors[j] + ' ';
            }
            s += '\n';
        }
        return s;
    }

    /**
     * @description 初始节点颜色（白）
     *
     * 白色：表示该顶点还没有被访问。
     * 灰色：表示该顶点被访问过，但并未被探索过。
     * 黑色：表示该顶点被访问过且被完全探索过
     *
     * @returns
     * @memberof Graph
     */
    initializeColor() {
        let color = [];
        for (let i = 0; i < this.vertices.length; i++) {
            color[this.vertices[i]] = 'white';
        }
        return color;
    }

    /**
     * @description 广度优先搜索
     *
     * bfs方法接受一个顶点作为算法的起始点，将此顶点入队列。
     * 如果队列非空，我们将通过出队列，操作从队列中移除一个顶点，并取得一个包含其所有邻点的邻接表。
     * 该顶点将被标注为grey ，表示我们发现了它（但还未完成对其的探索)
     * 对于u的每个邻点，我们取得其值（该顶点的名字） ，如果它还未被访问过（颜色为white） ，
     * 则将其标注为我们已经发现了它（颜色设置为grey），并将这个顶点加入队列中 ，这样当其从队
     * 列中出列的时候，我们可以完成对其的探索。 当完成探索该顶点和其相邻顶点后，我们将该顶点
     * 标注为已探索过的（颜色设置为black） 。
     *
     * @param {any} v
     * @param {any} callback
     * @memberof Graph
     */
    bfs(v, callback) {
        let color = this.initializeColor(),
            quene = new Queue();
        quene.enqueue(v);
        while (!quene.isEmpty()) {
            let u = quene.dequeue();
            let neighbors = this.adjList.get(u);
            color[u] = 'grey';
            for (let i = 0; i < neighbors.length; i++) {
                let w = neighbors[i];
                if (color[w] === 'white') {
                    color[w] = 'grey';
                    quene.enqueue(w);
                }
            }
            color[u] = 'black';
            if (callback) {
                callback(u);
            }
        }
    }

    /**
     * @description 深度优先搜索
     * @param {any} callback 
     * @memberof Graph
     */
    dfs(callback) {
        let color = this.initializeColor();
        for (let i = 0; i < this.vertices.length; i++) {
            if (color[this.vertices[i]] === 'white') {
                this.dfsVisit(this.vertices[i], color, callback);
            }
        }
    }

    dfsVisit(u, color, callback) {
        color[u] = 'grey';
        if (callback) {
            callback(u);
        }
        let neighbors = this.adjList.get(u);
        for (let i = 0; i < neighbors.length; i++) {
            let w = neighbors[i];
            if (color[w] === 'white') {
                this.dfsVisit(w, color, callback);
            }
        }
        color[u] = 'black';
    }

    printNode(val) {
        console.log('Visited vertex: ' + val);
    }
}

let graph = new Graph();
var myVertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
for (let i = 0; i < myVertices.length; i++) {
    graph.addVertex(myVertices[i]);
}

graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('A', 'D');
graph.addEdge('C', 'D');
graph.addEdge('C', 'G');
graph.addEdge('D', 'G');
graph.addEdge('D', 'H');
graph.addEdge('B', 'E');
graph.addEdge('B', 'F');
graph.addEdge('E', 'I');

graph.bfs(myVertices[0], graph.printNode);
console.log('--------------');
graph.dfs(graph.printNode)
console.log('--------------');
console.log(graph.toString());
