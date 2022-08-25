const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  //打包不生成map文件
  productionSourceMap: false,
  //关闭语法检查器
  lintOnSave: false,
  //代理服务
  devServer: {
    proxy: {
      '/api':  {
        target: 'http://localhost:8081',
        pathRewrite: {
          '/api': '' //将访问路径的/api/替换成’‘，后台服务不用加api了,但前端的请求地址还是要加/api/
        }
      }
    }
  }, 
})
