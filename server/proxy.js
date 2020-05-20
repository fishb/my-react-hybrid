const express = require('express');
const proxy = require("http-proxy-middleware");
const app = express();

app.use('/apis/**',
    proxy.createProxyMiddleware({
        // 代理目标地址
        target: "https://shop.vivo.com.cn",
        changeOrigin: true,
        pathRewrite: {
            // 地址重写
            "/apis": "/"
        }
    }));

app.use("/",
    proxy.createProxyMiddleware({
        // 这里是vue/react启动后需要访问网页的地址
        // **修改了这里
        target: "http://localhost:3000",
        changeOrigin: true,
    }))

app.listen(80, () => {
    console.log("项目启动与：http://localhost:80");
})