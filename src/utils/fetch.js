import axios from 'axios'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 100000, // 请求超时时间
  headers: {
    'Cache-Control': 'no-cache', 
    'Pragma': 'no-cache'
  }
})

// 添加请求拦截器
service.interceptors.request.use(request => {
  // 退出单点登录
  if (request.url === "/web/logout" && localStorage.getItem("loginType") === "cas"){
    request.headers.sso = "logOutCas";
  }
  // 请求头添加token
  // let token = getToken();
  // if (token) {
  //   request.headers.token = token
  // }
  // 在发送请求之前做某事，比如说 设置loading动画显示
  if (request.method === 'get') {
    request.url = encodeURI(request.url)
  }
  return request
}, error => {
   //alert(err)
  // 请求错误时做些事
  return Promise.reject(error)
})

// 拦截返回的数据res,通过返回值直接获取到服务器的数据
service.interceptors.response.use(response => {
  const res = response.data
  return res
},
error => {
  //alert(error)
  return Promise.reject(error)
})

export default service
