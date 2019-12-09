
//删除首尾空格
function trim(str){
    return str.replace(/^\s+/, "").replace(/\s+$/, "");
}
console.log(trim('  sdfdsf   '));