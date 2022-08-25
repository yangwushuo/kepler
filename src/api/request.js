//对于axios进行二次封装
import axios from 'axios';
//使用进度条
import nprogress from 'nprogress'
//引入进度条样式
import 'nprogress/nprogress.css'

//1: 利用axios对象的方法create，去创建一个axios实例
//2: request就是axios，只不过稍微配置一下
const requests = axios.create({
  //配置对象
  //基础路径，发请求的时候，路径前面会添加基本路径
  // `withCredentials` 表示跨域请求时是否需要使用凭证
  withCredentials: true, // default
  baseURL: '/api',
  //请求超时
  timeout: 50000,
});

//请求拦截器: 发送请求之前进行拦截，进行处理操作，再发送
requests.interceptors.request.use((config) => {
  //config 参数包含当前请求的一些配置 比如: hea der

  //发送请求时让进度条开始
  // nprogress.start();

  return config;
})

//响应拦截器
requests.interceptors.response.use(
  (res) => {
    //响应成功调用此方法
    //接收响应时让进度条结束
    // nprogress.done();

    return res.data;
  },
  (error) => {
    //响应失败调用此方法
    console.log("request err:", error);
    return Promise.reject(new Error('faile'));
  }
)

//对外暴露
export default requests;