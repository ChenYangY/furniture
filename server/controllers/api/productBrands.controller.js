const MyUtil = require('../../common/myutil');
const Service = require('../../services/productBrand.service');

const service = new Service();

async function index(req, res) {
  let page = parseInt(req.query.page) || 1;
  let size = parseInt(req.query.size) || 20;
  let condition = {};
  if(size > 50) size = 50;
  let docs = await service.findAll({}, null, {
    skip: (page - 1) * size,
    limit: size,
  });
  let count = await service.count(condition);
  let data = MyUtil.wrapperResponse(null, {
    docs: docs,
    count: count,
  });
  return res.json(data);
}

module.exports = {
  index: index,
};
