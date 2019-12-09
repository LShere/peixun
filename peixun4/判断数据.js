/**
 * 实现各种判断数据类型的方法，返回布尔值
 */
//1.判断Array
let tempArr = [];
let tempFun = function(){

}
let tempStr = 'sdfdf';
let tempObj = {};
let toString = Object.prototype.toString;
function isArray(param){
    return toString.call(param) === '[object Array]';
}

//2.判断Function
function isFunction(param){
    return toString.call(param) === '[object Function]';
}
//3.判断String
function isString(param){
    return typeof(param) === 'string';
}
//4.判断Number
function isNumber(param){
    return typeof(param) === 'number';
}
//5.判断Boolean
function isBoolean(param){
    return typeof(param) === 'boolean';
}
//6.判断Object
function isObject(param){
    return param instanceof Object;
}
//7.判断undefined
function isUndefinde(param){
    return typeof(param) === 'undefined'
}
console.log(isArray('sdfsf'));
console.log(isFunction(tempFun));
console.log(isString(tempStr));
console.log(isNumber(2312));
console.log(isBoolean("true"));
console.log(isObject(tempObj));
console.log(isUndefinde("undefined"));
