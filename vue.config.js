const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  //打包不生成map文件
  productionSourceMap: false,
  //关闭语法检查器
  lintOnSave: false,
  //代理服务
  // devServer: {
  //   proxy: {
  //     '/api':{
  //       target: 'http://gmall-h5-api.atguigu.cn',
  //     },
  //   },  
  // }, 
})
