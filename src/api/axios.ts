import axios from 'axios'
import { ElMessage} from 'element-plus'
import 'element-plus/es/components/message/style/css'
const axiosInstance = axios.create({
    baseURL:import.meta.env.VITE_URL,

})

// request拦截器
axiosInstance.interceptors.request.use(requestInfo=>{
    if(requestInfo.headers) {
        requestInfo.headers['token'] = localStorage.getItem('token') || '0'
        requestInfo.headers['Content-Type'] = 'application/json;charset=UTF-8'
        return requestInfo
    }
    
},
error=>{
     return Promise.reject(error)   
})


// response 拦截器
axiosInstance.interceptors.response.use(response=>{
    const res = response.data
    if(res.code === 200) {
        return res
    } else if(res.code === 10001) {
        ElMessage({
            message: '未登录或者登录过期,请登录',
            type: 'warning',
          })
        
        localStorage.removeItem('token')
    }else if(res.code === 10002) {
        ElMessage({
            message: '权限不足',
            type: 'warning',
          })
        
    } else {
        ElMessage({
            message: res.message,
            type: 'warning',
          })
        
    }
})


export default axiosInstance