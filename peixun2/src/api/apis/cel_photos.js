/**
 * 影人剧照
 */

import http from '../http'

export const celebrityList = id => {
    return http('get', `/celebrity/${id}/photos`);
}