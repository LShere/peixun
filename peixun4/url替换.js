
/**
 * 写一个函数，要求能替换URL中的参数，如果参数不存在，则在URL后面添加
 * @param {*} url 
 * @param {*} params 
 * @param {*} val 
 */
function updateURLParameter(url, params = null, val = null){
    const urlPattern = /^www\.\w+\.[com|cn|top|xzy]/;
    if(!urlPattern.test(url)){
        return 'url输入错误';
    }else if(!params || !val){
        return '参数和值不能为空';
    }

    let result = '';
    let tempUrl = ''; //临时url
    let flag = false; //默认存在相同参数; 
    let index = url.indexOf('?');
    
    if(index == -1){
        result = `${url}?${params}=${val}`;
    }else{
        tempUrl = url.substring(0, index + 1);
        result = url.substring(index + 1);
        let temp = result.split('&');
        temp = temp.map(item => {
            let output =  {
                param: item.split('=')[0],
                value: item.split('=')[1]
            }
            if(output.param === params){
                output.value = val;
                flag = true;
            }
            return output;
        })
        if(!flag){
            result = `${url}&${params}=${val}`;
        }else{
            console.log(temp, 'temp')
            result = temp.reduce((init, item, index) => {
                // console.log(init, 'initfgfd');
                if(index == temp.length - 1){
                    return init += `${item.param}=${item.value}`;
                }else{
                    return init += `${item.param}=${item.value}&`;
                }
            }, tempUrl)
        }
    }    
    return result;

}
console.log(updateURLParameter('www.baidu.com?luoge=sdf&fdfg=sdf', 'luoge', '111'));