import axios from 'axios'

import store from '@/store'

const http = axios.create({
    timeout: 8000
})

http.interceptors.request.use(config => {
    //开启全局loading
    store.commit('base/changeLoading', true);

    return config;
}, err => {
    console.log('请求失败');
    return promise.reject(err);
});

http.interceptors.response.use(res => {
    //关闭全局loading
    store.commit('base/changeLoading', false);
    return res;
}, err => {
    console.log('请求后置处理失败');
    return Promise.reject(err);
});


export default (method, url, data = null) => {
    method = method.toLowerCase();
    switch(true){
        case (method == 'post'):
            // return http.post('/v2/movie' + url, data);
            return http.post('/api' + url, data);
        case (method == 'get'):
            // return http.get('/v2/movie' + url, {params: data});  
            return http.get('/api' + url, {params: data});  
    }
}
    // get: (url, params) => {
    //     return new Promise(async (resolve, reject) => {
    //         try {
    //             console.log('get请求开始');
    //             let result = await http({ url, method: 'get', params });
    //             resolve(result);
    //         } catch (error) {
    //             console.log('get请求错误');
    //             reject(error);
    //         }
    //     })
    // },
    // post: (url, data) => {
    //     return new Promise(async (resolve, reject) => {
    //         try {
    //             console.log('post请求开始');
    //             let result = await http({ url, method: 'post', data });
    //             resolve(result);
    //         } catch (error) {
    //             console.log('post请求失败');
    //             reject(error);
    //         }
    //     })
    // }
