const models = require('../models');
const CRUDService = require('./crud.service');


class ProductBrandService extends CRUDService {
  getModel() {
    return models.productBrandModel;
  }
}

module.exports = ProductBrandService;


