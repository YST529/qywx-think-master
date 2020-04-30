// default config
module.exports = {
  workers: 1,
  startServerTimeout: 5000, // before start server time
  wechat: {
    appid: 'wx60698b8b390d7fc8', // 小程序 appid
    secret: '27c095496317b85358ffafff3007acc8', // 小程序密钥
    notify_url: '127.0.0.1:8360/api/pay/notify' // 微信异步通知，例：https://www.nideshop.com/api/pay/notify
  }
};
