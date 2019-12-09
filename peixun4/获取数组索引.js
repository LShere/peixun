function findIndex(arr, target){
    let result = -1;
    arr.forEach((item, index) => {
        if(isObjectEqual(item, target)){
            result = index
        }
    });
    function isObjectEqual(a, b){
        let aProps = Object.getOwnPropertyNames(a);
        let bProps = Object.getOwnPropertyNames(b);
        let flag = true;
        if(aProps.length !== bProps.length){
            return false;
        }else{
            for(let i in aProps){
                if(aProps[i] !== bProps[i] || a[aProps[i]] !== b[bProps[i]]){
                    return false;
                }
            }
            return true;
        }
    }
    return result;
}

var arr = [
    {
        id: 123,
        name: 'a'
    },
    {
        id: 456,
        name: 'b'
    }
]
console.log(findIndex(arr, {id: 456, name: 'b'})) // 0