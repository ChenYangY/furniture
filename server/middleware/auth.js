const MyUtil = require("../common/myutil");

module.exports = function(req, res, next) {
  let userInfo = req.session.user || {};
  if(userInfo.userid === 'admin') {
    return next();
  }
  else {
    let data = MyUtil.wrapperResponse('请先登录');
    res.status(401);
    return res.json(data);
  }
};
