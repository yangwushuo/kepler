//对于axios进行二次封装
import router from '@/router';
import store from '@/store';
import {
  statusCode
} from '@/utils';
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
  // withCredentials: true, // default
  baseURL: '/api',
  //请求超时
  timeout: 50000,
});

//创建路由不需要token的列表
const openUlr = [
  '/index',
  '/auth/login',
  '/user/captcha',
  '/user/email_captcha',
  '/user/reg',
  '/ex/get_all_ex',
];


//请求拦截器: 发送请求之前进行拦截，进行处理操作，再发送
requests.interceptors.request.use((config) => {
  //config 参数包含当前请求的一些配置 比如: header

  //发送请求时让进度条开始
  // nprogress.start();

  //如果本地有token则获取token
  var token = localStorage.getItem('qp-token');
  if (token && openUlr.indexOf(config.url) == -1) {
    config.headers.Authorization = token;
  }

  console.log("发送请求->", {
    token: token,
    url: config.url,
    result: openUlr.indexOf(config.url) == -1,
    config,
  })

  return config;
})

//响应拦截器
requests.interceptors.response.use(
  (res) => {
    //响应成功调用此方法
    //接收响应时让进度条结束
    // nprogress.done();
    //存储token到本地
    var headers = res.headers;
    //判断是否是发送登录的请求，如果是保存响应的token
    if (res.config.url == '/auth/login') {
      console.log("检测到登录-----");
      if (headers.authorization) {
        localStorage.setItem('qp-token', headers.authorization);
      }
    }

    if (res.data.code == statusCode.UNVERIFIED.code) {
      console.log("检测到认证失败:",res)
      var path = router.options.history.state.current;
      if (path != '/login') {
        //跳转登录页面
        console.log('/login' + '?redirect='+ path);
        router.push('/login' + '?redirect='+ path);
      }
    }

    console.log("响应拦截", res, router);

    return res.data;
  },
  (error) => {
    //响应失败调用此方法
    return Promise.reject(new Error('faile', error));
  },
)

//对外暴露
export default requests;