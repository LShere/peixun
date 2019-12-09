/**
 * 电影条目影评列表
 */

 import http from '../http'

 export const Reviews = ({id, start = 0, count = 10}) => {
    return http('get', `/subject/${id}/reviews?start=${start}&count=${count}`);
 }