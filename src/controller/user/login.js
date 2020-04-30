const Base = require('../base.js');

module.exports = class extends Base {
  async loginByWechatAction() {
    const { code, userInfo, clientIp } = this.ctx.state.wechatData;
    // console.log(code, userInfo, '微信登录');
    // 解释用户数据
    const { errno, errmsg, data: fullUserInfo } = await this.service('user/wxLogin').login(code, userInfo);
    if (errno !== 0) {
      return this.fail(errno, errmsg);
    }
    /**
     * userId 用戶登录信息id
     * newUserInfo 登录信息修改后的数据
     */
    const { newUserInfo, userId } = await this.authentication(fullUserInfo, clientIp);
    const TokenSerivce = this.service('user/token');
    const sessionKey = await TokenSerivce.create({ user_id: userId });

    if (think.isEmpty(sessionKey)) {
      return this.fail('生成 token 失败');
    }

    return this.success({ token: sessionKey, userInfo: newUserInfo });
  }

  async authentication(fullUserInfo, clientIp) {
    // 根据openid查找用户是否已经注册
    let userId = await this.model('user').where({ weixin_openid: fullUserInfo.openId }).getField('id', true);
    if (think.isEmpty(userId)) {
      // 注册
      userId = await this.model('user').add({
        username: think.uuid(16),
        password: '',
        register_time: parseInt(new Date().getTime() / 1000),
        register_ip: clientIp,
        mobile: '',
        weixin_openid: fullUserInfo.openId,
        avatar: fullUserInfo.avatarUrl || '',
        gender: fullUserInfo.gender || 1, // 性别 0：未知、1：男、2：女
        nickname: fullUserInfo.nickName
      });
    }
    // 更新登录信息
    this.model('user').where({ id: userId }).update({
      last_login_time: parseInt(new Date().getTime() / 1000),
      last_login_ip: clientIp
    });

    // 查询用户信息
    const newUserInfo = await this.model('user').field(['id', 'username', 'nickname', 'gender', 'avatar', 'birthday']).where({ id: userId }).find();

    // 保存登录信息
    this.ctx.state.userId = userId;
    return { newUserInfo, userId };
  }
};
