module.exports = (options, app) => {
  return (ctx, next) => {
    let data = {};
    if (ctx.isPost) {
      data = ctx.post();
    } else {
      data = ctx.param();
    }
    data.clientIp = ctx.ip;
    ctx.state.wechatData = data;
    return next();
  };
};
