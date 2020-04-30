module.exports = class extends think.Model {
  // async authentication(fullUserInfo, clientIp) {
  //   // 根据openid查找用户是否已经注册
  //   let userId = await this.model('user').where({ weixin_openid: fullUserInfo.openId }).getField('id', true);
  //   if (think.isEmpty(userId)) {
  //     // 注册
  //     userId = await this.model('user').add({
  //       username: think.uuid(6),
  //       password: '',
  //       register_time: parseInt(new Date().getTime() / 1000),
  //       register_ip: clientIp,
  //       mobile: '',
  //       weixin_openid: fullUserInfo.openId,
  //       avatar: fullUserInfo.avatarUrl || '',
  //       gender: fullUserInfo.gender || 1, // 性别 0：未知、1：男、2：女
  //       nickname: fullUserInfo.nickName
  //     });
  //   }
  //
  //   // 查询用户信息
  //   const newUserInfo = await this.model('user').field(['id', 'username', 'nickname', 'gender', 'avatar', 'birthday']).where({ id: userId }).find();
  //
  //   // 更新登录信息
  //   await this.model('user').where({ id: userId }).update({
  //     last_login_time: parseInt(new Date().getTime() / 1000),
  //     last_login_ip: clientIp
  //   });
  //
  //   const TokenSerivce = this.service('user/token');
  //   const sessionKey = await TokenSerivce.create({ user_id: userId });
  //   return { sessionKey, newUserInfo };
  // }
};
