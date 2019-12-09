/**
 * 电影条目短评列表
 */
import http from '../http'

export const Comments = ({id, start = 0, count = 10}) => {
   return http('get', `/subject/${id}/comments?start=${start}&count=${count}`);
}