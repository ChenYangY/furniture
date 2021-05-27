const CRUDController = require('./crud.controller');
const ProudctService = require('../../services/product.service');
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
}

module.exports = new ProductController();
