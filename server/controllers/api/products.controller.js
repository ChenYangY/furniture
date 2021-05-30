const MyUtil = require('../../common/myutil');
const Service = require('../../services/product.service');
const mongoose = require('mongoose');
const service = new Service();

async function index(req, res) {
  let page = parseInt(req.query.page) || 1;
  let size = parseInt(req.query.size) || 20;
  let condition = {};
  if(size > 50) size = 50;
  if(req.query.brand) {
    condition.brand = req.query.brand;
  }
  if(req.query.tags) {
    condition.tags =  {$in: req.query.tags.split(',')};
  }
  if(req.query.name) {
    condition.name = {
      $regex: new RegExp(`.*${req.query.name}.*`)
    };
  }
  let docs = await service.findAll(condition, null, {
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

async function show(req, res) {
  if(!req.params.id) {
    let data = MyUtil.wrapperResponse('id miss');
    return res.json(data);
  }
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    let data = MyUtil.wrapperResponse('id invalid');
    return res.json(data);
  }
  let data = await service.findById(req.params.id);
  let resData = MyUtil.wrapperResponse('', data);
  res.json(resData);
}

module.exports = {
  index: index,
  show: show,
};
