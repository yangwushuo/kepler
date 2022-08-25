//api统一管理
import requests from './request'
// import mockRequest from './mockAjax'

//请求获取验证码
export const reqCaptcha = (params) => {
  return requests({
    url: `/user/captcha`,
    method: 'get',
    params: params
  })
};

//请求登录
export const reqLogin = (data) => {
  return requests({
    headers: {
      'Content-Type':'application/json',
    },
    responseType: 'json', 
    url: `/doLogin`,
    method: 'post',
    data: JSON.stringify(data)
  })
}

//请求发送邮箱验证码
export const reqEmailCaptcha = (params) => {
  return requests({
    url: `/user/emailCaptcha`,
    method: 'get',
    params: params
  })
}

//请求注册
export const reqReg = (data) => {
  return requests({
    headers: {
      'Content-Type':'application/json',
    },
    responseType: 'json', 
    url: `/user/reg`,
    method: 'post',
    data: JSON.stringify(data)
  })
}

//请求获取用户信息
export const reqUserInfo = (params) => {
  return requests({
    url: `/user/info`,
    method: 'get',
    params: params
  })
}

//请求获取用户头像信息
export const reqUserPortraitImage = (params) => {
  return requests({
    url: `/user/portraitImage`,
    method: 'get',
    params: params
  })
}

//退出登录
export const reqLogout = (data) => {
  return requests({
    headers: {
      'Content-Type':'application/json',
    },
    responseType: 'json', 
    url: `/logout`,
    method: 'post',
    data: JSON.stringify(data)
  })
}