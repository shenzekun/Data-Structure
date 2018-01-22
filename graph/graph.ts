import { Dictionary } from './dictionary';
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

console.log(graph.toString());