

/**
 * 在JS中，数据类型分为基本数据类型和引用数据类型两种，对于基本数据类型来说，它的值直接存储在栈内存中，
 * 而对于引用类型来说，它在栈内存中仅仅存储了一个引用，而真正的数据存储在堆内存中
 */

 /**
  *  深拷贝方法1 JSON.parse(JSON.stringify(obj));
  * 缺陷： 不能拷贝undefined function regexp等
  * */

/**
 * 方法2 Object.assign(target, source)
 * 对于一层对象来说是没有任何问题的，但是如果对象的属性对应的是其它的引用类型的话，还是只拷贝了引用，修改的话还是会有问题
 */

 /**
  * 方法3 递归拷贝
  * @param {*} obj 
  */

function deepClone(obj){
    let result;
    //如果是一个对象
    if(typeof(obj) === 'object'){
        //如果是一个数组
        if(Array.isArray(obj)){
            result = [];
            for(let i in obj){
                //递归克隆数组中每一项
                result.push(deepClone(obj[i]));
            }
        }else if(obj === null){
            // 判断如果当前的值是null的话；直接赋值为null
            result = null;
        }else if(obj.constructor === RegExp){
            // 判断如果当前的值是一个RegExp对象的话，直接赋值  
            result = obj
        }else{
            //普通对象,递归
            result = {};
            for(let i in obj){
                result[i] = deepClone(obj[i]);
            }

        }
    }else{
        //不是对象，直接赋值
        result = obj;
    }
    return result;
}

var obj = {
    a: 1,
    b: {
        b1: ['javascript', 'java'],
        b2: 'hello world'
    }
};
var obj2 = obj;
var clonedObj = deepClone(obj);

obj.a = 2;
obj.b.b1[0] = 'js';

console.log(obj2.a); // 2
console.log(obj2.b.b1[0]); // js

console.log(clonedObj.a); // 1
console.log(clonedObj.b.b1[0]) // "javascript"

