const Base = require('../base.js');

module.exports = class extends Base {
  indexAction() {
    this.assign({
      title: 'thinkjs'
    });
    return this.display();
  }

  __before() {
    this.client = this.service('aip/client');
    this.wexinData = this.ctx.state.wechatData;
    this.faceModel = this.model('faceClient');
    this.data = {};
  }

  // 查询信息
  async faceAction() {
    const { username } = this.wexinData;
    if (!think.isEmpty(username)) {
      this.ctx.state.username = username;
      const result = await this.model('uface').where({ username: username }).find();
      this.data.errno = 0;
      this.data.data = result;
      this.sendData(this.data);
    }
  }

  // 添加人脸
  async faceAddAction() {
    const { img, username } = this.wexinData;
    const { group, uid, token } = await this.faceModel.addUserFace(username); // 数据库获取数据
    const clientData = await this.client.clientAddUser(img, group, uid); // 储存百度ai
    if (clientData['face_token'] !== null) {
      await this.faceModel.setFaceData(clientData, username, token);
      this.data.errno = 0;
      this.data.data = clientData;
    } else {
      this.data.data = clientData;
      this.data.errno = 400;
      this.data.errmsg = '人脸注册错误';
    }
    this.sendData(this.data);
  }

  // 人脸搜索
  async faceSearchAction() {
    const { img, username } = this.wexinData;
    const { group } = await this.faceModel.addUserFace(username); // 数据库获取数据
    const { clientData } = await this.client.clientSearch(img, group); // 搜索人脸
    if (clientData.face_token !== null) {
      this.data.data = clientData;
    } else {
      this.data.errno = 400;
      this.data.errmsg = '人脸搜索错误';
      this.data.data = clientData;
    }
    this.sendData(this.data);
  }

  // 人脸检测
  async faceDetectAction() {
    const { img } = this.wexinData;
    const resData = await this.client.clientDetect(img); // 人脸检测
    if (img === null) {
      this.data.errmsg = '没有图片数据!';
      this.data.errno = 400;
      this.data.data = null;
    } else if (resData['face_num'] !== 1) {
      this.data.errmsg = '人脸检测失败!';
      this.data.errno = 400;
      this.data.data = null;
    } else {
      this.data.errno = 0;
      this.data.data = resData;
    }
    this.sendData(this.data);
  }

  async faceDelectAction() {
    const { img } = this.wexinData;
    this.data.data = img;
    this.sendData(this.data);
  }

  // 返回数据
  sendData(data) {
    return this.success({ errno: data.errno, errmsg: data.errmsg, data: data.data });
  }
};
