/**
 * 微服务代理url
 * @author   lvzhiyuan
 * @date     2018/7/5
 */

module.exports = {
  proxyList: {
    '/api': {
      target: 'http://192.1.80.38:8001',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '' // http://localhost:8083/base
      }
    },
    '/file': {
      target: 'http://127.0.0.1:8084/file',
      changeOrigin: true,
      pathRewrite: {
        '^/file': '' // http://localhost:8084/file
      }
    },
    '/bpm': {
      target: 'http://127.0.0.1:8084/bpm',
      changeOrigin: true,
      pathRewrite: {
        '^/bpm': '' // http://localhost:8084/bpm
      }
    }
  }
};
