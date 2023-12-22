const crypto = require('node:crypto');
const cloud = require('@alipay/faas-server-sdk');

const getCollectionName = () => {
  return 'cl-' + crypto.randomBytes(5).toString('hex');
};

exports.main = async (event, context) => {
  // 初始化
  cloud.init();
  const db = cloud.database();
  // 查询 collection 中的 doc 列表，默认返回 100 条
  const docList = await db.collection("process").where({
    type:event.type
  }).get();
  return docList;
};