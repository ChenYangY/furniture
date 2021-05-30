const MyUtil = require('../common/myutil');


function login(req, res) {
  let body = req.body;
  let  data = {};
  if(body.username === 'admin' && body.password === '123456') {
    data = MyUtil.wrapperResponse('', {});
    req.session.touch();
    req.session.user = {userid: 'admin', timestamp: Date.now()};
  }
  else {
    data = MyUtil.wrapperResponse('登录失败');
  }
  res.json(data);
}

module.exports = {
  login: login
};
