/**
 * 即将上映
 */

 import http from '../http'

 export const ComingSoonList = () =>{
    return http('get', '/coming_soon');
 }