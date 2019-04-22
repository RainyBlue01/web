module.exports = {
  publicPath: process.env.BASE_URL || '/',
  devServer: {
    // host: 'localhost',
    port: 9000,
    proxy: {
      '/web/v1/': {
        target: process.env.SERVER_PROXY,
        changeOrigin: true
      }
    }
  }
}
