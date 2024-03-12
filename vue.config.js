const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath:process.env.NODE_ENV === "production"?"./":"/",//生产的环境-相对路径，开发环境-绝对路径，以站点为根目录
  transpileDependencies: true,
  // 代理跨域
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8099/api',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
})
