module.exports = class extends think.Model {
  async addUserFace(username) {
    let faceId = await this.model('uface').where({ username: username }).getField('id', true);
    if (think.isEmpty(faceId)) {
      // 注册
      faceId = await this.model('uface').add({
        username: username,
        group: think.uuid('v1').split('-')[0],
        uid: think.uuid('v1').split('-')[0],
        register_date: parseInt(new Date().getTime() / 1000),
        update_date: parseInt(new Date().getTime() / 1000)
      });
    }
    const newFaceInfo = await this.model('uface').where({ id: faceId, username: username }).find();
    // console.log(username, newFaceInfo5, 'username');
    return newFaceInfo;
  }

  // 更新人脸到数据库
  async setFaceData(result, user, oldToken) {
    const token = result['face_token'] + ';' + oldToken;
    const date = parseInt(new Date().getTime() / 1000);
    this.model('uface').where({ username: user }).update({ token: token, update_data: date });
  }
};
