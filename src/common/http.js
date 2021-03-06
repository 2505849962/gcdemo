import axios from "axios"
import router from '@/router'

let $axios = axios.create({
    // baseURL: "http://localhost:3030/api",
    baseURL:"/api",
    timeout:3000
})

// 请求拦截器
$axios.interceptors.request.use(function (config) {
    if(config.url == '/userlogin'){
        return config;
    }else{
        let userinfo = JSON.parse(localStorage.getItem('userinfo'))
          // 请求头里面携带上token!   具体的字段名要和后端沟通！
        config.headers.authorization = userinfo.token;
        return config
    }
    
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
// 添加响应拦截器
$axios.interceptors.response.use(function (response) {
    // console.log(response)
    if(response.data.code == 403){
        router.push('/login')
        return response.data;
    }else{
        return response.data;
    }
    
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});
export default $axios