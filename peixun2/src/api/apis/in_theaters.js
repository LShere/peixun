/**
 * 正在上映
 */

 import http from '../http'

 export const getInTheaters = (city) => {
     return http('get', '/in_theaters', {city});
 }