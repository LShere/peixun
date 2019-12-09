module.exports = {
    devServer: {
        open: true,
        host: '0.0.0.0',
        port: '4000',
        // host: '120.77.209.0',
        // port: '4000',
        proxy: {
            //注意本地路由和代理冲突！！
            // 'v2/movie/': {
                '/api':{
                target: 'https://douban-api.uieee.com/v2/movie',
                changeOrigin: true,
                pathRewrite: {
                    // '^/v2/movie/': '/'
                    '^/api': ''
                }
            }
        }
    }
}