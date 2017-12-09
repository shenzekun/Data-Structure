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
