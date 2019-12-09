/**
 * 对数组进行去重操作，数组中的元素为数字或字符串，返回一个去重后的数组
 */
//es5
 function uniArray(arr){
    // let result = [];
    for(let i = 0; i < arr.length; i ++){
        for(let j = i + 1; j < arr.length; j ++){
            if(arr[i] === arr[j]){
                arr.splice(j, 1);
                j --;
            }
        }
    }
    return arr;
 }
 //es6
 function uniArray2(arr){
     return Array.from(new Set(arr));
 }
 console.log(uniArray2(['dfd','sdf', 3343, 222, 222]));