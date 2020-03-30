import axios from "axios";
import { Message } from 'element-ui';
import { getToken } from '@/utils/auth'
import store from "@/store";
const elMessage=Message

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 60000 // 请求超时时间
});

// 添加请求拦截器
service.interceptors.request.use(
  config => {
    const token=getToken()
    if (token) {
      config.headers["token"] = token;
    }
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截
service.interceptors.response.use(
  response => {
    let data = response.data;
    if(data.code==9001){
      elMessage.closeAll()
      elMessage({
        type: "error",
        message: "登录状态过期，请重新登录",
        offset: 100,
        duration: 1000,
        onClose:()=>{
          store.dispatch("user/webLogout").then((result) => {
            location.reload()
          }).catch((err) => {
            
          });
        }
      });
    }else if (data.code != 0) {
      elMessage.closeAll()
      elMessage({
        type: "error",
        message: data.msg ? data.msg : "服务器错误",
        offset: 100,
        duration: 2000
      });
    }
    return data;
  },
  error => { 
    elMessage.closeAll();
    elMessage({
      type: "error",
      message: `服务器错误`,
      offset: 100,
      duration: 2000
    });
    return Promise.reject(error); // 返回接口返回的错误信息
  }
);
export default service;
