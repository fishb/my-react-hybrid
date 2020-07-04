import fetch from '@/utils/fetch.js';
import { RequestJsonp } from '@/utils/RequestJsonp.js';
const baseUrl = 'https://www.vivo.com.cn/';

//首页分类模块数据
export const homeApi = (data) => {
    return fetch({
        url: '/apis/wap/fbApi/v1/home',
        method: 'GET',
        params: data
    })
}

// 抢购
export const rushBuy = (data) => {
    return fetch({
        url: '/apis/wap/fbApi/v1/channel/getDetail',
        method: 'GET',
        params: data
    })
}

// 商品详情之前需要获取skuid
export const getDefaultSkuId = (data) => {
    return fetch({
        url: '/apis/wap/fbApi/v1/product/getInfo.json',
        method: 'GET',
        params: data
    })
}

//商品详情
export const getDetail = (data) => {
    return fetch({
        url: '/apis/wap/fbApi/v1/product/getDetail.json',
        method: 'GET',
        params: data
    })
}

//检测登录
export const checkLogin = () =>{
    return RequestJsonp(`${baseUrl}header/login/status`,{'jsoncallback':'__jsonp0'})
}