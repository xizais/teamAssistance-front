//对axios进行二次封装
import axios from 'axios'

const fileRequests = axios.create({
    // baseURL: '',
    timeout: 5000,
    withCredentials: true // 允许跨域请求带上cookie
})

//请求拦截
fileRequests.interceptors.request.use((config) => {
    // 从本地存储中获取 Token
    const token = localStorage.getItem('token');
    if (token) {
        // 如果存在 Token，则将 Token 添加到请求头部中
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config
})

//响应拦截
fileRequests.interceptors.response.use((response) => {
        //进度条结束
        return response.data
    },
    (error) => {
        return error.message
    })

export default fileRequests