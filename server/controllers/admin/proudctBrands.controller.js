const CRUDController = require('./crud.controller');
const ProudctBrandService = require('../../services/productBrand.service');
const _ = require('lodash');

class ProductController extends CRUDController {
  constructor() {
    super();
    this.service = new ProudctBrandService();
  }

  format(doc) {
    const fields = [
      '_id', 'name','logo'
    ];
    return _.pick(doc, fields);
  }
}

module.exports = new ProductController();
