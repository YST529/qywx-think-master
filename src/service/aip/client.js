const AipFaceClient = require('baidu-aip-sdk').face;
/**
 * AppId, ApiKey, SecretKey, 百度ai中注册并获取
 * @type {string}
 */
const AppId = '19108022';
const ApiKey = 'qRZEjwlY5xkdkbgjvtxnPklE';
const SecretKey = 'k66xcMFLjcs0tWyowzgTpY3GWqsNSQvT';
const client = new AipFaceClient(AppId, ApiKey, SecretKey);

module.exports = class extends think.Service {
  // 人脸检测
  async clientDetect(img, imgType = 'BASE64') {
    if (img !== null) {
      const result = await client.detect(img, imgType);
      if (result['error_code'] === 0) {
        return result.result;
      }
    }
  }

  // 人脸注册
  async clientAddUser(img, groupId, userId, imgType = 'BASE64') {
    const result = await client.addUser(img, imgType, groupId, userId);
    if (result['error_code'] === 0) {
      return result.result;
    } else {
      return result;
    }
  }

  // 人脸验证
  async clientSearch(img, group, imgType = 'BASE64') {
    const result = await client.search(img, imgType, group);
    if (result.face_token !== null) {
      return result.result;
    } else {
      return result;
    }
  }

  // 增加用户7组
  async clientAddGroup(groupId) {
    await client.groupAdd(groupId).then((result) => {
      return result;
    }).catch((err) => {
      return err;
    });
  }

  // 获取人脸列表
  async clientFaceList(groupId, userId) {
    await client.faceGetlist(userId, groupId).then((result) => {
      return result;
    }).catch((err) => {
      return err;
    });
  }
};
