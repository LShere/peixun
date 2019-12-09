const http = require('http')

http.createServer(function(req, res){
    res.write('<head><meta charset="utf-8" /></head>');
    if(req.method.toLowerCase() == 'get'){
        res.write('收到get请求');
    }else{
        res.write('收到post请求');
    }
    res.end();
}).listen(4000);