/**
 * 获取单个电影条目
 */

 import http from '../http'
 //定义接口

 export const MovieDetail = (params) => {
    return http('get', `/subject/${params}`);
 }