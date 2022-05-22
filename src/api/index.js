//api统一管理
import requests from './request'
import mockRequest from './mockAjax'

//coinglass key 05ef7121d01e482686d5bb1ac6cef3bd

//请求获取合约持仓量
export const reqContractInventory = (token) => {
  return mockRequest({
    url: `/getContractInventory/${token}`,
    method: 'get',
  })
};
