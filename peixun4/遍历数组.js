/**
 * 自己实现遍历数组的方法，针对数组中每一个元素执行函数，并将数组索引和元素作为参数传递（类似map）
 */
function each(arr, callback){
    let result = [];
    for(let i = 0; i < arr.length; i ++){
        result.push(callback(arr[i], i));
    }
    console.log(result.join());
}

var arr = ['a', 'b', 'c', 'd'];
function output (item) {
    return item
}
function ouput2 (item, index){
    return item + ":" + index;
}
each(arr, output);
each(arr, ouput2);
