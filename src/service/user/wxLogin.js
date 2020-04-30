const crypto = require('crypto');
// const md5 = require('md5');
const rp = require('request-promise');

module.exports = class extends think.Service {
  async login(code, userInfo) {
    try {
      // 获取session
      const options = {
        method: 'GET',
        url: 'https://api.weixin.qq.com/sns/jscode2session',
        qs: {
          grant_type: 'authorization_code',
          js_code: code,
          secret: think.config('wechat.secret'),
          appid: think.config('wechat.appid')
        }
      };
      let sessionData = await rp(options);
      sessionData = JSON.parse(sessionData);
      if (!sessionData.openid) {
        return { error: sessionData.errorCode, errmsg: sessionData.errmsg, data: null };
      }

      // 验证用户信息完整性
      const sha1 = crypto.createHash('sha1').update(userInfo.rawData.toString() + sessionData.session_key).digest('hex');
      if (userInfo.signature !== sha1) {
        think.logger.debug(userInfo.signature, sha1, 'signature');
        return { errno: 400, errmsg: `signature 校验不一致`, data: null };
      }

      // 解析用户数据
      const wechatUserInfo = await this.decryptUserInfoData(sessionData.session_key, userInfo.encryptedData, userInfo.iv);
      return wechatUserInfo;
    } catch (e) {
      return { errno: 400, errmsg: '微信登录失败：' + e.message, data: null };
    }
  }

  /**
   * 解析微信登录用户数据
   * @param sessionKey
   * @param encryptedData
   * @param iv
   * @returns {Promise.<string>}
   */
  async decryptUserInfoData(sessionKey, encryptedData, iv) {
    let decoded = null;
    try {
      const _sessionKey = Buffer.from(sessionKey, 'base64');
      encryptedData = Buffer.from(encryptedData, 'base64');
      iv = Buffer.from(iv, 'base64');
      // 解密
      const decipher = crypto.createDecipheriv('aes-128-cbc', _sessionKey, iv);
      // 设置自动 padding 为 true，删除填充补位
      decipher.setAutoPadding(true);
      decoded = decipher.update(encryptedData, 'binary', 'utf8');
      decoded += decipher.final('utf8');
      const userInfo = JSON.parse(decoded);
      if (userInfo.watermark.appid !== think.config('wechat.appid')) {
        return { errno: 400, errmsg: 'watermark appid 错误', data: null };
      }

      // 解析后的数据格式
      // { openId: 'oILjs0JEDIZzaWVc_sJW2k3fhp1k',
      //   nickName: '明天',
      //   gender: 1,
      //   language: 'zh_CN',
      //   city: 'Shenzhen',
      //   province: 'Guangdong',
      //   country: 'China',
      //   avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/9Otwibfa5VXR0ntXdlX84dibbulWLJ0EiacHeAfT1ShG2A7LQa2unfbZVohsWQlmXbwQGM6NnhGFWicY5icdxFVdpLQ/132',
      //   watermark: { timestamp: 1542639764, appid: 'wx262f4ac3b1c477dd' } }
      return { errno: 0, errmsg: '', data: userInfo };
    } catch (err) {
      return { errno: 500, errmsg: '解析用户数据错误：' + err.message, data: null };
    }
  }
};
