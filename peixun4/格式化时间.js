
/**
 * 写一个能按照要求的格式输出当前时间的函数，格式：

    今天是：星期三

    当前时间：22:39:50
 */

function fn (){
    let currTime = new Date();
    let date = currTime.getDate();
    let hours = currTime.getHours() < 10 ? `0${currTime.getHours()}` : currTime.getHours();
    let minutes = currTime.getMinutes() < 10 ? `0${currTime.getMinutes()}`: currTime.getMinutes();
    let seconds = currTime.getSeconds() < 10 ? `0${currTime.getSeconds()}`: currTime.getSeconds();
    switch(date){
        case 0:
            date = '星期天';
            break;
        case 1: 
            date = '星期一';
            break;
        case 2: 
            date = '星期二';
            break;
        case 3: 
            date = '星期三';
            break;
        case 4: 
            date = '星期四';
            break;
        case 5: 
            date = '星期五';
            break;
        case 6:
            date = '星期六';
            break;                        
    }
    return `今天是: ${date}\n当前时间: ${hours}:${minutes}:${seconds} `
     
}
console.log(fn());