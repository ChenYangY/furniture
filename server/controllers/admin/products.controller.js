const CRUDController = require('./crud.controller');
const ProudctService = require('../../services/product.service');
const MyUtil = require('../../common/myutil');
const _ = require('lodash');

class ProductController extends CRUDController {
  constructor() {
    super();
    this.service = new ProudctService();
  }

  format(doc) {
    const fields = [
      '_id', 'name', 'create_at', 'update_at', 'images', 'tags',
      'description', 'material', 'brand', 'dimensions',
    ];
    return _.pick(doc, fields);
  }

  async batchImport(req, res){
    const files = req.files || {};
    if(_.isEmpty(files)) {
      res.json(MyUtil.wrapperResponse('文件为空'));
      return;
    }
    const file = req.files.file;
    this.service.batchImport(file.data)
      .then(() => {
        res.json(MyUtil.wrapperResponse('', {}));
      })
      .catch((e) => {
        console.log(e.stack);
        res.json(MyUtil.wrapperResponse('批量导入异常'));
      });
  }
}

module.exports = new ProductController();
