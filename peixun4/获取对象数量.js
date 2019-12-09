/**
 * 获取一个对象里面第一层元素的数量，返回一个整数
 */
function getObjectLength(obj) {
    let count = 0;
    for(let i in obj){
        count ++;
    }
    return count;
}
var obj = {
	a: 1,
    b: 2,
    c: {
        c1: 3,
        c2: 4
    }
};
console.log(getObjectLength(obj));