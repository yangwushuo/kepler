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
    url: `/auth/login`,
    method: 'post',
    data: JSON.stringify(data)
  })
}

//请求发送邮箱验证码
export const reqEmailCaptcha = (params) => {
  return requests({
    url: `/user/email_captcha`,
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
    url: `/user/portrait_image`,
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
    url: `/auth/logout`,
    method: 'post',
    data: JSON.stringify(data)
  })
}

//获取所有支持的交易所
export const reqAllExchange = (params) => {
  return requests({
    url: `/ex/get_all_exchange`,
    method: 'get',
    params: params
  })
}

//获取用户交易所账户
export const reqUserExchange = (params) => {
  return requests({
    url: `/ex/get_user_exchange`,
    method: 'get',
    params: params
  })
}

//添加交易账户
export const reqAddAccount = (data) => {
  return requests({
    headers: {
      'Content-Type':'application/json',
    },
    url: `/ex/add_account`,
    method: 'post',-
    data: JSON.stringify(data)
  })
}

//更新用户信息
export const reqUpUserInfo = (data) => {
  return requests({
    headers: {
      'Content-Type':'application/json',
    },
    url: `/user/up_info`,
    method: 'put',
    data: JSON.stringify(data)
  })
}

//更新用户交易账户权限
export const reqUpExchangeAccountPermissions = (data) => {
  return requests({
    headers: {
      'Content-Type':'application/json',
    },
    url: `/ex/up_exchange_account_info`,
    method: 'put',
    data: JSON.stringify(data)
  })
}

//删除用户交易账户
export const reqDelExchangeAccount = (params) => {
  return requests({
    url: `/ex/del_exchange_account`,
    method: 'delete',
    params: params
  })
}