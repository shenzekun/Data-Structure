class ArrayList {
    arr = [];

    insert(item) {
        this.arr.push(item);
    }

    toString() {
        return this.arr.join();
    }

    /**
     * @description 冒泡排序
     * @memberof ArrayList
     */
    bubbleSort() {
        let arrLen = this.arr.length;
        for (let i = 0; i < arrLen; i++) {
            for (let j = 0; j < arrLen - 1 - i; j++) {
                if (this.arr[j] > this.arr[j + 1]) {
                    this.swap(j, j + 1);
                }
            }
        }
    }

    swap(index1, index2) {
        let aux = this.arr[index1];
        this.arr[index1] = this.arr[index2];
        this.arr[index2] = aux;
    }
    /**
     * @description 选择排序
     * 选择排序大致的思路是找到数据结构中的最小值并将其放置在第一位，接着找到第二小的值并将其放在第二位，以此类推。
     * @memberof ArrayList
     */
    selectionSort() {
        let len = this.arr.length,
            indexMin;
        for (let i = 0; i < len - 1; i++) {
            indexMin = i;
            for (let j = i; j < len; j++) {
                if (this.arr[indexMin] > this.arr[j]) {
                    indexMin = j;
                }
            }
            if (i !== indexMin) {
                this.swap(i, indexMin);
            }
        }
    }

    /**
     * @description 插入排序
     * 每次排一个数组项， 以此方式构建最后的排序数组。 假定第一项已经排序了， 接着， 它和第二项进行比较，
     * 第二项是应该待在原位还是插到第一项之前呢？这样，头两项就已正确排序，接着和第三项比较（它是该插入到第一、
     * 第二还是第三的位置呢？） ，以此类推。
     *
     * http://ohggtqwxx.bkt.clouddn.com/2018-02-09-034213.png
     *
     * 举个例子，假定待排序数组是[3, 5, 1, 4, 2]。这些值将被插入排序算法按照下面形容的步骤进行排序。
     * (1) 3已被排序，所以我们从数组第二个值5开始。3比5小，所以5待在原位（数组的第二位） 。3和5排序完毕
     *
     * (2) 下一个待排序和插到正确位置上去的值是1（目前在数组的第三位） 。5比1大，所以5被移至第三位去了。
     * 我们得分析1是否应该被插入到第二位——1比3大吗？不，所以3被移到第二位去了。接着，我们得证明1应该插
     * 入到数组的第一位上。因为0是第一个位置且没有负数位，所以1 必须被插入到第一位。1、3、5三个数字已经排序
     *
     * (3) 4应该在当前位置（索引3）还是要移动到索引较低的位置上呢？4比5小，所以5移动到索引3位置上去。那么应
     * 该把4插到索引2的位置上去吗？4要比3大，所以4插入到数组的位置3上。
     *
     * (4) 下一个待插入的数字是2（数组的位置4） 。5比2大，所以5移动至索引4。4比2大，所以4 也得移动（位置3） 。
     * 3也比2大，所以3还得移动。1比2小，所以2插入到数组的第二位置上。至此， 数组已排序完成
     * @memberof ArrayList
     */
    insertionSort() {
        let len = this.arr.length,
            j,
            temp;
        for (let i = 1; i < len; i++) {
            j = i;
            temp = this.arr[i];
            while (j > 0 && this.arr[j - 1] > temp) {
                this.arr[j] = this.arr[j - 1];
                j--;
            }
            this.arr[j] = temp;
        }
    }

    /**
     * @description 归并排序
     * @memberof ArrayList
     */
    mergeSort() {
        this.arr = this.mergeSortRec(this.arr);
    }

    mergeSortRec(arr: Array<number>) {
        let len = arr.length;
        if (len === 1) {
            return arr;
        }
        let mid = Math.floor(len / 2),
            left = arr.slice(0, mid),
            right = arr.slice(mid, len);
        return this.merge(this.mergeSortRec(left), this.mergeSortRec(right));
    }

    merge(left, right) {
        let result = [],
            il = 0,
            ir = 0;
        while (il < left.length && ir < right.length) {
            if (left[il] < right[ir]) {
                result.push(left[il++]);
            } else {
                result.push(right[ir++]);
            }
        }

        while (il < left.length) {
            result.push(left[il++]);
        }

        while (ir < right.length) {
            result.push(right[ir++]);
        }
        return result;
    }


    /**
     * @description 快速排序
     * @memberof ArrayList
     */
    quickSort() {
        this.quick(this.arr, 0, this.arr.length - 1);
    }

    quick(array, left, right) {
        let index;
        if (this.arr.length > 1) { // i 5 l 0 r 6
            index = this.partition(this.arr, left, right);
            if (left < index - 1) {
                this.quick(this.arr, left, index - 1);
            }
            if (index < right) {
                this.quick(this.arr, index, right);
            }
        }
    }

    partition(arr, left, right) {
        let pivot = arr[Math.floor((right + left) / 2)],
            i = left,
            j = right;
        while (i <= j) {
            while (arr[i] < pivot) {
                i++;
            }
            while (arr[j] > pivot) {
                j--;
            }
            if (i <= j) {
                this.swapQuickStort(arr, i, j);
                i++;
                j--;
            }
        }
        return i;
    }

    swapQuickStort(array, index1, index2) {
        let aux = array[index1];
        array[index1] = array[index2];
        array[index2] = aux;
    }
}

function createNonSortedArray(size) {
    let array = new ArrayList();
    for (let i = size; i > 0; i--) {
        array.insert(i);
    }
    return array;
}

let array = createNonSortedArray(15);
console.log(array.toString());
console.time('冒泡排序');
array.bubbleSort();
console.log(array.toString());
console.timeEnd('冒泡排序');
console.log('------------------');

let array1 = createNonSortedArray(15);
console.log(array1.toString());
console.time('选择排序');
array1.selectionSort();
console.log(array1.toString());
console.timeEnd('选择排序');
console.log('------------------');

let array2 = createNonSortedArray(15);
console.log(array2.toString());
console.time('插入排序');
array2.insertionSort();
console.log(array2.toString());
console.timeEnd('插入排序');
console.log('------------------');

let array3 = createNonSortedArray(15);
console.log(array3.toString());
console.time('归并排序');
array3.mergeSort();
console.log(array3.toString());
console.timeEnd('归并排序');
console.log('------------------');

let array4 = createNonSortedArray(15);
console.log(array4.toString());
console.time('快速排序');
array4.quickSort();
console.log(array4.toString());
console.timeEnd('快速排序');
console.log('------------------');