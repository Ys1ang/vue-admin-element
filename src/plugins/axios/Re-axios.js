import axios from "axios";
import qs from 'qs'
import  {throwErr} from '../../plugins/axios/throwErr'

import { Message  } from 'element-ui'


axios.interceptors.request.use(config => {
    config.headers= {
        'Content-Type':'application/x-www-form-urlencoded'
    };
    config.timeout = 10 * 1000 //请求响应时间
    return config
}, error => {
    return Promise.reject(error);
})
axios.interceptors.response.use(
    response => {
        if (response.data.code === 0) {   //服务端定义的响应code码为0时请求成功
            return Promise.resolve(response.data) //使用Promise.resolve 正常响应
        }  else {
            Message.error(response.data.message);
            return Promise.reject(response.data)
        }
    },
    error => {
        if (error && error.response) {
            let res = {}
            res.code = error.response.status
            res.msg = throwErr(error.response.status, error.response) //throwErr 捕捉服务端的http状态码 定义在utils工具类的方法



            return Promise.reject(res)
        }
        return Promise.reject(error)
    }
)


export default function request(method, url, data) {
    method = method.toLocaleLowerCase()   //封装RESTful API的各种请求方式 以 post get delete为例
    if (method === 'post') {
        return axios.post(url,  qs.stringify(data,{arrayFormat:'repeat'}))    //axios的post 默认转化为json格式  需要用qs 序列化。
    } else if (method === 'get') {
        return axios.get(url, {
            params: data
        })
    } else if (method === 'delete') {
        return axios.delete(url, {
            params: data
        })
    }
}
